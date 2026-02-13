import windowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls.jsx";
import { certificates } from "constants/index.js";

const Gallery = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
      <div id="window-header">
        <WindowControls target="gallery" />
        <h2>Certificates</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">My Certificates</h3>
          <p className="text-gray-600">Here are some of my professional certificates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(({ id, name, link, pdf }) => (
            <div key={id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 transform">
              <div className="flex items-center mb-4">
                <img src="/images/pdf.png" alt="PDF icon" className="w-12 h-12 mr-3" />
                <h4 className="text-lg font-medium text-gray-800">{name}</h4>
              </div>
              <a href={link || pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const galleryWindow = windowWrapper(Gallery, "gallery");

export default galleryWindow;
