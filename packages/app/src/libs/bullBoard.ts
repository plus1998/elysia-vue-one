import { createBullBoard } from "@bull-board/api";
import { ElysiaAdapter } from "@bull-board/elysia";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { Queues } from "./queue";
import { Queues as ScheduleQueues } from "./schedule";

import { bullBoardUiBasePath } from "@backend/imports";
import { IServerAdapter } from "@bull-board/api/typings/app";

/** bull-board */
const elysiaAdapter = new ElysiaAdapter("/queue"); // TODO 生产环境使用复杂路径保护
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
  serverAdapter: elysiaAdapter as unknown as IServerAdapter, // 不知道为什么
  options: {
    uiBasePath: bullBoardUiBasePath,
  },
});
export const bullBoard = elysiaAdapter.registerPlugin();