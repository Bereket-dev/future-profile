import React from "react";
import { motion } from "framer-motion";

function Orb({ className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay }}
    />
  );
}

export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-ink-950 to-black" />

      <Orb
        delay={0.05}
        className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/10 to-transparent blur-3xl"
      />
      <Orb
        delay={0.15}
        className="absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/22 via-emerald-400/10 to-transparent blur-3xl"
      />
      <Orb
        delay={0.25}
        className="absolute left-1/3 top-[55%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-purple-500/18 via-indigo-500/12 to-transparent blur-3xl"
      />

      <motion.div
        className="absolute inset-0 opacity-[0.45] mix-blend-overlay noise"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1.0 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.10),transparent_60%)]" />
    </div>
  );
}

