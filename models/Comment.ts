import { Schema, model, ObjectId } from "mongoose";

interface IComment {
  owner: ObjectId;
  post: ObjectId;
  date: Date;
  content: string;
  upvotes: ObjectId[];
  downvotes: ObjectId[];
}

const commentSchema = new Schema<IComment>({
  owner: { type: Schema.Types.ObjectId, ref: "User", require: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", require: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Comment = model("Comment", commentSchema);
