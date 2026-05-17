import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="font-display text-sm font-semibold">Singloliness</div>
          <p className="mt-2 text-sm text-white/65">
            AI-powered relationship insights based on lifestyle patterns, personality traits, and demographic-style
            correlations. Not fortune-telling.
          </p>
        </div>
        <div className="text-sm text-white/65">
          <div className="font-semibold text-white">Disclaimer</div>
          <p className="mt-2">
            Results are informational and reflect patterns observed in similar profiles. They don’t predict guaranteed
            outcomes.
          </p>
        </div>
        <div className="text-sm text-white/65">
          <div className="font-semibold text-white">Built for</div>
          <p className="mt-2">Premium, modern UX with responsive design, glassmorphism, and motion-first interactions.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Singloliness. All rights reserved.
      </div>
    </footer>
  );
}

