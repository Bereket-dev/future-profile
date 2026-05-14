import UserSession from "../models/UserSession.js";

export async function getSession(req, res) {
  const { sessionId } = req.params;
  const doc = await UserSession.findOne({ sessionId }).lean();
  if (!doc) return res.status(404).json({ message: "Session not found" });
  return res.json({
    sessionId: doc.sessionId,
    answers: doc.answers,
    scores: doc.scores,
    predictions: doc.predictions,
    aiAnalysis: doc.aiAnalysis,
    createdAt: doc.createdAt
  });
}

