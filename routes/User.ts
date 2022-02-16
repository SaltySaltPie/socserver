import { Request, Response } from "express";
import express from "express";
import { Post } from "../models/Post";
const UserRouter = express.Router();

UserRouter.get("/:uID/:pID", async (req: Request, res: Response) => {
  const { uID } = req.params;
  console.log({ uID });
  try {
    const posts = await Post.find({ owner: uID })
      .populate("owner", "username")
      .populate("upvotes", "username")
      .populate("downvotes", "username");
    if (posts.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: `No Post Found For Given UserID` });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
});

export default UserRouter;
