import { models, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    firebaseuid: {
      type: String,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },
    photo: {
      type: String, // Assuming the avatar is a URL or file path
    },

    // New fields for Passport configuration
    is_superuser: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_blogger: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Follow",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notify",
      },
    ],
    profileVisibility: {
      type: String,
      enum: ["Public", "Private", "Friends Only"],
      default: "Public",
    },
    website: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    socialMediaProfiles: [
      {
        platform: String,
        url: String,
      },
    ],
    referrals: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
