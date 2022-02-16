import { NextFunction, Request, Response } from "express";
import express from "express";
import { User } from "../models/User";
import { checkExistingUser } from "../middlewares/checkExistingUser";
import bcrypt from "bcrypt";
import passport from "passport";
import { genPassword } from "../lib/passwordUtils";
import { clientURL } from "../data";

const AuthRouter = express.Router();

AuthRouter.post(
  "/login",
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log({ req: req.session });
  //   next();
  // },
  passport.authenticate("local", {
    failureMessage: true,
    successMessage: true,
  }),
  (req: Request, res: Response, next: NextFunction) => {
    console.log({ reqUserAuth: req.user });
    // req.session.user = req.user
    // res.json(req.user)
    res.status(200).json({ success: true, redirect: "/", user: req.user });
  }
);

AuthRouter.post(
  "/register",
  checkExistingUser,
  async (req: Request, res: Response) => {
    console.log(`pingedRes`);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ success: false, msg: `empty` });
    } else {
      try {
        const { salt, hash } = genPassword(req.body.password);
        const newUser = await User.create({ username, email, salt, hash });
        console.log({ newUserCreated: newUser.username });
        if (newUser)
          res.status(200).json({ success: true, redirect: "/login" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: `sys error` });
      }
    }
  }
);

AuthRouter.post("/logout", (req: Request, res: Response) => {
  req.logout();
  res.status(200).json({ success: true, redirect: "/" });
});

export default AuthRouter;
