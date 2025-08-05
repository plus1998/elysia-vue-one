import { IScheduleHandler, Schedule } from "@backend/libs/schedule";
import { Job } from "bullmq";

@Schedule('Demo', '*/5 * * * * *')
export class Demo implements IScheduleHandler {
  async execute(job: Job) {
    console.log('Demo schedule job running...', new Date());
  }
}