import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { motion } from "framer-motion";
import PDFPreview from "./PDFPreview";

export default function Upload({ onResult, samplePreviewUrl = null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  useEffect(() => {
    // if a sample preview URL is passed (for debugging), use it
    if (samplePreviewUrl) {
      setFilePreview(samplePreviewUrl);
      setFileName(samplePreviewUrl.split("/").pop());
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [samplePreviewUrl, objectUrl]);

  const uploadFile = async (file) => {
    setError(null);
    setFileName(file.name);
    const form = new FormData();
    form.append("file", file);

    try {
      setLoading(true);
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/extract`,
        form,
        {
          headers: { Accept: "application/json" },
          timeout: 120000,
        }
      );

      if (resp.data && resp.data.ok) {
        onResult(resp.data);
      } else {
        onResult(null);
        setError(resp.data?.error || "Extraction failed");
      }
    } catch (e) {
      onResult(null);
      setError(e.response?.data?.error || e.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      // debug log
      console.log("Dropped file:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // revoke previous preview
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setObjectUrl(null);
      }

      // create preview for images
     if (file.type && file.type.startsWith("image/")) {
       const url = URL.createObjectURL(file);
       setFilePreview(url);
       setObjectUrl(url);
     } else if (
       file.type === "application/pdf" ||
       file.name?.toLowerCase().endsWith(".pdf")
     ) {
       // set preview to the File object and let PDFPreview render it
       setFilePreview(null);
         setPdfFile(file);
     } else {
         setFilePreview(null);
         setPdfFile(null);
     }
      await uploadFile(file);
    },
    [objectUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [], "application/pdf": [] },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-slate-900/60 rounded-lg backdrop-blur"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded cursor-pointer ${
          isDragActive ? "border-indigo-400" : "border-slate-700"
        }`}
      >
        <input {...getInputProps()} aria-label="Upload file" />
        <p className="text-slate-300">
          Drag & drop a PDF or image here, or click to browse
        </p>
        <p className="text-xs text-slate-500 mt-2">Max file size: 20MB</p>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-indigo-300">Processing…</div>
        ) : (
          <>
                          {filePreview ? (
                              <div className="rounded overflow-hidden w-full max-w-xs">
                                  <img
                                      src={filePreview}
                                      alt="preview"
                                      className="w-full object-contain"
                                  />
                              </div>
                          ) : pdfFile ? (
                              <PDFPreview file={pdfFile} />):null}
                          {fileName ? (
                              <div className="text-slate-200">Selected: {fileName}</div>
                          ) : (
                              <div className="text-slate-400">No file selected</div>
                          )}
          </>
        )}

        {error && <div className="text-red-400 mt-2">{error}</div>}
      </div>
    </motion.div>
  );
}
