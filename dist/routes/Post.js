"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const Post_1 = require("../models/Post");
const checkLoggedIn_1 = require("../middlewares/checkLoggedIn");
const PostRouter = express_1.default.Router();
PostRouter.get("/:pID", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { pID } = req.params;
    try {
        const post = yield Post_1.Post.findById(pID);
        if (!post)
            return res.status(404).json({ success: false, msg: "POST NOT FOUND" });
        return res.status(200).json({ success: true, post });
    }
    catch (error) {
        console.log({ error });
    }
}));
PostRouter.post("/:pID", checkLoggedIn_1.checkLoggedIn, (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    var _a;
    const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { pID } = req.params;
    const { action } = req.body;
    console.log({ action });
    if (action !== "up" && action !== "down")
        return res.status(400).json({ success: false, msg: `Wrong input` });
    // remove votes if voted
    const currentPost = yield Post_1.Post.findByIdAndUpdate(pID, { $pull: { upvotes: _id, downvotes: _id } }, { new: true });
    if (!currentPost)
        return res.status(404).json({ success: false, msg: `POST NOT FOUND` });
    const updatedPost = yield Post_1.Post.findByIdAndUpdate(pID, {
        $push: action === "up" ? { upvotes: _id } : { downvotes: _id },
    }, { new: true })
        .populate("upvotes", "username")
        .populate("downvotes", "username")
        .populate("owner", "username");
    res.status(200).json({ success: true, updatedPost });
}));
exports.default = PostRouter;
//# sourceMappingURL=Post.js.map