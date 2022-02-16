"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", require: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    upvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=Comment.js.map