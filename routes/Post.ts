import { Request, Response } from "express";
import express from "express";
import { Post } from "../models/Post";
import { checkLoggedIn } from "../middlewares/checkLoggedIn";
const PostRouter = express.Router();

PostRouter.get("/:pID", async (req: Request, res: Response) => {
  const { pID } = req.params;
  try {
    const post = await Post.findById(pID);
    if (!post)
      return res.status(404).json({ success: false, msg: "POST NOT FOUND" });
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log({ error });
  }
});

PostRouter.post("/:pID", checkLoggedIn, async (req: Request, res: Response) => {
  const _id = req.user?._id;
  const { pID } = req.params;
  const { action } = req.body;
  console.log({ action });

  if (action !== "up" && action !== "down")
    return res.status(400).json({ success: false, msg: `Wrong input` });

  // remove votes if voted
  const currentPost = await Post.findByIdAndUpdate(
    pID,
    { $pull: { upvotes: _id, downvotes: _id } },
    { new: true }
  );
  if (!currentPost)
    return res.status(404).json({ success: false, msg: `POST NOT FOUND` });
  const updatedPost = await Post.findByIdAndUpdate(
    pID,
    {
      $push: action === "up" ? { upvotes: _id } : { downvotes: _id },
    },
    { new: true }
  )
    .populate("upvotes", "username")
    .populate("downvotes", "username")
    .populate("owner", "username");
  res.status(200).json({ success: true, updatedPost });
});

export default PostRouter;
