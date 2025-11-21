import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf = null;
      const DPR = window.devicePixelRatio || 1;
      
    function resize() {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // init particles
    const N = Math.max(40, Math.floor(window.innerWidth / 12));
    const particles = [];
    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 1.8 + 0.6,
        baseAlpha: 0.15 + Math.random() * 0.6,
      });
    }
    particlesRef.current = particles;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const p = particlesRef.current;
      const pointer = pointerRef.current;
      for (let i = 0; i < p.length; i++) {
        const q = p[i];
        // attraction to pointer with distance falloff
        const dx = pointer.x - q.x;
        const dy = pointer.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 0.9;
          q.vx += dx * 0.0008 * force;
          q.vy += dy * 0.0008 * force;
        }
        // slight noise & friction
        q.vx += (Math.random() - 0.5) * 0.01;
        q.vy += (Math.random() - 0.5) * 0.01;
        q.vx *= 0.985;
        q.vy *= 0.985;
        q.x += q.vx;
        q.y += q.vy;

        // wrap edges
        if (q.x < -20) q.x = window.innerWidth + 20;
        if (q.x > window.innerWidth + 20) q.x = -20;
        if (q.y < -20) q.y = window.innerHeight + 20;
        if (q.y > window.innerHeight + 20) q.y = -20;

        // subtle line toward pointer for connection effect
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(q.x, q.y);
          ctx.lineTo(q.x + dx * 0.02, q.y + dy * 0.02);
          ctx.strokeStyle = `rgba(255,255,255,${Math.min(
            0.12,
            (1 - dist / 140) * 0.12
          )})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // draw particle
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${q.baseAlpha})`;
        ctx.arc(q.x, q.y, q.size, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    function onMove(e) {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    }
    function onTouch(e) {
      if (e.touches && e.touches[0]) {
        pointerRef.current.x = e.touches[0].clientX;
        pointerRef.current.y = e.touches[0].clientY;
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
