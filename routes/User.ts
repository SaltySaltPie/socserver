import { Request, Response } from "express";
import express from "express";
import { Post } from "../models/Post";
import { User } from "../models/User";
const UserRouter = express.Router();

UserRouter.get("/:uID/posts", async (req: Request, res: Response) => {
  const { uID } = req.params;
  console.log({ uID });
  try {
    const posts = await Post.find({ owner: uID })
      .sort("-date")
      .populate("owner", "username")
      .populate("upvotes", "username")
      .populate("downvotes", "username");
    if (posts.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: `No Post Found For Given UserID` });
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
});

UserRouter.get("/:uID", async (req: Request, res: Response) => {
  const uID = req.params.uID === "0" ? req.user?._id : req.params.uID;

  const user = await User.findById(uID)
    .select(["_id", "username", "posts", "comments", "friends", "following"])
    .populate("friends", "username")
    .populate("following", "username");
  if (!user)
    return res.status(404).json({ success: false, msg: `USER NOT FOUND` });
  return res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      username: user.username,
      posts: user.posts.length || 0,
      comments: user.comments.length || 0,
      friends: user.friends,
      following: user.following,
    },
  });
});

export default UserRouter;
