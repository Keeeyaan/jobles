import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { JobResponse } from '@repo/schemas';

import { DRIZZLE } from '../database/database.module';
import { jobs } from '../database/schemas';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import type { DrizzleDB } from '../database/types/drizzle';

type JobRow = typeof jobs.$inferSelect;

@Injectable()
export class JobsService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  private toResponse(job: JobRow): JobResponse {
    return {
      ...job,
      description: job.description ?? undefined,
      location: job.location ?? undefined,
      note: job.note ?? undefined,
      applicationDate: job.applicationDate.toISOString(),
      createdAt: job.createdAt.toISOString(),
      updatedAt: job.updatedAt.toISOString(),
    };
  }

  async createJob({ job, userId }: { job: CreateJobDto; userId: string }) {
    const payload = {
      ...job,
      createdBy: userId,
      applicationDate: new Date(job.applicationDate),
    };
    const result = await this.db.insert(jobs).values(payload).returning();
    console.log(result);
    const newJob = result[0];
    if (!newJob) {
      throw new NotFoundException(`Job with ID ${newJob} not found`);
    }
    return this.toResponse(newJob);
  }

  async getUserJobs(userId: string) {
    const allJobs = await this.db
      .select()
      .from(jobs)
      .where(eq(jobs.createdBy, userId));
    return allJobs.map((job) => this.toResponse(job));
  }

  async getUserJobStats(userId: string) {
    const result = await this.db
      .select({
        status: jobs.status,
        count: sql<number>`count(*)`,
      })
      .from(jobs)
      .where(eq(jobs.createdBy, userId))
      .groupBy(jobs.status);

    const stats = {
      total: 0,
      pending: 0,
      applied: 0,
      interviewed: 0,
      offered: 0,
      accepted: 0,
      rejected: 0,
    };

    for (const row of result) {
      stats[row.status] = Number(row.count);
      stats.total += Number(row.count);
    }

    return stats;
  }

  async getJobById(id: number) {
    const result = await this.db.select().from(jobs).where(eq(jobs.id, id));
    const job = result[0];
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return this.toResponse(job);
  }

  // async updateJobById(id: number, updatedJob: UpdateJobDto) {
  //   await this.db.update(jobs).set(updatedJob).where(eq(jobs.id, id));
  //   return { message: `Job ${id} updated` };
  // }

  // deleteJobById(id: number) {
  //   return `This action removes a #${id} job`;
  // }
}
