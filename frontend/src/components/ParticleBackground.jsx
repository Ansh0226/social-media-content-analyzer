import React from "react";

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {/* subtle gradient */}
      <div className="hero-gradient h-64 md:h-80 lg:h-96" />
    </div>
  );
}
