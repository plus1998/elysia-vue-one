import { DemoModel } from "./model";
import { DemoEntity } from "@backend/entity/demo";

export abstract class DemoService {
  static async getDemo({ name }: DemoModel.GetDemoBody) {
    const demoRow = await DemoEntity.findOne({ name });
    if (!demoRow) {
      throw new Error("Invalid name");
    }
    return {
      _id: demoRow._id.toString(),
      name: demoRow.name,
    };
  }
  static async addDemo({ name }: DemoModel.AddDemoBody) {
    const demo = await DemoEntity.create({ name });
    if (!demo) {
      throw new Error("Invalid name");
    }
    return {
      _id: demo._id.toString(),
    };
  }
}
