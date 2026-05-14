# FutureBond AI

AI-powered relationship insights based on lifestyle patterns, personality traits, and demographic-style correlations.

Important: this is **not** a fortune-telling website. Outputs are realistic, pattern-based, and confidence-weighted.

## Project structure

- `frontend/` React + Vite + Tailwind + Framer Motion
- `backend/` Node.js + Express + MongoDB (Mongoose) + Gemini via `@google/genai`

## Quickstart (local)

1) Install dependencies:

- `cd backend && npm i`
- `cd ../frontend && npm i`

2) Environment variables:

- Backend: copy `backend/.env.example` → `backend/.env` and fill values
- Frontend: copy `frontend/.env.example` → `frontend/.env` (optional)

3) Run:

- Backend: `cd backend && npm run dev` (defaults to `http://localhost:8080`)
- Frontend: `cd frontend && npm run dev` (defaults to `http://localhost:5173`)

Then open `http://localhost:5173`.

## Notes

- If `MONGODB_URI` is not set, the backend still returns results, but sessions/shares won’t persist.
- If `GEMINI_API_KEY` is not set, the backend returns a high-quality fallback analysis (still deterministic for the numeric predictions).
