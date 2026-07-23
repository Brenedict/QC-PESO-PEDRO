import express from "express";
const app = express();
const port = 3000;

// List of routes
import indexRoutes from "./routes/Index.js";
import userRoutes from "./routes/User.js"; // Temporary route

// Form submission request config
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use("/user", userRoutes); // Temporary route (MVC testing)
app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
