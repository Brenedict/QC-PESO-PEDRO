import express from "express";
import controller from "../controllers/shift.controller";

const router = express.Router();

router.get("/:shiftId", controller.getShift);
router.get("/", controller.getShifts);

router.patch("/:shiftId/end", controller.patchShiftEnd);
router.patch("/:shiftId/verify", controller.patchShiftVerify);

export default router;
