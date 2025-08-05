import { IQueueHandler, Queue } from "@backend/libs/queue";
import { Job } from "bullmq";

@Queue('Demo', 2)
export class Demo implements IQueueHandler {
  async execute(job: Job) {
    console.log('Demo job running...', job.data);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}