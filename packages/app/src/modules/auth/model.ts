// Model define the data structure and validation for the request and response
import { t } from "elysia";

export namespace AuthModel {
  // Define a DTO for Elysia validation
  export const signInBody = t.Object({
    username: t.String(),
    password: t.String(),
  });
  // Define it as TypeScript type
  export type signInBody = {
    username: string;
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
