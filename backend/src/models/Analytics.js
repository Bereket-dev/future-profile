import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    totalUsers: { type: Number, required: true, default: 0 },
    avgMarriageAgeMid: { type: Number, required: true, default: 0 },
    avgChildrenMid: { type: Number, required: true, default: 0 },
    commonMarriageRanges: { type: Map, of: Number, default: {} },
    commonChildrenRanges: { type: Map, of: Number, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", AnalyticsSchema);

