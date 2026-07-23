import express from "express";
const router = express.Router();

import controller from "../controllers/UserController.js";

router.get("/", controller.get);

export default router;

