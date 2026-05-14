import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button.jsx";

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-neon">
            <span className="text-sm font-black tracking-tight">FB</span>
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-wide">FutureBond AI</div>
            <div className="text-[11px] text-white/60">relationship insights</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${isActive ? "text-white" : "text-white/70 hover:text-white"}`
            }
          >
            Home
          </NavLink>
          <a
            href="#how"
            className={`text-sm ${isLanding ? "text-white/70 hover:text-white" : "hidden"}`}
          >
            How it works
          </a>
          <a
            href="#features"
            className={`text-sm ${isLanding ? "text-white/70 hover:text-white" : "hidden"}`}
          >
            Features
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/questionnaire">
            <Button size="sm" variant="primary">
              Start Prediction
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

