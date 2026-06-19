import "reflect-metadata";
import createError from "http-errors";
import * as cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "morgan";
// Routes
import simsRouter from "./routes/sims.js";
import { initializeDatabase } from "./data-source.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();
// Environment-specific origins
const allowedOrigins = process.env.NODE_ENV === "production"
    ? (process.env.ALLOWED_ORIGINS?.split(",") || [])
    : ["http://localhost:3000", "http://localhost:5173"];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(logger("dev"));
app.use(cors.default(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/api/sims", simsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "NotFoundError") {
        res.status(404).json({ error: err.message });
        return;
    }
    // Default to 500
    res.status(500).json({ error: "Internal Server Error" });
});
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Sim API running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
export default app;
//# sourceMappingURL=index.js.map