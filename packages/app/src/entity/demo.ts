import { db } from "../libs/mongodb";
import { Schema, InferSchemaType } from "mongoose";

const DemoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const demoModel = db.model("Demo", DemoSchema);

export type DemoEntity = InferSchemaType<typeof DemoSchema>;
export const DemoEntity = demoModel;
