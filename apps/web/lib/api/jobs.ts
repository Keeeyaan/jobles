import type { CreateJob, JobResponse } from "@repo/schemas";
import { apiFetch } from "../fetcher";

export async function getUserJobs() {
  const data = await apiFetch<JobResponse[]>("/jobs", { method: "GET" });
  return data.map((job) => ({
    ...job,
    applicationDate: new Date(job.applicationDate),
    createdAt: new Date(job.createdAt),
    updatedAt: new Date(job.updatedAt),
  }));
}

export async function createJob(data: CreateJob) {
  return await apiFetch<JobResponse>("/jobs", {
    method: "POST",
    body: data,
  });
}
