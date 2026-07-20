const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Default route");
});

module.exports = router;