import express from "express";
const router = express.Router();

import controller from "../controllers/TransactionController";
router.get("/", controller.get);
router.post("/", controller.post);

export default router;
