// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace DemoModel {
  /** 获取 */
  export const GetDemoBody = t.Object({
    name: t.String(),
  });
  export type GetDemoBody = {
    name: string;
  };
  export const GetDemoReponse = t.Object({
    _id: t.String(),
    name: t.String(),
  });
  export type GetDemoReponse = {
    _id: string;
    name: string;
  };
  /** 新增 */
  export const AddDemoBody = t.Object({
    name: t.String(),
  });
  export type AddDemoBody = {
    name: string;
  };

  export const AddDemoBodyResponse = t.Object({
    _id: t.String(),
  });
  export type AddDemoBodyResponse = {
    _id: string;
  };
}
