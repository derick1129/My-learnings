import mongoose, { Schema, Types } from "mongoose";

export interface ICourse {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    creator: Types.ObjectId;
}

const courseSchema = new Schema<ICourse>({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    }
},{
    timestamps: true
});

export const Course = mongoose.model<ICourse>("Course", courseSchema);