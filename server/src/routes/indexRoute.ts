import express from "express";
import IndexController from "../controllers/IndexController";

const router = express.Router();

router.post("/auth/login", IndexController.authLoginPost);
router.post("/auth/refresh", IndexController.authRefreshPost);
router.post("/auth/logout", IndexController.authLogoutPost);

// Testing route
router.get("/protected", IndexController.protectedGet);

export default router;
