import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    lastLoginAt: { type: Date, default: () => new Date() },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
