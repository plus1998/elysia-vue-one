import { db } from "../libs/mongodb";
import { Schema, InferSchemaType } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

const userModel = db.model("User", UserSchema);

// 创建一个admin
const admin = await userModel.findOne({ username: 'admin', role: "admin" });
if (!admin) {
  await userModel.create({
    username: "admin",
    password: "public",
    role: "admin",
  });
}

export type User = InferSchemaType<typeof UserSchema>;
export const User = userModel;
