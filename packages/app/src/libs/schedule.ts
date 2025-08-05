import IORedis from "ioredis";
import config from "@backend/config";
import { Queue as BullMQ, Worker, Job } from "bullmq";

export const Queues = new Map<string, BullMQ>();

// 处理器接口
export interface IScheduleHandler {
  /**
   * 执行任务的核心方法
   * @param job BullMQ 的 Job 实例，包含任务数据和方法
   * @returns Promise<any> 返回处理结果
   */
  execute(job?: Job): Promise<any>;
}

export function Schedule(name: string, pattern: string) {
  return function <T extends new (...args: any[]) => IScheduleHandler>(
    constructor: T
  ) {
    console.log("Register Schedule", name);
    if (!config.bull) {
      throw new Error("BullMQ config not found");
    }
    const scheduleName = 'schedule.' + name.toLocaleLowerCase()
    // 创建实例
    const instance = new constructor();
    // TODO 因为BULLMQ仅支持IORedis，如果后续支持Bun的redis客户端需要迁移
    const connection = new IORedis(config.bull?.redis);
    const queue = new BullMQ(scheduleName, {
      connection,
    });
    Queues.set(scheduleName, queue);
    // 设计是一个Queue对应一个Worker
    new Worker(
      scheduleName,
      instance.execute,
      {
        connection,
        removeOnComplete: {
            count: 1,
        }
      }
    );
    // 定时器
    queue.upsertJobScheduler(scheduleName, {
      pattern,
    });

    return constructor;
  };
}
