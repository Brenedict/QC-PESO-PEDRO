import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import handleShutdown from "./middlewares/shutdown.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import env from "./config/env.config";
import "./config/passport.config";

// Routes
import authRoutes from "./routes/auth.route";
import transactionRoutes from "./routes/transaction.route";
import userRoutes from "./routes/user.route";

// Initializers
const app = express();
const port = env.PORT;

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// ----------------- SERVER MIDDLEWARES ------------------------------

// Form and Json submission request config
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes and origins
app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Automatically parses body string to a json
app.use(express.json());

// Middleware logger
app.use(morgan("combined"));

// Middleware for cookies
app.use(cookieParser());

// --------------------- SERVER ROUTES --------------------------------

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/transaction", transactionRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorMiddleware.notFoundError);
app.use(errorMiddleware.internalError);

// --------------------- SERVER EXIT ----------------------------------

process.on("SIGINT", () => handleShutdown(server, "SIGINT"));
process.on("SIGTERM", () => handleShutdown(server, "SIGTERM"));
