import { Router } from "express";
import { createPrediction } from "../controllers/predictionController.js";
import { getDemoSession } from "../controllers/demoController.js";

const router = Router();

router.post("/predict", createPrediction);
router.get("/demo-session", getDemoSession);

export default router;

