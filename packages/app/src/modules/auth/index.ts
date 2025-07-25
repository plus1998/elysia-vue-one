import { Elysia } from "elysia";

import { Auth } from "./service";
import { AuthModel } from "./model";
import { BaseReponse } from "../../baseReponse";

export const auth = new Elysia({ prefix: "/auth" }).post(
  "/login",
  async ({ body }) => {
    try {
      const response = await Auth.signIn(body);

      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
  {
    body: AuthModel.signInBody,
    response: {
      200: BaseReponse(AuthModel.signInResponse),
      400: BaseReponse(AuthModel.signInInvalid),
    },
  }
);
