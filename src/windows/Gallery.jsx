import windowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls.jsx";
import { certificates } from "constants/index.js";

const Gallery = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="gallery" />
        <h2>Certificates</h2>
      </div>

      <div className="p-5 space-y-5">
        <h3>My Certificates</h3>
        <p>Here are some of my professional certificates.</p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map(({ id, name, pdf }) => (
            <li key={id} className="border p-4 rounded">
              <img src="/images/pdf.png" alt="PDF icon" className="w-10 h-10 mb-2" />
              <h4>{name}</h4>
              <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Certificate
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const galleryWindow = windowWrapper(Gallery, "gallery");

export default galleryWindow;
