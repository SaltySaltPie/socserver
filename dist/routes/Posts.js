"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const checkLoggedIn_1 = require("../middlewares/checkLoggedIn");
const Post_1 = require("../models/Post");
const User_1 = require("../models/User");
const PostsRouter = express_1.default.Router();
PostsRouter.get("/:pageID", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const page = parseInt(req.params.pageID) || 0;
    const posts = yield Post_1.Post.find({})
        .sort({ date: -1 })
        .skip(page * 100)
        .limit(100)
        .populate("owner", "username")
        .populate("upvotes", "username")
        .populate("downvotes", "username");
    res.status(200).json({ success: true, posts });
}));
PostsRouter.post("/", checkLoggedIn_1.checkLoggedIn, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const newPost = yield Post_1.Post.create({
            owner: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            content: req.body.content,
        });
        const updatedUser = yield User_1.User.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
            $push: { posts: newPost._id },
        });
        return res
            .status(200)
            .json({ success: true, newPost, updatedUser: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = PostsRouter;
//# sourceMappingURL=Posts.js.map