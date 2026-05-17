import React from "react";
import { motion } from "framer-motion";

export default function RedFlagAnalysis({ flags = [] }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-red-500/5 p-6"
        >
            <div className="mb-4 flex items-center gap-2">
                <span className="text-xl">🚩</span>
                <div className="text-xs font-semibold text-white/60">Red Flag Analysis</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {flags.map((flag, idx) => (
                    <motion.div
                        key={flag.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.05 }}
                        className="group rounded-2xl border border-white/5 bg-white/[0.02] p-4 hover:border-orange-400/30 hover:bg-orange-500/5 transition-all"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-white/90">{flag.name}</div>
                                <div className="mt-1 text-xs text-white/60">{flag.description}</div>
                            </div>

                            {/* Animated meter */}
                            <div className="flex flex-col items-end gap-2">
                                <div className="relative h-16 w-10 rounded-full border border-orange-400/30 bg-gradient-to-b from-orange-500/10 to-red-500/5 overflow-hidden">
                                    {/* Fill animation */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${flag.value}%` }}
                                        transition={{ duration: 0.8, delay: 0.3 + idx * 0.05 }}
                                        className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500/60 to-red-500/40"
                                    />

                                    {/* Glow effect */}
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-gradient-to-t from-orange-400/20 to-transparent"
                                    />
                                </div>
                                <div className="text-xs font-bold text-orange-400">{Math.round(flag.value)}%</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                <div className="text-xs text-white/50">
                    💭 <span className="text-white/70">These are playful patterns, not predictions.</span> Everyone's got quirks.
                </div>
            </div>
        </motion.div>
    );
}
