"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const Post_1 = require("../models/Post");
const UserRouter = express_1.default.Router();
UserRouter.get("/:uID/:pID", (req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const { uID } = req.params;
    console.log({ uID });
    try {
        const posts = yield Post_1.Post.find({ owner: uID })
            .populate("owner", "username")
            .populate("upvotes", "username")
            .populate("downvotes", "username");
        if (posts.length === 0)
            return res
                .status(404)
                .json({ success: false, msg: `No Post Found For Given UserID` });
        res.status(200).json({ success: true, posts });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = UserRouter;
//# sourceMappingURL=User.js.map