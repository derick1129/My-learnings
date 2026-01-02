import type { Types } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId?: Types.ObjectId;
            adminId?: Types.ObjectId;
            role?: "admin" | "user"
        }
    }
}