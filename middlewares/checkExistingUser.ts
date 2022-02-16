import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const checkExistingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(`check Existing User`);

    const emailCheck = await User.find({ email: req.body.email });
    if (emailCheck.length > 0)
      return res
        .status(200)
        .json({ success: false, msg: `email existed`, ec: "ee" });
    const username = await User.find({ username: req.body.username });
    if (username.length > 0)
      return res
        .status(200)
        .json({ success: false, msg: `username existed`, ec: "uc" });
    next();
  } catch (error) {
    console.log({ error });
  }
};
