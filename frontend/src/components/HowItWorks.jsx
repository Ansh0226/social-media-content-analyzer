import React from "react";

const steps = [
  {
    title: "Upload Content",
    text: "Upload your PDF documents or images using our drag-and-drop interface.",
  },
  {
    title: "AI Processing",
    text: "Our AI extracts text and analyzes engagement potential in seconds.",
  },
  {
    title: "Get Insights",
    text: "Receive detailed analytics and actionable improvement suggestions.",
  },
  {
    title: "Boost Engagement",
    text: "Implement recommendations and watch your engagement grow.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-12">
      <div className="container">
        <h2 className="section-title text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="step-card bg-white rounded-xl p-5 text-center shadow-md hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="step-number w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white flex items-center justify-center text-lg font-bold mx-auto mb-3">
                {i + 1}
              </div>
              <h5 className="font-semibold mb-1 text-slate-800">{s.title}</h5>
              <p className="text-xs md:text-sm text-slate-500">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
