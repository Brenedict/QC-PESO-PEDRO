import express from "express";

const router = express.Router();
import controller from "../controllers/transaction.controller";

router.get("/:transactionId", controller.getTransactionById);
router.get("/", controller.getTransactions);
router.post("/", controller.postTransaction);
router.patch("/:transactionId", controller.patch);
router.delete("/:transactionId", controller.delete);

export default router;
