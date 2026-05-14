import React from "react";

export default function SelectPill({ value, onChange, options, placeholder = "Select…" }) {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="glass h-12 w-full appearance-none rounded-2xl px-4 pr-10 text-sm outline-none focus:border-indigo-400/40"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">▾</div>
    </div>
  );
}

