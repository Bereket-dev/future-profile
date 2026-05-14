import React from "react";

const variants = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-cyan-400 text-black shadow-neon hover:brightness-110 active:brightness-95",
  ghost: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
  subtle: "bg-white/10 text-white hover:bg-white/15 border border-white/10"
};

const sizes = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-4 text-sm rounded-2xl",
  lg: "h-12 px-5 text-base rounded-2xl"
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition",
        sizes[size] || sizes.md,
        variants[variant] || variants.primary,
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

