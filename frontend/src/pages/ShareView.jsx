import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { api } from "../services/api.js";

export default function ShareView() {
  const { shareId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setError(null);
    let hasCached = false;
    try {
      const cached = JSON.parse(localStorage.getItem(`fbai_share_${shareId}`) || "null");
      if (cached?.shareId === shareId) {
        setData(cached);
        hasCached = true;
      }
    } catch {
      // ignore
    }
    api
      .getShare(shareId)
      .then((d) => mounted && setData(d))
      .catch((e) => {
        if (!mounted) return;
        if (!hasCached) setError(e.message || "Failed to load share");
      });
    return () => {
      mounted = false;
    };
  }, [shareId]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_25%_0%,black,transparent_60%)]">
          <div className="absolute -left-8 -top-12 h-64 w-64 rounded-full bg-indigo-500/22 blur-3xl" />
          <div className="absolute -right-10 top-16 h-64 w-64 rounded-full bg-cyan-400/18 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-white/60">Shared result</div>
              <div className="mt-1 font-display text-xl font-semibold">Singloliness</div>
              <div className="mt-2 text-sm text-white/70">
                Pattern-based relationship insights. Not fortune-telling.
              </div>
            </div>
            <Badge className="border-white/10 bg-white/5">ID: {shareId}</Badge>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          {!data ? (
            <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/70" />
              Loading…
            </div>
          ) : (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/60">Archetype</div>
                <div className="mt-2 text-lg font-semibold">{data.summary.archetype}</div>
                <div className="mt-2 text-sm text-white/70">{data.summary.compatibilityStyle}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/60">Snapshot</div>
                <div className="mt-2 text-sm text-white/80">Marriage age: {data.summary.marriageAgeRange}</div>
                <div className="mt-1 text-sm text-white/80">Children: {data.summary.childrenRange}</div>
                <div className="mt-1 text-sm text-white/80">Confidence: {data.summary.confidence}%</div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/questionnaire">
              <Button>Generate your own</Button>
            </Link>
            <Button
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              disabled={!navigator.clipboard}
            >
              Copy link
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
