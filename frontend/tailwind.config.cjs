/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "Segoe UI", "Inter", "Arial"],
        body: ["ui-sans-serif", "system-ui", "Segoe UI", "Inter", "Arial"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 10px 50px rgba(0,0,0,0.7)",
        neon: "0 0 0 1px rgba(255,255,255,0.10), 0 0 40px rgba(99, 102, 241, 0.18), 0 0 100px rgba(34, 211, 238, 0.10)"
      },
      colors: {
        ink: {
          950: "#050712",
          900: "#070A1A"
        }
      }
    }
  },
  plugins: []
};

