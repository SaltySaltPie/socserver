"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const User_1 = require("../models/User");
const ApiRouter = express_1.default.Router();
ApiRouter.get("/user/:uID", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    var _a;
    const uID = req.params.uID === "0" ? (_a = req.user) === null || _a === void 0 ? void 0 : _a._id : req.params.uID;
    console.log({ uID });
    const user = yield User_1.User.findById(uID)
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
}));
exports.default = ApiRouter;
//# sourceMappingURL=Api.js.map