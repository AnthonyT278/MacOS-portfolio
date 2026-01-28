import { useRef, useEffect } from "react";
import { Tooltip } from 'react-tooltip';
import { dockApps } from "../constants";
import { gsap } from "gsap";
// useEffect is used instead of useGSAP to attach DOM event listeners reliably
import useWindowStore from "../store/window";

const Dock = () => {
    console.log("Dock component rendering, dockApps:", dockApps);
    
    const dockRef = useRef(null);
    const { openWindow, closeWindow, windows } = useWindowStore();

    useEffect(() =>{
        const dock = dockRef.current;
        if(!dock) return;
        console.debug("Dock mounted, ref:", dock);

        const icons = dock.querySelectorAll('.dock-icon');
        console.debug("Found icons:", icons.length);

        if (icons.length === 0) {
            console.warn("No dock-icon elements found!");
            return;
        }

        const animateIcons = (mouseX) => {
           const { left } = dock.getBoundingClientRect();

           icons.forEach(icon => {
               const { left: iconLeft, width} = icon.getBoundingClientRect();
               const center = iconLeft - left + width / 2;
               const distance = Math.abs(mouseX - center);
               
               const intensity = Math.exp(-(distance ** 2.5) / 2000);

               gsap.to(icon, {
                    scale: 1 + 0.255 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power2.out",
               });
           });
        };

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left);
        };

        const restIcons = () => icons.forEach((icon) => gsap.to(icon, {
             scale: 1,
             y: 0,
             duration: 0.3,
             ease: "power1.out",
        }));

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', restIcons);
        console.debug('Dock listeners attached');

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', restIcons);
        };

    }, []);

    const toggleApp = (appId, canOpen) => {
        if (!canOpen) return;
        console.debug('toggleApp', appId, canOpen);
        const win = windows?.[appId];
        if (win?.isOpen) {
            closeWindow(appId);
        } else {
            openWindow(appId);
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                 {dockApps && dockApps.length > 0 ? (
                     dockApps.map(({id, name, icon, canOpen}) => (
                         <div key={id} className="relative flex justify-center">
                             <button type="button" className="dock-icon"
                              aria-label={name} 
                              data-tooltip-id="dock-tooltip"
                              data-tooltip-content={name}
                              data-tooltip-delay-show={150}
                              disabled={!canOpen}
                              onClick={() => toggleApp(id, canOpen)}
                              >
                                   <img 
                                      src={`/images/${icon}`}
                                      alt={name}
                                      loading="lazy"
                                      className={canOpen ? "" : "opacity-60"}
                                   />
                             </button>
                         </div>
                     ))
                 ) : (
                     <p>No dock apps available</p>
                 )}

                 <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;