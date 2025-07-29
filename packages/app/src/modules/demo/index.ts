import { Elysia } from "elysia";

import { DemoService } from "./service";
import { DemoModel } from "./model";
import { BaseReponse } from "../../baseReponse";

export const demo = new Elysia({ prefix: "/demo" })
  .get(
    "",
    async ({ query }) => {
      try {
        const repsonse = await DemoService.getDemo({ name: query.name });
        return { success: true, data: repsonse };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    {
      query: DemoModel.GetDemoBody,
      response: BaseReponse(DemoModel.GetDemoReponse),
    }
  )
  .post(
    "",
    async ({ body }) => {
      try {
        const repsonse = await DemoService.addDemo({ name: body.name });
        return { success: true, data: repsonse };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    {
      body: DemoModel.AddDemoBody,
      response: BaseReponse(DemoModel.AddDemoBodyResponse),
    }
  );
