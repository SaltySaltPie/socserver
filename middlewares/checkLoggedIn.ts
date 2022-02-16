import { Request, Response, NextFunction } from "express";
export const checkLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) res.status(401).json({ success: false, redirect: "/login" });
  next();
};
