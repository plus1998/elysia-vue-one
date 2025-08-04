import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ElysiaAdapter } from '@bull-board/elysia';
// queues
import DemoQueue from "./demo";

/** bull-board */
const serverAdapter = new ElysiaAdapter('/queue'); // TODO 生产环境使用复杂路径保护
const queues = [DemoQueue];
createBullBoard({
  queues: queues.map(queue => new BullMQAdapter(queue)),
  serverAdapter,
  options: {
    uiBasePath: 'node_modules/@bull-board/ui',
  },
});
export const bullBoard = serverAdapter.registerPlugin();

