import windowWrapper from "#hoc/windowWrapper";
import WindowControls from "#components/WindowControls";
import { Download } from "lucide-react";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker - MUST be in this file where Document is used
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return <>
     <div id="window-header"> 
      <WindowControls target="resume" />
      <h2>Resume.pdf</h2>

      <a 
      href="/files/resume-1.pdf" 
      download
      className="cursor-pointer"
      title="Download resume"
      >
         <Download className="icon"/>
      </a>
     </div>

     <div style={{ 
       maxHeight: "700px", 
       overflowY: "auto", 
       width: "100%",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       padding: "20px",
       backgroundColor: "#f5f5f5"
     }}>
       <Document 
         file="/files/resume-1.pdf" 
         onLoadSuccess={onDocumentLoadSuccess}
         loading="Loading PDF..."
         error="Failed to load PDF"
       >
         
            <Page  
                pageNumber={1}
                renderTextLayer
                renderAnnotationLayer
            />
       </Document>
     </div>

  </>
}

const ResumeWindow = windowWrapper(Resume, "resume");

export default ResumeWindow;