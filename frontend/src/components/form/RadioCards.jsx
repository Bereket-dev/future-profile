import React from "react";
import { motion } from "framer-motion";

export default function RadioCards({ value, onChange, options }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              "glass relative rounded-3xl p-4 text-left transition",
              active ? "border-indigo-400/40 shadow-neon" : "hover:bg-white/8"
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold">{opt.label}</div>
                {opt.hint ? <div className="mt-1 text-sm text-white/60">{opt.hint}</div> : null}
              </div>
              <motion.span
                className={[
                  "mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border",
                  active ? "border-indigo-300 bg-indigo-500/30" : "border-white/20 bg-white/5"
                ].join(" ")}
                animate={{ scale: active ? 1.05 : 1 }}
              >
                <span className={["h-2 w-2 rounded-full", active ? "bg-white" : "bg-transparent"].join(" ")} />
              </motion.span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

