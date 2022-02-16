import { Request, Response } from "express";
import express from "express";
import { User } from "../models/User";
const ApiRouter = express.Router();

ApiRouter.get("/user/:uID", async (req: Request, res: Response) => {
  const uID  = req.params.uID === "0" ? req.user?._id : req.params.uID;
  console.log({uID})
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

export default ApiRouter;
