import React from "react";

export default function FieldLabel({ title, subtitle }) {
  return (
    <div className="mb-4">
      <div className="font-display text-base font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-white/65">{subtitle}</div> : null}
    </div>
  );
}

