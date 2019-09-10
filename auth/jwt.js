import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../prisma/generated/prisma-client";
import jwt from "jsonwebtoken";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ email: payload.email });
    console.log("fff",user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (error, user) => {
    console.log("gggg",user);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

export const isAuthenticated = request => request.user;

export const generateToken = email =>
  jwt.sign({ email }, process.env.JWT_SECRET);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
