import express from "express";
import { jwtStrategy, passport } from "./config/passport";
import env from "./config/env";
import indexRoutes from "./routes/indexRoute";
import handleShutdown from "./middlewares/shutdown";

// Initializers
const app = express();
const port = env.PORT;

// ----------------- SERVER MIDDLEWARES ------------------------------

// Automatically parses body string to a json
app.use(express.json());

// Form submission request config
app.use(express.urlencoded({ extended: true }));

// Jwt validator (Passport)
passport.use(jwtStrategy);

const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// --------------------- SERVER ROUTES --------------------------------

app.use("/", indexRoutes);

// --------------------- SERVER EXIT ----------------------------------

process.on("SIGINT", () => handleShutdown(server, "SIGINT"));
process.on("SIGTERM", () => handleShutdown(server, "SIGTERM"));
