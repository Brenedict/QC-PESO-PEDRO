import express from "express";
import controller from "../controllers/log.controller";

const router = express.Router();

router.get("/", controller.getOverview);
router.get("/:userId", controller.getAccountLog);

export default router;
