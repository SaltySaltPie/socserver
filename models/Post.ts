import { Schema, model, ObjectId } from "mongoose";

interface IPost {
  owner: ObjectId;
  date: Date;
  content: string;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
  comments: ObjectId[];
}

const postSchema = new Schema<IPost>({
  owner: { type: Schema.Types.ObjectId,ref:"User", require: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Post = model("Post", postSchema);
