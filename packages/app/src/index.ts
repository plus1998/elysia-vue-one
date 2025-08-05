import { Elysia } from "elysia";
// libs
import "@backend/libs/mongodb";
import "@backend/libs/redis";
// queue
import { Queues } from "@backend/libs/queue";
import "@backend/queue/demo";
// shedule
import "@backend/schedule/demo";
// bullBoard
import { bullBoard } from '@backend/libs/bullBoard';
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

setTimeout(() => {
  const queue = Queues.get('Demo')
  for(let i = 0; i < 10; i++) {
    queue?.add(queue.name, {
        id: i,
      });
  }
}, 5000);

export type App = typeof app;
