"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: String,
    username: { type: String, required: true },
    email: { type: String, required: true },
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    friends: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    hash: String,
    salt: String,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=User.js.map