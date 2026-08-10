import express from "express";
import controller from "../controllers/index-controller";

const router = express.Router();

router.post("/auth/login", controller.authLoginPost);
router.post("/auth/refresh", controller.authRefreshPost);
router.post("/auth/logout", controller.authLogoutPost);

// Testing route
router.get("/protected", controller.protectedGet);

export default router;
