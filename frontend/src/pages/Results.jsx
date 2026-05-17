import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import Meter from "../components/charts/Meter.jsx";
import Ring from "../components/charts/Ring.jsx";
import RedFlagAnalysis from "../components/results/RedFlagAnalysis.jsx";
import { ShareableResultCard } from "../components/results/ShareableResultCard.jsx";
import { generateRedFlags, generateRoast } from "../utils/roastEngine.js";
import { api } from "../services/api.js";
import RoastMark from "../components/icons/RoastMark.jsx";

function parseNumericRange(value) {
  if (value == null) return null;
  const text = String(value).trim();
  if (!text) return null;
  const cleaned = text.replace(/[–—]/g, "-");
  const matches = cleaned.match(/(\d+)\s*(?:-\s*(\d+))?/);
  if (!matches) return null;
  const min = Number(matches[1]);
  const max = matches[2] ? Number(matches[2]) : min;
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function formatRange(min, max) {
  if (min === max) return String(min);
  return `${min}-${max}`;
}

function scienceAlignedChildrenRange(predictedChildrenRange, answers) {
  const predicted = String(predictedChildrenRange ?? "").trim();
  const age = Number(answers?.age);
  const gender = answers?.gender;

  if (!predicted) return predicted;
  if (!Number.isFinite(age) || !gender) return predicted;

  // Interpret as "additional future children" (not total lifetime children).
  // Apply conservative biological constraints for female fertility at older ages.
  if (gender === "female") {
    if (age >= 55) return "0";
    if (age >= 45) {
      const r = parseNumericRange(predicted);
      if (!r) return "0-1";
      const cappedMax = Math.min(r.max, 1);
      const cappedMin = Math.min(r.min, cappedMax);
      return formatRange(cappedMin, cappedMax);
    }
  }

  return predicted;
}

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
  const shareCardRef = useRef(null);
  const [redFlags, setRedFlags] = useState([]);
  const [roast, setRoast] = useState("");
  const roastCardRef = useRef(null);

  function generateAnalytics(session) {
    if (session?.answers) {
      setRedFlags(generateRedFlags(session.answers));
      setRoast(generateRoast(session.answers));
    }
  }

  async function onDownloadRoast() {
    if (!roastCardRef.current) return;
    setBusy(true);
    try {
      roastCardRef.current.dataset.exporting = "true";
      const canvas = await html2canvas(roastCardRef.current, {
        backgroundColor: "#050712",
        scale: 2,
        useCORS: true,
        ignoreElements: (el) => el?.dataset?.exportIgnore === "true"
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `futurebond-roast-${sessionId}.png`;
      a.click();
    } finally {
      if (roastCardRef.current) delete roastCardRef.current.dataset.exporting;
      setBusy(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    setError(null);

    if (sessionId === "demo") {
      api
        .getDemoSession()
        .then((d) => {
          if (!mounted) return;
          setData(d.session);
          generateAnalytics(d.session);
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
      generateAnalytics(fromNav);
      return () => {
        mounted = false;
      };
    }

    let hasCached = false;
    try {
      const cached = JSON.parse(localStorage.getItem(`fbai_session_${sessionId}`) || "null");
      if (cached?.sessionId === sessionId) {
        setData(cached);
        generateAnalytics(cached);
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
        generateAnalytics(d);
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
    const alignedChildrenRange = scienceAlignedChildrenRange(data.predictions?.childrenRange, data.answers);
    return {
      marriageAgeRange: data.predictions?.marriageAgeRange,
      childrenRange: alignedChildrenRange,
      archetype: data.predictions?.personalityArchetype,
      compatibilityStyle: data.predictions?.compatibilityStyle,
      confidence: data.predictions?.confidence
    };
  }, [data]);

  async function onDownload() {
    if (!shareCardRef.current) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#050712",
        scale: 2,
        useCORS: true
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `Singloliness-${sessionId}.png`;
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

  const { predictions, scores } = data;
  const alignedChildrenRange = scienceAlignedChildrenRange(predictions?.childrenRange, data.answers);

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
          <Button onClick={onDownloadRoast} disabled={busy}>
            Download image
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {/* Predictions Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-[2rem] p-6 shadow-neon"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs font-semibold text-white/60">Singloliness • Pattern Summary</div>
                <div className="mt-1 font-display text-xl font-semibold">{predictions.personalityArchetype}</div>
                <div className="mt-2 text-sm text-white/70">{predictions.compatibilityStyle}</div>
              </div>
              <Badge className="w-fit border-indigo-400/25 bg-indigo-500/10">
                Confidence: {predictions.confidence}%
              </Badge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Stat label="Marriage age range" value={predictions.marriageAgeRange} />
              <Stat label="Children range" value={alignedChildrenRange} />
              <Stat label="Timeline vibe" value={predictions.timelineStyle} />
            </div>
          </motion.div>

          {/* Emotional Roast - Bold and Prominent */}
          <motion.div
            ref={roastCardRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-3xl border-2 border-pink-500/40 bg-gradient-to-br from-pink-500/15 to-purple-500/10 p-8 relative overflow-hidden group"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <RoastMark className="h-8 w-8 text-pink-200/90" />
                <div className="text-xs font-semibold text-pink-300/70">Singloliness</div>
              </div>
              <p className="font-display text-2xl md:text-3xl font-bold text-white leading-relaxed">
                "{roast}"
              </p>
              <button
                data-export-ignore="true"
                onClick={onDownloadRoast}
                disabled={busy}
                className="mt-4 text-sm font-semibold text-pink-300/70 hover:text-pink-300 transition-colors flex items-center gap-2"
              >
                <span>📥</span> Download roast
              </button>
            </div>
          </motion.div>

          {/* Red Flags */}
          <RedFlagAnalysis flags={redFlags} />

          {/* Hidden shareable card for download */}
          <div className="hidden">
            <ShareableResultCard
              ref={shareCardRef}
              data={data}
              roast={roast}
              flags={redFlags}
            />
          </div>
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
