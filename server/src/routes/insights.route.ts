// General Imports
import express from "express";

// Controllers
import controller from "../controllers/insights.controller";

const router = express.Router();

// POST
router.post("/", controller.postInsights);

export default router;
