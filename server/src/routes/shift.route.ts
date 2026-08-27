import express from "express";
import controller from "../controllers/shift.controller";

const router = express.Router();

// Shift Status Route
router.get("/status", controller.getShiftStatus);
router.get("/:shiftId", controller.getShift);
router.get("/", controller.getShifts);

router.post("/", controller.createShift);

router.patch("/:shiftId/end", controller.patchShiftEnd);
router.patch("/:shiftId/verify", controller.patchShiftVerify);
router.patch("/:shiftId/revise", controller.patchShiftRevise);

export default router;
