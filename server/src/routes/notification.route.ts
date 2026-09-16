// General Imports
import express from "express";

// Controller
import controller from "../controllers/notification.controller";

const router = express.Router();

// GET
router.get("/", controller.getAll);

// PATCH
router.patch("/read", controller.markAllRead);

export default router;