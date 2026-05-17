import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import { fadeUp } from "../animations/motion.js";

const features = [
  {
    title: "Marriage Age Range",
    desc: "A realistic range based on stability, priorities, and lifestyle indicators."
  },
  {
    title: "Children Range",
    desc: "A pattern-based range shaped by goals, family values, and long-term intent."
  },
  {
    title: "Personality Archetype",
    desc: "A relationship style profile built from your preferences and social energy."
  },
  {
    title: "Relationship Timeline",
    desc: "A narrative of likely phases people with similar traits often experience."
  }
];

const testimonials = [
  {
    name: "Mina",
    title: "Product Designer",
    quote: "It felt like a premium onboarding experience. The results were nuanced, not cheesy."
  },
  {
    name: "Daniel",
    title: "Engineer",
    quote: "The wording was grounded. It framed insights as patterns, which made it feel honest."
  },
  {
    name: "Sara",
    title: "Founder",
    quote: "Loved the layout and motion. The timeline section is surprisingly useful for reflection."
  }
];

export default function Landing() {
  return (
    <div className="relative z-10">
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pt-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid items-center gap-10 md:grid-cols-2"
        >
          <motion.div variants={fadeUp}>
            <Badge>Not fortune-telling • Pattern-based insights</Badge>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Future relationship insights,{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-white to-cyan-200 bg-clip-text text-transparent">
                grounded in your lifestyle
              </span>
              .
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 md:text-lg">
              Singloliness analyzes your answers using a scoring engine + AI explanation to produce realistic,
              confidence-weighted relationship insights based on similar profiles.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/questionnaire">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Prediction
                </Button>
              </Link>
              <Link to="/results/demo">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                  View demo
                </Button>
              </Link>
              <a href="#how">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                  How it works
                </Button>
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["~2 min", "questionnaire"],
                ["Glass UI", "premium layout"],
                ["AI + scores", "balanced output"]
              ].map(([k, v]) => (
                <div key={k} className="glass rounded-3xl px-4 py-3">
                  <div className="text-sm font-semibold">{k}</div>
                  <div className="text-xs text-white/60">{v}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-indigo-500/20 via-cyan-400/10 to-transparent blur-2xl" />
            <Card className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white/60">Sample Output</div>
                  <div className="mt-1 font-display text-lg font-semibold">Compatibility Style</div>
                </div>
                <Badge className="border-indigo-400/25 bg-indigo-500/10 text-white/80">Confidence: 78%</Badge>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Marriage Age", "27–31"],
                  ["Children Range", "1–2"],
                  ["Archetype", "Grounded Builder"],
                  ["Timeline", "3 phases"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">{label}</div>
                    <div className="mt-2 text-xl font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                Your answers suggest a high stability score and balanced social energy. People with similar profiles
                often prioritize long-term alignment before commitment.
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_30%_20%,black,transparent_70%)]">
                <div className="absolute left-6 top-6 h-40 w-40 rounded-full bg-indigo-500/25 blur-2xl" />
                <div className="absolute bottom-6 right-6 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-white/60">What you get</div>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Insight modules that feel premium</h2>
            </div>
            <Link to="/questionnaire" className="hidden md:block">
              <Button variant="ghost">Start now</Button>
            </Link>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="h-full">
                  <div className="text-lg font-semibold">{f.title}</div>
                  <p className="mt-2 text-sm text-white/70">{f.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.div variants={fadeUp}>
            <div className="text-xs font-semibold text-white/60">How it works</div>
            <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Scores first. AI second.</h2>
            <p className="mt-3 max-w-3xl text-sm text-white/70 md:text-base">
              We compute a deterministic profile from your answers (family/career/social/stability). Then we ask AI to
              write a grounded explanation that matches those calculated traits.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["1) Answer", "A quick multi-step questionnaire."],
              ["2) Calculate", "Weighted scoring engine derives ranges & archetype."],
              ["3) Explain", "AI generates a realistic narrative and timeline."]
            ].map(([title, desc]) => (
              <motion.div key={title} variants={fadeUp}>
                <Card className="h-full">
                  <div className="font-semibold">{title}</div>
                  <div className="mt-2 text-sm text-white/70">{desc}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold text-white/60">Testimonials</div>
              <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">Made for modern taste</h2>
            </div>
          </motion.div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <Card className="h-full">
                  <div className="text-sm text-white/75">“{t.quote}”</div>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-white/60">{t.title}</div>
                    </div>
                    <Badge className="bg-white/5">Verified</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
