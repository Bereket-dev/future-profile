import mongoose from "mongoose";

const UserSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    answers: { type: Object, required: true },
    scores: {
      family: { type: Number, required: true },
      career: { type: Number, required: true },
      social: { type: Number, required: true },
      stability: { type: Number, required: true }
    },
    predictions: {
      marriageAgeRange: { type: String, required: true },
      childrenRange: { type: String, required: true },
      personalityArchetype: { type: String, required: true },
      compatibilityStyle: { type: String, required: true },
      timelineStyle: { type: String, required: true },
      confidence: { type: Number, required: true }
    },
    aiAnalysis: {
      analysis: { type: String, required: true },
      personality: { type: String, required: true },
      timeline: { type: String, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model("UserSession", UserSessionSchema);

