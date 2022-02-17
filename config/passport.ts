import { ObjectId } from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { validPassword } from "../lib/passwordUtils";
import { User } from "../models/User";

// const verifyCB = (username: string, password: string, done: any) => {};
// const strategy = new LocalStrategy({}, verifyCB);
// passport.use(strategy);

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, cb) => {
      console.log({ username });
      try {
        console.log(`localStrat`);
        const user = await User.findOne({
          username: { $regex: `^${username}$`, $options: "i" },
        }).select(["username", "hash", "salt"]);
        console.log({ user });
        if (!user) return cb(null, false);
        if (validPassword({ password, hash: user.hash, salt: user.salt })) {
          console.log(`correct pass`);

          return cb(null, user);
        } else return cb(null, false);
      } catch (error) {
        cb(error);
      }
    }
  )
);

declare global {
  namespace Express {
    interface User {
      id: any;
      _id: any;
    }
  }
}

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select(["_id", "username"]);
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
