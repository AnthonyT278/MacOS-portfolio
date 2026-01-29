import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { useRef, useLayoutEffect } from "react";

const windowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const windowData = windows?.[windowKey];

    if (!windowData) {
      console.warn(`[windowWrapper] Window key "${windowKey}" not found in store.`);
      return null;
    }

    const { isOpen, zIndex } = windowData;
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, { 
        onPress: () => focusWindow(windowKey) 
      });
      return () => instance.kill();
    });

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section 
        id={windowKey} 
        ref={ref}
        className="absolute"
        style={{ zIndex }}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `windowWrapper(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
};

export default windowWrapper;
