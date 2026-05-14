import React from "react";

export default function Card({ className = "", children }) {
  return <div className={["glass rounded-3xl p-6 shadow-glow", className].join(" ")}>{children}</div>;
}

