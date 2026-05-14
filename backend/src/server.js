import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use("/api", predictionRoutes);
app.use("/api", sessionRoutes);
app.use("/api", shareRoutes);
app.use("/api", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 8080);

await connectDb();
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`FutureBond AI backend listening on :${port}`);
});

