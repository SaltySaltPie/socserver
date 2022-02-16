import { Request, Response, NextFunction } from "express";
import express from "express";
import { checkLoggedIn } from "../middlewares/checkLoggedIn";
import { Post } from "../models/Post";
import { User } from "../models/User";
const PostsRouter = express.Router();

PostsRouter.get("/:pageID", async (req: Request, res: Response) => {
  const page = parseInt(req.params.pageID) || 0;

  const posts = await Post.find({})
    .sort({ date: -1 })
    .skip(page * 100)
    .limit(100)
    .populate("owner", "username")
    .populate("upvotes", "username")
    .populate("downvotes", "username");
  res.status(200).json({ success: true, posts });
});
PostsRouter.post("/", checkLoggedIn, async (req: Request, res: Response) => {
  try {
    const newPost = await Post.create({
      owner: req.user?._id,
      content: req.body.content,
    });
    const updatedUser = await User.findByIdAndUpdate(req.user?._id, {
      $push: { posts: newPost._id },
    });
    return res
      .status(200)
      .json({ success: true, newPost, updatedUser: updatedUser?._id });
  } catch (error) {
    console.log(error);
  }
});

export default PostsRouter;
