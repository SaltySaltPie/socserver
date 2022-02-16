import { Schema, model, ObjectId } from "mongoose";

interface IUser {
  id: string;
  username: string;
  email: string;
  posts: ObjectId[];
  comments: ObjectId[];
  friends: ObjectId[];
  following : ObjectId[];
  hash: string;
  salt: string;
}

const userSchema = new Schema<IUser>({
  id: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  hash: String,
  salt: String,
});

export const User = model("User", userSchema);
