import React, { useState } from "react";

export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs md:text-sm hover:bg-indigo-700 transition"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
