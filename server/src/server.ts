import express from "express";
import cors from "cors";
import morgan from "morgan";
import env from "./config/env";
import handleShutdown from "./middlewares/shutdown";
import cookieParser from "cookie-parser";
import apicache from "apicache";
import "./config/passport";

// Routes
import indexRoutes from "./routes/index-route";
import transactionRoutes from "./routes/transaction-route";

// Initializers
const app = express();
const port = env.PORT;
const cache = apicache.middleware;

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

// Cache all routes
app.use(cache("5 minutes"));

// --------------------- SERVER ROUTES --------------------------------

app.use("/api/v1", indexRoutes);
app.use("/api/v1/transaction", transactionRoutes);

// --------------------- SERVER EXIT ----------------------------------

process.on("SIGINT", () => handleShutdown(server, "SIGINT"));
process.on("SIGTERM", () => handleShutdown(server, "SIGTERM"));
