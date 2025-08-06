import { Elysia } from "elysia";
// libs
import '@backend/imports'
import "@backend/libs/mongodb";
import "@backend/libs/redis";
// queue
import { Queues } from "@backend/libs/queue";
// bullBoard
import { bullBoard } from "@backend/libs/bullBoard";
// modules
import config from "@backend/config";
import cors from "@elysiajs/cors";
import { HomeController } from "@backend/modules/home";
import { DemoController } from "@backend/modules/demo";
import { authService } from "@backend/modules/auth";

const app = new Elysia()
  /** cors */
  .use(cors())
  /** better-auth */
  .use(authService)
  /** bull-board */
  .use(bullBoard)
  /** public */
  .use(HomeController)
  /** protect */
  .guard({
    auth: true,
  })
  .use(DemoController)
  .listen(config.server?.port || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

setTimeout(() => {
  const queue = Queues.get("Demo");
  for (let i = 0; i < 10; i++) {
    queue?.add(queue.name, {
      id: i,
    });
  }
}, 5000);

export type App = typeof app;
