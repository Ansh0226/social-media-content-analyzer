import React from "react";

export default function Hero({ onStart }) {
  return (
    <section className="hero-gradient text-white pt-28 pb-24 relative overflow-hidden">
      {/* soft floating shapes */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left: text content */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
              Boost Your Social Media Engagement with AI
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-10">
              Analyze your content, get actionable insights, and maximize your
              social media impact with our advanced AI-powered analyzer.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onStart}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-semibold shadow-lg shadow-indigo-900/40 hover:from-indigo-400 hover:to-purple-600 transition"
              >
                <i className="fas fa-rocket" />
                Start Analyzing Free
              </button>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/70 text-white text-sm md:text-base bg-white/5 hover:bg-white/10 transition"
              >
                <i className="fas fa-play-circle" />
                Learn More
              </a>
            </div>
          </div>

          {/* Right: icon / illustration */}
          <div className="hidden lg:flex justify-center">
            <i className="fas fa-analytics fa-7x text-white/60 drop-shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}
