import express from "express";

const router = express.Router();
import controller from "../controllers/transaction.controller";

router.post("/analytics", controller.postAnalytics);
router.get("/:transactionId", controller.getTransactionById);
router.get("/", controller.getTransactions);
router.post("/", controller.postTransaction);
router.patch("/:transactionId", controller.patchTransaction);
router.delete("/:transactionId", controller.deleteTransaction);

export default router;
