import mongoose, { Schema } from "mongoose";

export interface IAdmin {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
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
    }
  },
  {
    timestamps: true
  }
);

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);