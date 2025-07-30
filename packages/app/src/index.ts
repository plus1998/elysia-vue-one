import { Elysia } from "elysia";
// libs
import "@backend/libs/mongodb";
import "@backend/libs/redis";
// modules
import config from "@backend/config";
import { DemoController } from "@backend/modules/demo";
import { authService } from "@backend/modules/auth";
import { corsService } from "@backend/modules/cors";

const app = new Elysia()
  /** cors */
  .use(corsService)
  /** better-auth */
  .use(authService)
  /** public */
  .get("/hi", "Hi,Elysia!")
  /** protect */
  .guard({
    auth: true,
  })
  .use(DemoController)
  .listen(config.server?.port || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export type App = typeof app;
