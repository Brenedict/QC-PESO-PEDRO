// General Import
import express from "express";

// Controller
import controller from "../controllers/user.controller";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/me", controller.getCurrentUser);
router.get("/:userId", controller.getUserById);
router.post("/", controller.post);
router.patch("/:userId", controller.patch);
router.delete("/:userId", controller.delete);

export default router;
