import mongoose from "mongoose";

const ShareResultsSchema = new mongoose.Schema(
  {
    shareId: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, required: true, index: true },
    summary: {
      marriageAgeRange: { type: String, required: true },
      childrenRange: { type: String, required: true },
      archetype: { type: String, required: true },
      compatibilityStyle: { type: String, required: true },
      confidence: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model("ShareResults", ShareResultsSchema);

