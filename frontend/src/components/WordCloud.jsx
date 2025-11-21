import React, { useEffect, useRef } from "react";
import WordCloudLib from "wordcloud";

export default function WordCloud({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!text || text.trim().length < 5) {
      ref.current.innerHTML =
        '<div class="text-slate-400 text-sm">Not enough text to generate word cloud</div>';
      return;
    }

    const freq = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .reduce((acc, w) => {
        acc[w] = (acc[w] || 0) + 1;
        return acc;
      }, {});

    const list = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 60);

    ref.current.innerHTML = "";
    WordCloudLib(ref.current, {
      list,
      weightFactor: 8,
      gridSize: 10,
      color: "random-dark",
    });
  }, [text]);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: 260 }}
      className="bg-slate-800 p-2 rounded"
    />
  );
}
