import { Router } from "express";
import { getSession } from "../controllers/sessionController.js";

const router = Router();

router.get("/sessions/:sessionId", getSession);

export default router;

