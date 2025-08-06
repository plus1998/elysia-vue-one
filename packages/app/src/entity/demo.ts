import { prop, getModelForClass } from '@typegoose/typegoose';
import { db } from "@backend/libs/mongodb";

export class Demo {
  @prop({ type: String, required: true, unique: true })
  public name!: string;
}

export const DemoEntity = getModelForClass(Demo, { 
  existingConnection: db.connection 
});
export type DemoEntity = Demo;
