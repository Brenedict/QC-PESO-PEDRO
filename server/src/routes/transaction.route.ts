// General Imports
import express from "express";

// Controllers
import controller from "../controllers/transaction.controller";

const router = express.Router();

// GET
router.get("/:transactionId", controller.getTransactionById);
router.get("/", controller.getTransactions);

// POST
router.post("/analytics", controller.postAnalytics);
router.post("/", controller.postTransaction);
router.post("/download-reports/:type", controller.postReportsDownload);

// PATCH
router.patch("/:transactionId", controller.patchTransaction);

// DELETE
router.delete("/:transactionId", controller.deleteTransaction);

export default router;
