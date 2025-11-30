import BetterAuth from "@backend/libs/betterAuth";
import Elysia from "elysia";

export const authService = new Elysia({ name: "better-auth" })
  .mount(BetterAuth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {

        const session = await BetterAuth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });
