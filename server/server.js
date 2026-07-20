const express = require("express");
const app = express();
const port = 3000;

// List of routes
const indexRoutes = require("./routes/Index");
const userRoutes = require("./routes/User"); // Temporary route

// Form submission request config
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use("/user", userRoutes); // Temporary route (MVC testing)
app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

