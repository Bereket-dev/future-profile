import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AuroraBackground from "../components/background/AuroraBackground.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-ink-950 text-white">
      <AuroraBackground />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

