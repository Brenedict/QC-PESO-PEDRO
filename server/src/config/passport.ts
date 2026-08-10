import passportJwt from "passport-jwt";
import env from "./env";
import UserModel from "../models/UserModel";
import passport from "passport";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts: passportJwt.StrategyOptionsWithRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.JWT_SECRET,
    passReqToCallback: true,
};

const jwtStrategy = new JwtStrategy(opts, async (req, jwt_payload, done) => {
    try {
        const user = await UserModel.getUserByEmail(jwt_payload.email);

        if (!user) {
            req.authErrorMessage = "User email does not exist!";
            return done(null, false);
        }
        done(null, user);
    } catch (err) {
        return done(err, false);
    }
});

const requireAuth = passport.authenticate("jwt", {
    session: false,
});

export { jwtStrategy, requireAuth, passport };
