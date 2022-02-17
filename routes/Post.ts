import { Request, Response } from "express";
import express from "express";
import { Post } from "../models/Post";
import { checkLoggedIn } from "../middlewares/checkLoggedIn";
import { Comment } from "../models/Comment";
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
  const { action, comment } = req.body;
  console.log({ action, comment });

  if (action !== "up" && action !== "down" && action !== "comment")
    return res.status(400).json({ success: false, msg: `Wrong input` });

  // remove votes if voted
  if (action === "up" || action === "down") {
    const currentPost = await Post.findByIdAndUpdate(
      pID,
      { $pull: { upvotes: _id, downvotes: _id } },
      { new: true }
    );
    if (!currentPost)
      return res.status(404).json({ success: false, msg: `POST NOT FOUND` });
  }
  let updatedPost;
  let newComment;
  switch (action) {
    case "up":
      updatedPost = await Post.findByIdAndUpdate(
        pID,
        { $push: { upvotes: _id } },
        { new: true }
      )
        .populate("owner", "username")
        .populate("upvotes", "username")
        .populate("downvotes", "username");
      break;
    case "down":
      updatedPost = await Post.findByIdAndUpdate(
        pID,
        { $push: { downvotes: _id } },
        { new: true }
      )
        .populate("owner", "username")
        .populate("upvotes", "username")
        .populate("downvotes", "username");
      break;
    case "comment":
      newComment = await Comment.create({
        owner: _id,
        content: comment,
        post: pID,
      });
      updatedPost = await Post.findByIdAndUpdate(
        pID,
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      )
        .populate("owner", "username")
        .populate("upvotes", "username")
        .populate("downvotes", "username");
      break;

    default:
      break;
  }

  return res.status(200).json({ success: true, updatedPost, newComment });
});

PostRouter.get("/:pID/comments", async (req: Request, res: Response) => {
  const { pID } = req.params;
  try {
    const comments = await Comment.find({ post: pID })
      .sort("-date")
      .select(["owner", "content", "downvotes", "upvotes"])
      .populate("owner", "username");
    if (!comments)
      return res
        .status(404)
        .json({ success: false, msg: `no comments for post` });
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
});
export default PostRouter;
