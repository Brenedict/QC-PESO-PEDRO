// General Import
import express from "express";

// Controller
import controller from "../controllers/audit.controller";

const router = express.Router();

// GET
router.get("/", controller.getAudits);

export default router;
