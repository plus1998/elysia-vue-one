import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import config from "@backend/config";

/** config */
const NAME = 'Schedule.Demo'
const CRON = '*/5 * * * * *';

const TAG = `[Schedule][${NAME}]`;

if (!config.bull) {
  throw new Error("BullMQ config not found");
}
// TODO 因为BULLMQ仅支持IORedis，如果后续支持Bun的redis客户端需要迁移
const connection = new IORedis(config.bull?.redis);

connection.on('error', (error) => {
    console.error(TAG, 'Redis error:', error);
})

connection.on('ready', () => {
    console.log(TAG, 'Redis connected');
})

// 消费者
new Worker(
  NAME,
  async (job) => {
    console.log("Demo schedule job processed", new Date().toISOString(), job.data);
    // 计算事件推送下一个任务
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  {
    connection,
    concurrency: 1, // 并发数
    removeOnComplete: { age: 1000 * 60 * 60 * 24 }, // 保留24小时的完成任务
  }
);

const queue = new Queue(NAME, { connection });

await queue.upsertJobScheduler(
  queue.name,
  { pattern: CRON },
);

export default queue;