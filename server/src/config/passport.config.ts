// General Imports
import type { Request } from "express";
import passport from "passport";
import passportJwt from "passport-jwt";
import { Strategy as LocalStrategy, type VerifyFunction } from "passport-local";
import env from "./env.config";

// Model
import UserModel from "../models/user.model";

// Utils
import HashUtil from "../utils/hash.util";

// ------------------- PASSPORT LOCAL STRATEGY -------------------------------------

// For standard email and password login
const customFields = {
    usernameField: "email",
    passwordField: "password",
};

const verifyFunction: VerifyFunction = async (email, password, done) => {
    try {
        const user = await UserModel.getByEmail(email);

        if (!user) return done(null, false, { message: "Email not found" });

        const match = await HashUtil.comparePassword(password, user.password);
        if (!match) return done(null, false, { message: "Password Incorrect" });

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
};

passport.use(new LocalStrategy(customFields, verifyFunction));

// ------------------- PASSPORT JWT STRATEGY --------------------------------------

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// Verify function for JWT
const verifyCallback: passportJwt.VerifyCallback = async (jwtPayload, done) => {
    try {
        const user = await UserModel.getById(jwtPayload.sub);

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        return done(err, false);
    }
};

// JWT verification for access token
const jwtAccessOpts: passportJwt.StrategyOptionsWithoutRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_ACCESS_SECRET,
};

// JWT verification for refresh token
const jwtRefreshOpts: passportJwt.StrategyOptionsWithoutRequest = {
    jwtFromRequest: (req: Request) => {
        let token = null;
        if (req && req.cookies) token = req.cookies.refreshToken; //HTTP-only cookie
        return token;
    },
    secretOrKey: env.JWT_REFRESH_SECRET,
};

passport.use("jwt-access", new JwtStrategy(jwtAccessOpts, verifyCallback));
passport.use("jwt-refresh", new JwtStrategy(jwtRefreshOpts, verifyCallback));

export default passport;
