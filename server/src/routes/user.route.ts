import express from "express";

const router = express.Router();
import controller from "../controllers/user.controller";

router.get("/", controller.getUsers);
router.get("/:userId", controller.getUserById);
router.post("/", controller.post);
router.patch("/:userId", controller.patch);
router.delete("/:userId", controller.delete);

export default router;
