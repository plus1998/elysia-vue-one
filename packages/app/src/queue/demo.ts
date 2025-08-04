import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import config from "@backend/config";

const name = 'Demo'
const TAG = `[Queue][${name}]`;

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

// 消费者 可以创建多个worker 运行在不同的进程上 增加处理cpu密集任务的处理能力
new Worker(
  name,
  async (job) => {
    console.log("Demo job processed", job.data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  {
    connection,
    concurrency: 5, // 并发数
    removeOnComplete: { age: 1000 * 60 * 60 * 24 }, // 保留24小时的完成任务
  }
);

const queue = new Queue(name, { connection });

export default queue;
