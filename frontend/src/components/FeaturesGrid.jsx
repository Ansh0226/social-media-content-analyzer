import React from "react";

const features = [
  {
    icon: "fa-file-pdf",
    title: "PDF Text Extraction",
    text: "Seamlessly extract text from PDFs while preserving structure and layout.",
  },
  {
    icon: "fa-camera",
    title: "Advanced OCR",
    text: "Convert images or scanned documents into editable text using OCR.",
  },
  {
    icon: "fa-brain",
    title: "AI-Powered Insights",
    text: "Get intelligent suggestions to enhance tone and audience impact.",
  },
  {
    icon: "fa-chart-bar",
    title: "Word Frequency Analysis",
    text: "Visualize keyword frequency with charts and word clouds.",
  },
  {
    icon: "fa-hashtag",
    title: "Smart Hashtag Suggestions",
    text: "Generate hashtags tailored to your content and audience.",
  },
  {
    icon: "fa-mobile-alt",
    title: "Platform Optimization",
    text: "Optimize your content for all major social platforms.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative py-12 features-section bg-slate-50"
    >
      <div className="container relative z-10">
        <h2 className="section-title mb-8 text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">
          Powerful Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card bg-white rounded-2xl p-5 shadow-md hover:-translate-y-1 hover:shadow-xl transition"
            >
              <div className="feature-icon text-3xl mb-3 text-indigo-500">
                <i className={`fas ${f.icon}`} />
              </div>
              <h4 className="font-semibold mb-2 text-slate-800">{f.title}</h4>
              <p className="text-sm text-slate-500">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
