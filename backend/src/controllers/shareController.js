import { nanoid } from "nanoid";
import ShareResults from "../models/ShareResults.js";

export async function createShare(req, res) {
  const { sessionId, summary } = req.body || {};
  if (!sessionId || !summary) return res.status(400).json({ message: "Missing sessionId/summary" });

  const shareId = nanoid(10);
  try {
    await ShareResults.create({
      shareId,
      sessionId,
      summary
    });
  } catch (e) {
    // ignore if DB down
  }

  return res.json({ shareId });
}

export async function getShare(req, res) {
  const { shareId } = req.params;
  const doc = await ShareResults.findOne({ shareId }).lean();
  if (!doc) return res.status(404).json({ message: "Share not found" });
  return res.json({
    shareId: doc.shareId,
    sessionId: doc.sessionId,
    summary: doc.summary,
    createdAt: doc.createdAt
  });
}

