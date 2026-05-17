import { GoogleGenAI } from "@google/genai";

function safeText(x) {
  return String(x || "").slice(0, 7000);
}

function fallbackInsights(predictions) {
  const archetype = predictions?.personalityArchetype || "your archetype";
  return {
    analysis:
      "Your answers suggest a balanced pattern: you value stability and clarity, while still needing enough freedom to feel energized. People with similar profiles often do best when they slow down early on to check alignment (values, communication style, future plans), then commit steadily once trust is established. If you notice friction, it may come from mismatched pacing—one person moving quickly while the other wants more certainty. A practical approach is to set gentle check-ins and make expectations explicit, especially around commitment and family priorities.",
    personality:
      `Your archetype, ${archetype}, typically shows up as calm consistency and intentional decision-making. You’re likely attracted to partners who feel reliable and emotionally mature, and you tend to communicate best when expectations are clear. People with similar traits often build trust through actions more than words, and they value partners who respect boundaries while staying present.`,
    timeline:
      "Phase 1: Connection & calibration — you test for alignment through consistency and communication. Phase 2: Stability building — shared routines form, and long-term plans become clearer. Phase 3: Deep partnership — you focus on sustaining the relationship through practical support, honest conversations, and shared goals. People with similar profiles tend to thrive when they keep growth and affection present, even during busy seasons."
  };
}

function buildPrompt({ answers, scores, predictions }) {
  return `
You are Singloliness, an AI-powered relationship insights writer.

Important:
- This is NOT fortune-telling.
- Avoid certainty and guarantees.
- Use wording like: "your answers suggest…", "people with similar traits often…", "statistically similar profiles tend to…".
- Keep the tone premium, warm, and realistic.

User answers (structured):
${safeText(JSON.stringify(answers, null, 2))}

Calculated scores (0-100):
${safeText(JSON.stringify(scores, null, 2))}

Deterministic predictions (already computed):
${safeText(JSON.stringify(predictions, null, 2))}

Write THREE sections in JSON with keys:
- analysis: 120-170 words realistic relationship insight analysis
- personality: 90-140 words explaining the archetype and how it shows up in relationships
- timeline: 100-160 words describing a 3-phase relationship timeline narrative (no dates, no guarantees)

Return STRICT JSON only (no markdown).`.trim();
}

export async function generateGeminiInsights({ answers, scores, predictions }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    return fallbackInsights(predictions);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model,
      contents: buildPrompt({ answers, scores, predictions })
    });
    const text = response?.text || response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    try {
      return JSON.parse(text);
    } catch {
      return {
        analysis: safeText(text),
        personality: "Your results were generated, but the AI response format was unexpected. Please retry.",
        timeline:
          "People with similar profiles often experience relationships in phases: connection, alignment, then deeper commitment."
      };
    }
  } catch (e) {
    console.warn("[gemini] generateContent failed; using fallback insights:", e?.message || e);
    return fallbackInsights(predictions);
  }
}
