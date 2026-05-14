import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import Meter from "../components/charts/Meter.jsx";
import Ring from "../components/charts/Ring.jsx";
import { api } from "../services/api.js";

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-semibold text-white/60">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}

export default function Results() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setError(null);

    if (sessionId === "demo") {
      api
        .getDemoSession()
        .then((d) => {
          if (!mounted) return;
          setData(d.session);
          localStorage.setItem("fbai_session_demo", JSON.stringify(d.session));
        })
        .catch((e) => mounted && setError(e.message || "Failed to load demo"));
      return () => {
        mounted = false;
      };
    }

    const fromNav = location.state?.session;
    if (fromNav?.sessionId === sessionId) {
      setData(fromNav);
      return () => {
        mounted = false;
      };
    }

    let hasCached = false;
    try {
      const cached = JSON.parse(localStorage.getItem(`fbai_session_${sessionId}`) || "null");
      if (cached?.sessionId === sessionId) {
        setData(cached);
        hasCached = true;
      }
    } catch {
      // ignore
    }

    api
      .getSession(sessionId)
      .then((d) => {
        if (!mounted) return;
        setData(d);
        localStorage.setItem(`fbai_session_${sessionId}`, JSON.stringify(d));
      })
      .catch((e) => {
        if (!mounted) return;
        if (!hasCached) setError(e.message || "Failed to load session");
      });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const summary = useMemo(() => {
    if (!data) return null;
    return {
      marriageAgeRange: data.predictions?.marriageAgeRange,
      childrenRange: data.predictions?.childrenRange,
      archetype: data.predictions?.personalityArchetype,
      compatibilityStyle: data.predictions?.compatibilityStyle,
      confidence: data.predictions?.confidence
    };
  }, [data]);

  async function onDownload() {
    if (!cardRef.current) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#050712",
        scale: 2,
        useCORS: true
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `futurebond-ai-${sessionId}.png`;
      a.click();
    } finally {
      setBusy(false);
    }
  }

  async function onShare() {
    if (!summary) return;
    setBusy(true);
    try {
      const resp = await api.createShare({ sessionId, summary });
      localStorage.setItem(`fbai_share_${resp.shareId}`, JSON.stringify({ shareId: resp.shareId, sessionId, summary }));
      const shareUrl = `${window.location.origin}/share/${resp.shareId}`;
      await navigator.clipboard.writeText(shareUrl);
      navigate(`/share/${resp.shareId}`);
    } catch (e) {
      setError(e.message || "Failed to share");
    } finally {
      setBusy(false);
    }
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card>
          <div className="text-lg font-semibold">Couldn’t load results</div>
          <div className="mt-2 text-sm text-white/70">{error}</div>
          <div className="mt-6 flex gap-3">
            <Link to="/questionnaire">
              <Button>Try again</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-white/60">Generating / Loading</div>
              <div className="mt-2 font-display text-xl font-semibold">Preparing your insights…</div>
              <div className="mt-2 text-sm text-white/65">If this takes long, ensure the backend is running.</div>
            </div>
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/70" />
          </div>
        </Card>
      </div>
    );
  }

  const { predictions, scores, aiAnalysis } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold text-white/60">Results</div>
          <h1 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Your FutureBond insight snapshot</h1>
          <p className="mt-2 text-sm text-white/70">
            These outputs are pattern-based and confidence-weighted — not guaranteed outcomes.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onShare} disabled={busy}>
            Share (copies link)
          </Button>
          <Button onClick={onDownload} disabled={busy}>
            Download image
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-[2rem] p-6 shadow-neon"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs font-semibold text-white/60">FutureBond AI • Pattern Summary</div>
                <div className="mt-1 font-display text-xl font-semibold">{predictions.personalityArchetype}</div>
                <div className="mt-2 text-sm text-white/70">{predictions.compatibilityStyle}</div>
              </div>
              <Badge className="w-fit border-indigo-400/25 bg-indigo-500/10">
                Confidence: {predictions.confidence}%
              </Badge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat label="Marriage age range" value={predictions.marriageAgeRange} />
              <Stat label="Children range" value={predictions.childrenRange} />
              <Stat label="Timeline vibe" value={predictions.timelineStyle} />
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-xs font-semibold text-white/60">Relationship analysis</div>
              <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/75">{aiAnalysis.analysis}</div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/60">Future timeline</div>
                <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/75">{aiAnalysis.timeline}</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-semibold text-white/60">Personality explanation</div>
                <div className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/75">
                  {aiAnalysis.personality}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4">
          <Card>
            <div className="text-xs font-semibold text-white/60">Confidence meter</div>
            <div className="mt-3">
              <Ring value={predictions.confidence} />
            </div>
          </Card>

          <Card>
            <div className="text-xs font-semibold text-white/60">Score profile</div>
            <div className="mt-4 grid gap-3">
              <Meter label="Family" value={scores.family} hint="Values, children desire, commitment bias" />
              <Meter label="Career" value={scores.career} hint="Priority signal and planning horizon" />
              <Meter label="Social" value={scores.social} hint="Energy and weekly activity patterns" />
              <Meter label="Stability" value={scores.stability} hint="Education + deliberate planning signals" />
            </div>
          </Card>

          <Card>
            <div className="text-xs font-semibold text-white/60">Next actions</div>
            <div className="mt-3 grid gap-2">
              <Link to="/questionnaire">
                <Button variant="ghost" className="w-full">
                  Retake questionnaire
                </Button>
              </Link>
              <Link to="/">
                <Button variant="subtle" className="w-full">
                  Back to landing
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
