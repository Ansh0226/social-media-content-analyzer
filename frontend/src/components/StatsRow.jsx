import React from "react";

const stats = [
  { label: "Accuracy Rate", value: "95%" },
  { label: "Content Analyzed", value: "10K+" },
  { label: "Engagement Boost", value: "2.5x" },
  { label: "Analysis", value: "24/7" },
];

export default function StatsRow() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-2 tracking-tight">
              {s.value}
            </div>
            <p className="text-sm md:text-base text-slate-500 font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
