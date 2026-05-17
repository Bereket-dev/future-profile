import React from "react";
import { GlitchBG, CyborgBG, RadarBG } from "../backgrounds/RoastSVG";
import RoastMark from "../icons/RoastMark.jsx";

export const ShareableResultCard = React.forwardRef(({ data, roast, flags }, ref) => {
    if (!data) return null;

    const { predictions, scores } = data;

    return (
        <div
            ref={ref}
            className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-12 relative overflow-hidden"
            style={{ aspectRatio: "1.2" }}
        >
            {/* Background SVG */}
            <div className="absolute inset-0 opacity-20">
                <CyborgBG />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="mb-8 border-b border-white/10 pb-6">
                    <div className="text-xs font-semibold text-purple-400 mb-2">Singloliness</div>
                    <h1 className="font-display text-4xl font-bold text-white">
                        {predictions.personalityArchetype}
                    </h1>
                    <p className="mt-2 text-sm text-white/70">{predictions.compatibilityStyle}</p>
                </div>

                {/* Main content */}
                <div className="flex-1 grid grid-cols-2 gap-8 mb-8">
                    {/* Left: Key stats */}
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4">
                            <div className="text-xs text-white/60 mb-1">Confidence</div>
                            <div className="text-2xl font-bold text-white">{predictions.confidence}%</div>
                        </div>

                        <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                            <div className="text-xs text-white/60 mb-1">Marriage Age</div>
                            <div className="text-lg font-bold text-white">{predictions.marriageAgeRange}</div>
                        </div>

                        <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-4">
                            <div className="text-xs text-white/60 mb-1">Timeline Vibe</div>
                            <div className="text-lg font-bold text-white">{predictions.timelineStyle}</div>
                        </div>
                    </div>

                    {/* Right: The roast (centerpiece) */}
                    <div className="rounded-3xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 flex flex-col justify-center relative overflow-hidden">
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent" />

                        <div className="relative z-10 text-center">
                            <div className="mb-3 flex justify-center">
                                <RoastMark className="h-10 w-10 text-pink-200/90" />
                            </div>
                            <p className="font-display text-lg font-semibold text-white leading-tight">"{roast}"</p>
                        </div>
                    </div>
                </div>

                {/* Score profile */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                        { label: "Family", value: scores.family },
                        { label: "Career", value: scores.career },
                        { label: "Social", value: scores.social },
                        { label: "Stability", value: scores.stability }
                    ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                            <div className="text-xs text-white/60 mb-1">{item.label}</div>
                            <div className="text-sm font-bold text-white">{item.value}</div>
                            <div className="mt-1 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-white/10 pt-4 text-center">
                    <div className="text-xs text-white/50 mb-2">Get your emotional profile at</div>
                    <div className="text-sm font-semibold text-white">futurebond.ai</div>
                </div>
            </div>
        </div>
    );
});

ShareableResultCard.displayName = "ShareableResultCard";
