import express from "express";

const router = express.Router();
import controller from "../controllers/transaction.controller";

router.get("/{:transactionId}", controller.get);
router.post("/", controller.post);
router.patch("/", controller.patch);
router.delete("/", controller.delete);

export default router;
