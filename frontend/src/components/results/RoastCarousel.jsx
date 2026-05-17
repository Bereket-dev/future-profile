import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GlitchBG,
    WarningBG,
    ChaosBG,
    CyborgBG,
    LoadingBG,
    RadarBG
} from "../backgrounds/RoastSVG";
import RoastMark from "../icons/RoastMark.jsx";

const BG_COMPONENTS = [GlitchBG, WarningBG, ChaosBG, CyborgBG, LoadingBG, RadarBG];

export default function RoastCarousel({ roasts = [] }) {
    const [current, setCurrent] = useState(0);
    const BGComponent = BG_COMPONENTS[current % BG_COMPONENTS.length];

    if (!roasts || roasts.length === 0) {
        return null;
    }

    function handleNext() {
        setCurrent((c) => (c + 1) % roasts.length);
    }

    function handlePrev() {
        setCurrent((c) => (c - 1 + roasts.length) % roasts.length);
    }

    const roast = roasts[current];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative"
        >
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 overflow-hidden p-6">
                {/* SVG Background */}
                <div className="absolute inset-0 opacity-40">
                    <BGComponent />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-2">
                        <RoastMark className="h-6 w-6 text-pink-200/90" />
                        <div className="text-xs font-semibold text-white/60">Singloliness</div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35 }}
                            className="min-h-32 flex items-center justify-center"
                        >
                            <p className="font-display text-center text-lg font-semibold leading-relaxed text-white/95">
                                "{roast}"
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Counter and controls */}
                    <div className="mt-6 flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white/90 transition-all"
                        >
                            ← Previous
                        </button>

                        <div className="flex gap-1.5">
                            {roasts.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`h-2 rounded-full transition-all ${idx === current
                                        ? "bg-purple-400 w-6"
                                        : "bg-white/20 w-2 hover:bg-white/40"
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 hover:text-white/90 transition-all"
                        >
                            Next →
                        </button>
                    </div>

                    <div className="mt-4 text-center text-xs text-white/50">
                        {current + 1} of {roasts.length}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
