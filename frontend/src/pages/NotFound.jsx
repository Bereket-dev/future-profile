import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Card>
        <div className="font-display text-2xl font-semibold">404</div>
        <div className="mt-2 text-sm text-white/70">That page doesn’t exist.</div>
        <div className="mt-6 flex gap-3">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/questionnaire">
            <Button variant="ghost">Start prediction</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

