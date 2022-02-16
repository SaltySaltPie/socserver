import { Request, Response } from "express";
import express from "express";
import { clientURL } from "../data";
const TestRouter = express.Router();

TestRouter.get("/", (req: Request, res: Response) => {
  console.log(`tested`);
  console.log({ sess: req.session });
  console.log({ user: req.user });

  return res.status(200).json({ success: true, user: req.user || null });
});

export default TestRouter;
