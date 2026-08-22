// General Imports
import express from "express";

// Controllers
import controller from "../controllers/auth.controller";

const router = express.Router();

// Auth Routes
router.post("/login", controller.loginPost);
router.post("/refresh", controller.refreshPost);
router.post("/logout", controller.logoutPost);

// Reset Password
router.patch("/forgot-password", controller.forgotPasswordPost);
router.get("/protected/reset-password", controller.protectedResetPasswordGet);
router.patch("/reset-password", controller.resetPasswordPost);

// Protected Route
router.get("/protected", controller.protectedGet);
export default router;
