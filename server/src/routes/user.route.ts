// General Import
import express from "express";

// Controller
import controller from "../controllers/user.controller";

const router = express.Router();

// GET
router.get("/", controller.getUsers);
router.get("/me", controller.getCurrentUser);
router.get("/:userId", controller.getUserById);

// POST
router.post("/", controller.createUser);

// PATCH
router.patch("/:userId/reset-password", controller.resetPassword);
router.patch("/:userId", controller.patch);

// DELETE
router.delete("/:userId", controller.delete);

export default router;
