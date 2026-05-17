import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import FieldLabel from "../components/ui/FieldLabel.jsx";
import RadioCards from "../components/form/RadioCards.jsx";
import SelectPill from "../components/form/SelectPill.jsx";
import Slider from "../components/form/Slider.jsx";
import useStepForm from "../hooks/useStepForm.js";
import { api } from "../services/api.js";
import { useSession } from "../context/SessionContext.jsx";

const countries = [
  { value: "ET", label: "Ethiopia" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "NG", label: "Nigeria" },
  { value: "KE", label: "Kenya" },
  { value: "CA", label: "Canada" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IN", label: "India" },
  { value: "BR", label: "Brazil" }
];

const education = [
  { value: "high_school", label: "High school" },
  { value: "college", label: "College / Diploma" },
  { value: "bachelors", label: "Bachelor’s" },
  { value: "masters", label: "Master’s" },
  { value: "phd", label: "PhD / Doctorate" }
];

function clampAge(n) {
  // Allow empty input for clearing the field
  if (n === "") return "";
  // Only allow numeric characters
  if (!/^\d+$/.test(n)) return "";
  const x = Number(n);
  // Clamp to valid range
  return Math.max(18, Math.min(70, x));
}

export default function Questionnaire() {
  const navigate = useNavigate();
  const { draftAnswers, setDraftAnswers, setLastSessionId } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState(
    draftAnswers || {
      age: "",
      gender: "",
      country: "",
      education: "",
      introExtro: 50,
      careerPriority: 55,
      relationshipGoals: "",
      desireChildren: "",
      socialActivity: 50,
      familyImportance: 60,
      lifestyle: "",
      commitment: ""
    }
  );

  const steps = useMemo(
    () => [
      {
        key: "basics",
        title: "Basics",
        subtitle: "A few quick demographics to contextualize patterns.",
        render: () => (
          <div className="grid gap-4">
            <div>
              <FieldLabel title="Your age" subtitle="We use age as a baseline, not a verdict." />
              <input
                type="number"
                value={answers.age}
                onChange={(e) => setAnswers((a) => ({ ...a, age: e.target.value }))}
                placeholder="e.g. 24"
                className="glass h-12 w-full rounded-2xl px-4 text-sm outline-none focus:border-indigo-400/40"
              />
              {answers.age && (answers.age < 18 || answers.age > 70) && (
                <p className="mt-2 text-sm text-red-400">Age must be between 18 and 70</p>
              )}
            </div>

            <div>
              <FieldLabel title="Gender" subtitle="Used only for context and phrasing." />
              <RadioCards
                value={answers.gender}
                onChange={(v) => setAnswers((a) => ({ ...a, gender: v }))}
                options={[
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                  { value: "nonbinary", label: "Non-binary" },
                  { value: "prefer_not", label: "Prefer not to say" }
                ]}
              />
            </div>
          </div>
        )
      },
      {
        key: "context",
        title: "Context",
        subtitle: "Education and location help tune correlations.",
        render: () => (
          <div className="grid gap-4">
            <div>
              <FieldLabel title="Country" subtitle="Pick the closest match." />
              <SelectPill
                value={answers.country}
                onChange={(v) => setAnswers((a) => ({ ...a, country: v }))}
                options={countries}
                placeholder="Choose your country"
              />
            </div>
            <div>
              <FieldLabel title="Education level" subtitle="Used as a rough proxy for stability planning." />
              <SelectPill
                value={answers.education}
                onChange={(v) => setAnswers((a) => ({ ...a, education: v }))}
                options={education}
                placeholder="Choose education level"
              />
            </div>
          </div>
        )
      },
      {
        key: "energy",
        title: "Social energy",
        subtitle: "Not better or worse — just a pattern signal.",
        render: () => (
          <div className="grid gap-4">
            <FieldLabel title="Introvert ↔ Extrovert" subtitle="0 = strongly introvert, 100 = strongly extrovert." />
            <Slider
              value={answers.introExtro}
              onChange={(v) => setAnswers((a) => ({ ...a, introExtro: v }))}
              leftLabel="Introvert"
              rightLabel="Extrovert"
            />
            <FieldLabel title="Social activity level" subtitle="How active are you socially on most weeks?" />
            <Slider
              value={answers.socialActivity}
              onChange={(v) => setAnswers((a) => ({ ...a, socialActivity: v }))}
              leftLabel="Low"
              rightLabel="High"
            />
          </div>
        )
      },
      {
        key: "priorities",
        title: "Priorities",
        subtitle: "These weights shape your projected pace and timeline.",
        render: () => (
          <div className="grid gap-4">
            <FieldLabel title="Career priority" subtitle="How central is career progression right now?" />
            <Slider
              value={answers.careerPriority}
              onChange={(v) => setAnswers((a) => ({ ...a, careerPriority: v }))}
              leftLabel="Low"
              rightLabel="High"
            />
            <div>
              <FieldLabel title="Relationship goals" subtitle="What are you optimizing for?" />
              <RadioCards
                value={answers.relationshipGoals}
                onChange={(v) => setAnswers((a) => ({ ...a, relationshipGoals: v }))}
                options={[
                  { value: "long_term", label: "Long-term partnership", hint: "Building alignment and stability." },
                  { value: "growth", label: "Personal growth + support", hint: "A partner who matches your evolution." },
                  { value: "adventure", label: "Adventure + experiences", hint: "More exploration, less routine." },
                  { value: "unsure", label: "Still exploring", hint: "Open to options and learning." }
                ]}
              />
            </div>
          </div>
        )
      },
      {
        key: "family",
        title: "Family & future",
        subtitle: "Values influence children and commitment ranges.",
        render: () => (
          <div className="grid gap-4">
            <FieldLabel title="Family importance" subtitle="How influential is family in your life decisions?" />
            <Slider
              value={answers.familyImportance}
              onChange={(v) => setAnswers((a) => ({ ...a, familyImportance: v }))}
              leftLabel="Low"
              rightLabel="High"
            />
            <div>
              <FieldLabel title="Desire for children" subtitle="A preference signal, not a prediction." />
              <RadioCards
                value={answers.desireChildren}
                onChange={(v) => setAnswers((a) => ({ ...a, desireChildren: v }))}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "maybe", label: "Maybe" },
                  { value: "no", label: "No" },
                  { value: "prefer_not", label: "Prefer not to say" }
                ]}
              />
            </div>
          </div>
        )
      },
      {
        key: "style",
        title: "Lifestyle & commitment",
        subtitle: "This shapes compatibility style and pacing.",
        render: () => (
          <div className="grid gap-4">
            <div>
              <FieldLabel title="Lifestyle preference" subtitle="Which vibe fits you best?" />
              <RadioCards
                value={answers.lifestyle}
                onChange={(v) => setAnswers((a) => ({ ...a, lifestyle: v }))}
                options={[
                  { value: "calm", label: "Calm & consistent", hint: "Routine, stability, quiet joy." },
                  { value: "balanced", label: "Balanced", hint: "Some structure + some spontaneity." },
                  { value: "dynamic", label: "Dynamic & spontaneous", hint: "High variety, fast-moving life." },
                  { value: "social", label: "Social & community-driven", hint: "People and networks energize you." }
                ]}
              />
            </div>
            <div>
              <FieldLabel title="Long-term commitment preference" subtitle="How quickly do you like to define a relationship?" />
              <RadioCards
                value={answers.commitment}
                onChange={(v) => setAnswers((a) => ({ ...a, commitment: v }))}
                options={[
                  { value: "slow", label: "Slow & deliberate", hint: "Alignment before labels." },
                  { value: "medium", label: "Balanced pace", hint: "Time + clarity." },
                  { value: "fast", label: "Fast commitment", hint: "When it feels right, commit." }
                ]}
              />
            </div>
          </div>
        )
      }
    ],
    [answers]
  );

  const stepper = useStepForm(steps);

  async function onSubmit() {
    setError(null);
    setLoading(true);
    try {
      const payload = { ...answers };
      setDraftAnswers(payload);
      const data = await api.createPrediction(payload);
      setLastSessionId(data.sessionId);
      if (data.session) {
        localStorage.setItem(`fbai_session_${data.sessionId}`, JSON.stringify(data.session));
      }
      setDraftAnswers(null);
      navigate(`/results/${data.sessionId}`, { state: { session: data.session || null } });
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function canGoNext() {
    const key = stepper.step.key;
    if (key === "basics") return Boolean(answers.age) && Boolean(answers.gender) && answers.age >= 18 && answers.age <= 70;
    if (key === "context") return Boolean(answers.country) && Boolean(answers.education);
    if (key === "priorities") return Boolean(answers.relationshipGoals);
    if (key === "family") return Boolean(answers.desireChildren);
    if (key === "style") return Boolean(answers.lifestyle) && Boolean(answers.commitment);
    return true;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-white/60">Questionnaire</div>
          <h1 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Build your pattern profile</h1>
          <p className="mt-2 text-sm text-white/70">
            Your answers create a deterministic score profile. Then AI writes a grounded explanation.
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-xs text-white/60">Step</div>
          <div className="text-sm font-semibold">
            {stepper.stepIndex + 1} / {steps.length}
          </div>
        </div>
      </div>

      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_20%_0%,black,transparent_55%)]">
          <div className="absolute -left-8 -top-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute -right-8 top-16 h-64 w-64 rounded-full bg-cyan-400/18 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-white/60">Progress</div>
              <div className="mt-1 font-display text-lg font-semibold">{stepper.step.title}</div>
              <div className="mt-1 text-sm text-white/65">{stepper.step.subtitle}</div>
            </div>
            <div className="w-44 shrink-0">
              <ProgressBar value={stepper.progress} />
              <div className="mt-2 text-right text-xs text-white/60">{stepper.progress}%</div>
            </div>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepper.step.key}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.35 }}
              >
                {stepper.step.render()}
              </motion.div>
            </AnimatePresence>
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" disabled={stepper.isFirst || loading} onClick={stepper.back}>
              Back
            </Button>
            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="hidden sm:block text-xs text-white/60">
                {stepper.isLast ? "Ready to generate your insights" : "Continue to refine your profile"}
              </div>
              {stepper.isLast ? (
                <Button disabled={!canGoNext() || loading} onClick={onSubmit}>
                  {loading ? "Generating…" : "Generate Results"}
                </Button>
              ) : (
                <Button disabled={!canGoNext() || loading} onClick={stepper.next}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
