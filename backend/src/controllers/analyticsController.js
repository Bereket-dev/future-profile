import Analytics from "../models/Analytics.js";

export async function getAnalytics(req, res) {
  const doc = await Analytics.findOne({ key: "global" }).lean();
  if (!doc) return res.json({ totalUsers: 0 });
  return res.json({
    totalUsers: doc.totalUsers,
    avgMarriageAgeMid: Math.round(doc.avgMarriageAgeMid * 10) / 10,
    avgChildrenMid: Math.round(doc.avgChildrenMid * 10) / 10,
    commonMarriageRanges: Object.fromEntries(doc.commonMarriageRanges || []),
    commonChildrenRanges: Object.fromEntries(doc.commonChildrenRanges || [])
  });
}

