import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./config/data-source.config";
import { sanitizeInput } from "./shared/middlewares/sanitization.middleware";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { RegisterRoutes } from "./routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(sanitizeInput);

app.get("/swagger.json", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/swagger.json"));
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerUrl: "/swagger.json",
    explorer: true,
    customCssUrl: "/swagger-ui-custom.css",
  })
);

RegisterRoutes(app);

app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("🛑 Shutting down gracefully...");
  try {
    await AppDataSource.destroy();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`📖 API docs: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
