import express from "express";
import UserModel from "../models/UserModel";
import env from "../config/env";
import jwt from "jsonwebtoken";
import { requireAuth } from "../config/passport";

const router = express.Router();

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.getUserByEmail(email);

    if (!user) return res.status(404).json({ error: "User email not found." });
    if (user.password !== password) return res.status(401).json({ error: "Password is incorrect." });

    const opts = { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions;
    const token = jwt.sign({ user }, env.JWT_SECRET, opts);

    res.status(200).json({ message: "Auth passed.", token });
});

// Testing route
router.get("/protected", requireAuth, (_req, res) => {
    return res.status(200).json({ message: "This is a protected route." });
});

export default router;
