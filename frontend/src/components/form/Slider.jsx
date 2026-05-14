import React from "react";

export default function Slider({ value = 50, onChange, min = 0, max = 100, step = 1, leftLabel, rightLabel }) {
  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center justify-between text-xs text-white/65">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-indigo-400"
      />
      <div className="mt-1 text-right text-xs text-white/60">{value}</div>
    </div>
  );
}

