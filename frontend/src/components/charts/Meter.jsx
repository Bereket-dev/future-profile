import React from "react";

export default function Meter({ label, value, hint }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-white/60">{label}</div>
          {hint ? <div className="mt-1 text-xs text-white/55">{hint}</div> : null}
        </div>
        <div className="text-sm font-semibold">{pct}%</div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

