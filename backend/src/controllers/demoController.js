export async function getDemoSession(req, res) {
  return res.json({
    sessionId: "demo",
    session: {
      sessionId: "demo",
      answers: {
        age: 25,
        gender: "prefer_not",
        country: "ET",
        education: "bachelors",
        introExtro: 62,
        careerPriority: 58,
        relationshipGoals: "long_term",
        desireChildren: "maybe",
        socialActivity: 55,
        familyImportance: 66,
        lifestyle: "balanced",
        commitment: "medium"
      },
      scores: { family: 72, career: 63, social: 59, stability: 74 },
      predictions: {
        marriageAgeRange: "27–31",
        childrenRange: "0–1",
        personalityArchetype: "Grounded Builder",
        compatibilityStyle:
          "You pair well with steady, supportive partners who prioritize long-term harmony and consistency.",
        timelineStyle: "Deliberate alignment",
        confidence: 78
      },
      aiAnalysis: {
        analysis:
          "Your answers suggest a stability-forward pattern with a thoughtful pace. People with similar traits often prefer to build trust through consistency, shared routines, and clear communication rather than dramatic highs and lows. You’re likely to feel most secure in relationships where expectations are discussed early, especially around commitment and future planning. When conflicts show up, they may be less about emotion and more about timing—how quickly each person wants to define the relationship or make big decisions. A helpful approach is to treat alignment as an ongoing practice: short check-ins, shared goals, and a willingness to adjust.",
        personality:
          "As a Grounded Builder, you tend to value reliability, respect, and practical care. You likely show love through support, thoughtful planning, and steady presence. People with similar profiles often thrive with partners who appreciate calm consistency and don’t confuse “stable” with “boring.” You do best when a relationship includes both structure (trust, routines, shared plans) and a small but meaningful dose of novelty (new experiences, learning together).",
        timeline:
          "Phase 1: Connection & clarity — you’re drawn to steady signals and honest communication, and you test alignment through day-to-day consistency. Phase 2: Stability building — routines form, plans get clearer, and commitment deepens as trust grows. Phase 3: Long-term partnership — you focus on maintaining closeness through practical support, shared responsibility, and intentional quality time. People with similar traits often succeed when they keep communication simple, consistent, and kind."
      },
      createdAt: new Date().toISOString()
    }
  });
}

