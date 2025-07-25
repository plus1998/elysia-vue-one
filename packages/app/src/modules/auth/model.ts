// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace AuthModel {
  /** 注册 */
  export const signUpBody = t.Object({
    username: t.String(),
    email: t.String(),
    password: t.String(),
  });
  export type signUpBody = {
    username: string;
    email: string;
    password: string;
  };
  export const signUpResponse = t.Object({
    _id: t.String(),
    email: t.String(),
  });
  export type signUpResponse = {
    _id: string;
    email: string;
  };
  /** 登录 */
  export const signInBody = t.Object({
    email: t.String(),
    password: t.String(),
  });
  export type signInBody = {
    email: string;
    password: string;
  };

  export const signInResponse = t.Object({
    token: t.String(),
    refreshToken: t.String(),
  });
  export type signInResponse = {
    token: string;
    refreshToken: string;
  };

  export const signInInvalid = t.String();
  export type signInInvalid = String;
}
