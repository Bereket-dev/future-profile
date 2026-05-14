function clamp01(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function toPct(n01) {
  return Math.round(clamp01(n01) * 100);
}

function midFromRange(rangeText) {
  const m = String(rangeText).match(/(\d+)\D+(\d+)/);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;
  return (a + b) / 2;
}

function childrenMid(rangeText) {
  if (rangeText === "0") return 0;
  const m = String(rangeText).match(/(\d+)\D+(\d+)/);
  if (!m) return null;
  return (Number(m[1]) + Number(m[2])) / 2;
}

export function computeScores(answers) {
  const age = Number(answers.age);
  const edu = answers.education;
  const commitment = answers.commitment;
  const goals = answers.relationshipGoals;
  const kids = answers.desireChildren;

  const introExtro = clamp01(Number(answers.introExtro) / 100);
  const socialActivity = clamp01(Number(answers.socialActivity) / 100);
  const careerPriority = clamp01(Number(answers.careerPriority) / 100);
  const familyImportance = clamp01(Number(answers.familyImportance) / 100);

  const educationStabilityBoost =
    edu === "phd" ? 0.18 : edu === "masters" ? 0.14 : edu === "bachelors" ? 0.10 : edu === "college" ? 0.06 : 0.04;

  const deliberateBoost = commitment === "slow" ? 0.14 : commitment === "medium" ? 0.08 : 0.03;
  const goalStabilityBoost = goals === "long_term" ? 0.14 : goals === "growth" ? 0.10 : goals === "adventure" ? 0.05 : 0.08;

  const kidsBoost = kids === "yes" ? 0.14 : kids === "maybe" ? 0.08 : kids === "no" ? 0.02 : 0.06;

  const family01 = clamp01(0.60 * familyImportance + 0.30 * kidsBoost + 0.10 * (commitment !== "fast" ? 1 : 0.5));
  const career01 = clamp01(0.75 * careerPriority + 0.15 * (age >= 30 ? 0.6 : 0.45) + 0.10 * (goals === "growth" ? 0.7 : 0.5));
  const social01 = clamp01(0.55 * introExtro + 0.45 * socialActivity);
  const stability01 = clamp01(0.45 * (educationStabilityBoost + 0.30) + 0.35 * deliberateBoost + 0.20 * goalStabilityBoost);

  return {
    family: toPct(family01),
    career: toPct(career01),
    social: toPct(social01),
    stability: toPct(stability01)
  };
}

export function computePredictions(answers, scores) {
  const age = Number(answers.age);
  const career = scores.career / 100;
  const family = scores.family / 100;
  const stability = scores.stability / 100;
  const social = scores.social / 100;

  const wantsKids = answers.desireChildren === "yes" || answers.desireChildren === "maybe";
  const fastCommit = answers.commitment === "fast";
  const slowCommit = answers.commitment === "slow";

  const baseMarriage = age + (slowCommit ? 4 : fastCommit ? 2 : 3);
  const delay = 2.4 * career - 1.6 * family - 1.2 * stability;
  const center = Math.round(baseMarriage + delay);

  const spread = Math.round(2 + (1.2 * (1 - stability) + 0.8 * social));
  const minAge = Math.max(age + 1, center - spread);
  const maxAge = Math.max(minAge + 2, center + spread);
  const marriageAgeRange = `${minAge}–${maxAge}`;

  let childrenRange = "0";
  if (answers.desireChildren === "yes") {
    childrenRange = family > 0.7 && stability > 0.6 ? "2–3" : family > 0.55 ? "1–2" : "1";
  } else if (answers.desireChildren === "maybe") {
    childrenRange = family > 0.65 ? "1–2" : "0–1";
  } else if (answers.desireChildren === "prefer_not") {
    childrenRange = wantsKids ? "0–1" : "0–1";
  }

  const archetype =
    stability > 0.68 && family > 0.55
      ? "Grounded Builder"
      : social > 0.66 && career > 0.55
        ? "Spark Connector"
        : career > 0.70 && slowCommit
          ? "Focused Strategist"
          : social < 0.42 && stability > 0.58
            ? "Quiet Planner"
            : family > 0.70
              ? "Heart-Centered Nurturer"
              : "Balanced Partner";

  const compatibilityStyle =
    archetype === "Spark Connector"
      ? "You thrive with a partner who matches your pace, supports exploration, and communicates openly."
      : archetype === "Focused Strategist"
        ? "You align best with someone who respects ambition, values clarity, and builds toward shared goals."
        : archetype === "Grounded Builder"
          ? "You pair well with steady, supportive partners who prioritize long-term harmony and consistency."
          : archetype === "Quiet Planner"
            ? "You’re best with thoughtful partners who enjoy calm routines and deep trust over constant excitement."
            : archetype === "Heart-Centered Nurturer"
              ? "You resonate with emotionally present partners who prioritize family, care, and shared values."
              : "You do well with partners who balance stability with fun and communicate intentionally.";

  const timelineStyle =
    slowCommit && stability > 0.6
      ? "Deliberate alignment"
      : fastCommit && social > 0.6
        ? "Fast connection"
        : career > 0.65
          ? "Milestone-driven"
          : "Steady build";

  const confidence = Math.round(
    52 +
      22 * stability +
      10 * Math.abs(0.5 - career) +
      8 * (answers.relationshipGoals === "long_term" ? 1 : 0.6) -
      8 * Math.abs(0.5 - family)
  );

  return {
    marriageAgeRange,
    childrenRange,
    personalityArchetype: archetype,
    compatibilityStyle,
    timelineStyle,
    confidence: Math.max(35, Math.min(92, confidence))
  };
}

export function extractAnalytics(predictions) {
  return {
    marriageMid: midFromRange(predictions.marriageAgeRange),
    childrenMid: childrenMid(predictions.childrenRange),
    marriageRange: predictions.marriageAgeRange,
    childrenRange: predictions.childrenRange
  };
}

