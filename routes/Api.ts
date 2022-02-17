import express from "express";
import PostRouter from "./Post";
import PostsRouter from "./Posts";
import UserRouter from "./User";
const ApiRouter = express.Router();

ApiRouter.use("/posts", PostsRouter);
ApiRouter.use("/post", PostRouter);
ApiRouter.use("/user", UserRouter);

export default ApiRouter;
