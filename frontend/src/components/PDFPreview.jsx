import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"; // legacy build works well with bundlers

// point to worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFPreview({ file }) {
  const canvasRef = useRef(null);
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let canceled = false;
    async function render() {
      if (!file) return;
      try {
        // file can be a File object or URL
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.2 });
        const canvas = canvasRef.current;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        const renderContext = { canvasContext: ctx, viewport };
        await page.render(renderContext).promise;
        // convert to dataURL for easy display and cleanup
        const dataUrl = canvas.toDataURL("image/png");
        if (!canceled) setThumbUrl(dataUrl);
      } catch (err) {
        console.error("PDFPreview render error", err);
      }
    }
    render();
    return () => {
      canceled = true;
    };
  }, [file]);

  if (thumbUrl) {
    return (
      <img
        src={thumbUrl}
        alt="pdf preview"
        className="w-full object-contain rounded"
      />
    );
  }
  // offscreen canvas for rendering
  return <canvas ref={canvasRef} style={{ display: "none" }} />;
}
