/**
 * Roast Engine - Generates singleness-focused roasts based on actual behavior patterns
 */

function analyzeSingleness(answers) {
    const introExtro = answers.introExtro || 50;
    const careerPriority = answers.careerPriority || 50;
    const socialActivity = answers.socialActivity || 50;
    const commitment = answers.commitment || "medium";

    // Singleness-focused roasts
    const roasts = [];

    if (introExtro < 30 && commitment === "slow") {
        roasts.push("You are not single by accident. Your reply speed has legal consequences.");
        roasts.push("You overthink more relationships than you actually enter.");
    }

    if (socialActivity < 40) {
        roasts.push("Your love life currently runs on imagination and screenshots.");
        roasts.push("You treat relationships like unfinished side quests.");
        roasts.push("You are emotionally online but romantically offline.");
    }

    if (introExtro > 70 && careerPriority > 60) {
        roasts.push("You want loyalty but disappear emotionally after one deep conversation.");
        roasts.push("You communicate interest like a software update notification.");
        roasts.push("Your standards are premium but your communication is budget version.");
    }

    if (commitment === "slow") {
        roasts.push("You say 'I'm chill' while mentally planning five future arguments.");
        roasts.push("You don't fear relationships. You fear consistency.");
        roasts.push("You are not scared of love, just tired of trying.");
    }

    if (introExtro < 35) {
        roasts.push("You flirt like someone answering customer support tickets.");
        roasts.push("Your emotional availability depends heavily on music and midnight.");
    }

    // Default roasts if none matched
    if (roasts.length === 0) {
        roasts.push("You are single because you are comfortable being single.");
        roasts.push("Your dating history is more fiction than fact.");
        roasts.push("You overthink conversations you never had.");
        roasts.push("You have standards. You just never communicate them.");
    }

    return roasts;
}

function analyzeAttachment(answers) {
    const desireChildren = answers.desireChildren;
    const relationshipGoals = answers.relationshipGoals;

    const roasts = [];

    if (relationshipGoals === "adventure" || relationshipGoals === "unsure") {
        roasts.push("You failed the talking stage. Multiple times.");
        roasts.push("Your attachment issues have attachment issues.");
        roasts.push("You ghost before they can ghost you.");
    }

    if (desireChildren === "no" || desireChildren === "maybe") {
        roasts.push("You want freedom disguised as loyalty.");
        roasts.push("Your commitment timeline is vague and convenient.");
    }

    if (relationshipGoals === "growth") {
        roasts.push("You are waiting for someone who does not exist.");
        roasts.push("You have unrealistic standards and realistic dating failures.");
    }

    if (roasts.length === 0) {
        roasts.push("You know what you want but do not know how to ask.");
        roasts.push("Your emotional confusion is very on brand for you.");
    }

    return roasts;
}

function analyzePersonality(answers) {
    const lifestyle = answers.lifestyle;
    const commitment = answers.commitment;
    const education = answers.education;

    const roasts = [];

    if (lifestyle === "dynamic" && commitment === "fast") {
        roasts.push("You fall hard and disappear harder.");
        roasts.push("Your feelings move at internet speed but your consistency is dial-up.");
    }

    if (lifestyle === "calm" && commitment === "slow") {
        roasts.push("You date like you are choosing a career you will never start.");
        roasts.push("Your standards have a waiting list you will never fill.");
        roasts.push("You overthink more than you actually date.");
    }

    if (education === "phd" || education === "masters") {
        roasts.push("You intellectualize love while your love life stays theoretical.");
        roasts.push("Your big brain energy forgot how to have conversations.");
    }

    if (lifestyle === "social") {
        roasts.push("You are everyone's best friend. No one's choice.");
        roasts.push("You have too many options and zero commitment.");
    }

    if (roasts.length === 0) {
        roasts.push("You are single because consistency is not your personality.");
        roasts.push("You have potential. Just not in dating.");
    }

    return roasts;
}

export function generateRedFlags(answers) {
    const introExtro = answers.introExtro || 50;
    const socialActivity = answers.socialActivity || 50;
    const familyImportance = answers.familyImportance || 50;
    const careerPriority = answers.careerPriority || 50;
    const commitment = answers.commitment || "medium";

    return [
        {
            name: "Overthinking Level",
            value: Math.abs(introExtro - 50) > 20 ? 70 : 35,
            description:
                introExtro < 40
                    ? "Your mind works faster than your words can catch up."
                    : "You analyze every text like it's Shakespeare."
        },
        {
            name: "Ghosting Probability",
            value: introExtro < 30 && commitment === "slow" ? 65 : 25,
            description: introExtro < 30 ? "Sometimes disappearing is easier." : "You're reliable, mostly."
        },
        {
            name: "Dry Texter Energy",
            value: introExtro < 40 ? 75 : 20,
            description: introExtro < 40 ? "'k' is a valid response." : "You keep conversations alive."
        },
        {
            name: "Jealousy Meter",
            value: socialActivity > 65 && familyImportance < 40 ? 55 : 35,
            description: socialActivity > 65 ? "You notice when they don't." : "You trust, usually."
        },
        {
            name: "Mixed Signal Score",
            value: Math.abs(careerPriority - 50) + Math.abs(socialActivity - 50) > 50 ? 60 : 30,
            description: careerPriority > 60 ? "Prioritize unclear." : "Your signals are pretty clear."
        },
        {
            name: "Emotional Availability",
            value: 100 - (Math.abs(introExtro - 50) * 0.8 + Math.abs(familyImportance - 50) * 0.4),
            description: familyImportance > 60 ? "Present when it matters." : "Emotionally available on demand."
        },
        {
            name: "Commitment Fear",
            value:
                commitment === "slow"
                    ? 65
                    : commitment === "fast"
                        ? 20
                        : 40,
            description:
                commitment === "slow"
                    ? "Speed bump psychology."
                    : commitment === "fast"
                        ? "All in or all out."
                        : "Cautiously optimistic."
        },
        {
            name: "Late Reply Energy",
            value: introExtro < 35 && careerPriority > 60 ? 80 : 30,
            description:
                introExtro < 35 && careerPriority > 60
                    ? "You're busy OR that's your mood."
                    : "You respond when you can."
        }
    ];
}

export function generateRoast(answers) {
    const all = [
        ...analyzeSingleness(answers),
        ...analyzeAttachment(answers),
        ...analyzePersonality(answers)
    ];

    return (
        all[Math.floor(Math.random() * all.length)] ||
        "You are single on purpose or by accident. Either way, it is working."
    );
}
