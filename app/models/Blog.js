import { models, model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
