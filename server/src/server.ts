import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = 3000;

// List of routes
import indexRoutes from "./routes/Index";
import userRoutes from "./routes/User"; // Temporary route
import transactionRoutes from "./routes/Transaction";

// Form and Json submission request config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors());

// Middleware logger
app.use(morgan("combined"));

// Application Routes
app.use("/api/user", userRoutes); // Temporary route (MVC testing)
app.use("/api/transaction", transactionRoutes);
app.use("/api", indexRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
