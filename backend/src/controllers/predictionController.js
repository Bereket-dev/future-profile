import { nanoid } from "nanoid";
import UserSession from "../models/UserSession.js";
import Analytics from "../models/Analytics.js";
import { AnswersSchema } from "../utils/validate.js";
import { computePredictions, computeScores, extractAnalytics } from "../services/predictionEngine.js";
import { generateGeminiInsights } from "../services/geminiService.js";

async function updateAnalytics(predictions) {
  const extracted = extractAnalytics(predictions);
  if (extracted.marriageMid == null || extracted.childrenMid == null) return;

  const key = "global";
  const doc = await Analytics.findOneAndUpdate(
    { key },
    { $setOnInsert: { key } },
    { upsert: true, new: true }
  );

  const n = doc.totalUsers + 1;
  const avgMarriageAgeMid = (doc.avgMarriageAgeMid * doc.totalUsers + extracted.marriageMid) / n;
  const avgChildrenMid = (doc.avgChildrenMid * doc.totalUsers + extracted.childrenMid) / n;

  const nextMarriage = new Map(doc.commonMarriageRanges);
  nextMarriage.set(extracted.marriageRange, (nextMarriage.get(extracted.marriageRange) || 0) + 1);

  const nextChildren = new Map(doc.commonChildrenRanges);
  nextChildren.set(extracted.childrenRange, (nextChildren.get(extracted.childrenRange) || 0) + 1);

  await Analytics.updateOne(
    { key },
    {
      $set: {
        avgMarriageAgeMid,
        avgChildrenMid,
        commonMarriageRanges: Object.fromEntries(nextMarriage),
        commonChildrenRanges: Object.fromEntries(nextChildren)
      },
      $inc: { totalUsers: 1 }
    }
  );
}

export async function createPrediction(req, res) {
  const parsed = AnswersSchema.safeParse(req.body?.answers);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid answers", issues: parsed.error.issues });
  }
  const answers = parsed.data;

  const scores = computeScores(answers);
  const predictions = computePredictions(answers, scores);
  const aiAnalysis = await generateGeminiInsights({ answers, scores, predictions });

  const sessionId = nanoid(12);
  const createdAt = new Date().toISOString();

  try {
    await UserSession.create({
      sessionId,
      answers,
      scores,
      predictions,
      aiAnalysis
    });
    await updateAnalytics(predictions);
  } catch (e) {
    // DB may be offline; still return results for UX.
  }

  return res.json({
    sessionId,
    session: {
      sessionId,
      answers,
      scores,
      predictions,
      aiAnalysis,
      createdAt
    }
  });
}
