import { Elysia } from "elysia";
// libs
import "@backend/libs/mongodb";
import "@backend/libs/redis";
// schedule
import '@backend/schedule'
// queue
import { bullBoard } from "@backend/queue";
import DemoQueue from "@backend/queue/demo";

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
  /** bull-board */
  .use(bullBoard)
  /** protect */
  .guard({
    auth: true,
  })
  .use(DemoController)
  .listen(config.server?.port || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// queue test
console.log("add demo queue");
for (let i = 0; i < 10; i++) {
  DemoQueue.add(DemoQueue.name, {
    data: "demo" + (i + 1),
  });
}

export type App = typeof app;
