import React from "react";
import { motion } from "framer-motion";
import KeywordChart from "./KeywordChart";
import WordCloud from "./WordCloud";

export default function Results({ data }) {
  if (!data) {
    return (
      <div className="p-6 bg-slate-900/60 rounded-lg text-slate-400 min-h-[300px]">
        No analysis yet — upload a file to get started.
      </div>
    );
  }

  const analysis = data.analysis || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-slate-900/60 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Analysis Output</h2>

      {/* Text + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Extracted Text */}
        <div>
          <h3 className="font-medium mb-2">Extracted Text</h3>
          <div className="bg-slate-800 p-3 rounded max-h-64 overflow-auto text-sm text-slate-200 leading-relaxed">
            {data.text}
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="font-medium mb-2">Summary</h3>
          <div className="bg-slate-800 p-3 rounded">
            <p className="mb-2">
              <span className="text-slate-400">Engagement score:</span>{" "}
              <span className="font-semibold">
                {analysis.engagement_score ?? "—"}
              </span>
            </p>

            <p className="mb-2">
              <span className="text-slate-400">Sentiment:</span>{" "}
              <span className="font-semibold">
                {analysis.sentiment?.comparative ?? "—"}
              </span>
            </p>

            <p className="mb-2 text-slate-400">Hashtags:</p>
            <div className="flex flex-wrap gap-2">
              {analysis.hashtags?.length > 0
                ? analysis.hashtags.map((h) => (
                    <span
                      key={h}
                      className="bg-indigo-600 px-2 py-1 rounded text-xs"
                    >
                      {h}
                    </span>
                  ))
                : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Charts + Wordcloud */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-medium mb-2">Keyword Frequency</h3>
          <KeywordChart keywords={analysis.keywords || []} />
        </div>

        <div>
          <h3 className="font-medium mb-2">Word Cloud</h3>
          <WordCloud text={data.text || ""} />
        </div>
      </div>
    </motion.div>
  );
}
