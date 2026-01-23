import mongoose, { Schema } from "mongoose";

export interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Types.ObjectId, ref: "User" }
})

export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema)
