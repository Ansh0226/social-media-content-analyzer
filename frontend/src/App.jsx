import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import Upload from "./components/Upload";
// import Results from "./components/Results";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      <ParticleBackground />

      <Header />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          Social Media Content Analyzer
        </h1>
        <p className="text-slate-300 mb-6">
          Upload any PDF or Image and instantly get engagement suggestions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div>
            <Upload onResult={setResult} />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {/* <Results data={result} /> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
