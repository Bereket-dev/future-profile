import { Router } from "express";
import { createShare, getShare } from "../controllers/shareController.js";

const router = Router();

router.post("/share", createShare);
router.get("/share/:shareId", getShare);

export default router;

