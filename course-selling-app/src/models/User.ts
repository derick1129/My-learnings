import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  purchasedCourses: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    purchasedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<IUser>("User", userSchema);