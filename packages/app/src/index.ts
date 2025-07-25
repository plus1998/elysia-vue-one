import { Elysia } from "elysia";
import config from "./config";
// mongodb
import './libs/mongodb'
// redis
import './libs/redis'

import { cors } from "@elysiajs/cors";
import { auth } from "./modules/auth";

const app = new Elysia()
  .use(cors())
  // 因为cors对GET不起作用 应该是elysia的bug
  .onBeforeHandle(async ({ set }) => {
      set.headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
      }
  })
  .use(auth)
  .get("/hi", "Hi, Elysia")
  .listen(config.server?.port || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export type App = typeof app;
