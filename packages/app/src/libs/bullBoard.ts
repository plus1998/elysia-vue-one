import { createBullBoard } from "@bull-board/api";
import { ElysiaAdapter } from "@bull-board/elysia";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { Queues } from "./queue";
import { Queues as ScheduleQueues } from "./schedule";

/** bull-board */
const serverAdapter = new ElysiaAdapter("/queue"); // TODO 生产环境使用复杂路径保护
const adapters: BullMQAdapter[] = [];
// register
Queues.forEach((queue) => {
  adapters.push(new BullMQAdapter(queue));
});
ScheduleQueues.forEach((queue) => {
  adapters.push(new BullMQAdapter(queue));
});
createBullBoard({
  queues: adapters,
  serverAdapter,
  options: {
    uiBasePath: "node_modules/@bull-board/ui",
  },
});
export const bullBoard = serverAdapter.registerPlugin();