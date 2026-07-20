const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Default route");
});

router.use("/", (err, req, res, next) => {
    console.error(err);
});

module.exports = router;

