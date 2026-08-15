import express from "express";
import controller from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", controller.loginPost);
router.post("/refresh", controller.refreshPost);
router.post("/logout", controller.logoutPost);

// Testing route
router.get("/protected", controller.protectedGet);
export default router;
