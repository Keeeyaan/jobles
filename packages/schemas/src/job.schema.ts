import { z } from "zod";

export const JobStatus = z.enum([
  "pending",
  "applied",
  "interviewed",
  "offered",
  "accepted",
  "rejected",
]);

export type JobStatus = z.infer<typeof JobStatus>;

export const JobType = z.enum([
  "full-time",
  "part-time",
  "contract",
  "internship",
]);

export type JobType = z.infer<typeof JobType>;

export const JobSchema = z
  .object({
    id: z.number().min(1, "ID is required"),
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    description: z.string().optional(),
    status: JobStatus,
    type: JobType,
    location: z.string().optional(),
    note: z.string().optional(),
    applicationDate: z.date(),
    createdBy: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .meta({ id: "Job", createdBy: "User" });

export type Job = z.infer<typeof JobSchema>;

export const CreateJobSchema = JobSchema.extend({
  applicationDate: z.string(),
})
  .omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true,
  })
  .meta({ id: "CreateJob", createdBy: "CreateUser" });

export type CreateJob = z.infer<typeof CreateJobSchema>;

export const UpdateJobSchema = CreateJobSchema.partial().meta({
  id: "UpdateJob",
});

export type UpdateJob = z.infer<typeof UpdateJobSchema>;

export const JobResponseSchema = JobSchema.extend({
  id: z.number(),
  company: z.string(),
  position: z.string(),
  description: z.string().optional(),
  status: JobStatus,
  type: JobType,
  location: z.string().optional(),
  note: z.string().optional(),
  applicationDate: z.iso.datetime(),
  createdBy: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
}).meta({
  id: "JobResponse",
});

export type JobResponse = z.infer<typeof JobResponseSchema>;
