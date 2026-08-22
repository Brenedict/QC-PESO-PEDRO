import express from "express";
import controller from "../controllers/shift.controller";

const router = express.Router();

router.get("/", controller.getShifts);

export default router;
