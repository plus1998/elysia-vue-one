// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace DemoModel {
  /** 获取 */
  export const GetDemoBody = t.Object({
    name: t.String(),
  });
  export type GetDemoBody = typeof GetDemoBody.static;
  export const GetDemoReponse = t.Object({
    _id: t.String(),
    name: t.String(),
  });
  export type GetDemoReponse = typeof GetDemoReponse.static;
  /** 新增 */
  export const AddDemoBody = t.Object({
    name: t.String(),
  });
  export type AddDemoBody = typeof AddDemoBody.static;

  export const AddDemoBodyResponse = t.Object({
    _id: t.String(),
  });
  export type AddDemoBodyResponse = typeof AddDemoBodyResponse.static;
}
