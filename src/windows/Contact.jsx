import windowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls.jsx";
import { socials } from "constants/index.js";



const Contact = () => {
  return (
    <>
       <div id="window-header">
        <WindowControls target="contact" />
         <h2>Contact Me</h2>
       </div>

       <div className="p-5 space-y-5">
           <img src="/images/thabo.png" alt="Portrait of Adrian"  className="w-21 rounded-full"/>
           <h3>Let's Connect </h3>
           <p>Got an idea? A bug to squash? Or just wanna talk tech? 
             I'm all ears!
           </p>

           <p>“I asked my AI for advice… it gave me a 10-page PDF.”</p>

           <ul>
               {socials.map(({id, bg, link, icon, text }) => (
                   <li key={id}  style={{
                    backgroundColor: bg}}>
                        <a href={link} target="_blank" rel="noopener noreferrer" title={text}>
                            <img src={icon} alt={text || 'icon'} className="size-5" />
                            <p>{text}</p>
                        </a>

                   </li>
               ))}
           </ul>
       </div>
    </>
  )
}

const contactWindow = windowWrapper(Contact, "contact");

export default contactWindow