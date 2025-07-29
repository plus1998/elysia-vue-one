import { Elysia } from "elysia";
// mongodb
import './libs/mongodb'
// redis
import './libs/redis'

import { cors } from "@elysiajs/cors";
import BetterAuth from "./libs/betterAuth";

// modules
import config from "./config";
import { demo } from "./modules/demo";

const app = new Elysia()
  .get('/hi', 'Hi, Elysia!')
  .use(cors({}))
  // better-auth
  .mount(BetterAuth.handler)
  // modules
  .use(demo)
  .listen(config.server?.port || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
export type App = typeof app;
