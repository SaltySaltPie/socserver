"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", require: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    upvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
//# sourceMappingURL=Post.js.map