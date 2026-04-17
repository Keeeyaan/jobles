"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/job-card";
import { JobFormModal } from "@/components/form/job-form";
import { useUserJobs } from "@/hooks/useGetUserJobs";

const STATUS_FILTERS = [
  "all",
  "pending",
  "applied",
  "interviewed",
  "offered",
  "accepted",
  "rejected",
] as const;

export default function JobsPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("all");

  const { data, isLoading } = useUserJobs();

  const filteredJobs =
    data?.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : job.status === status;

      return matchesSearch && matchesStatus;
    }) ?? [];

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Track your applications
          </p>
        </div>

        <Button onClick={() => setFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full px-3 py-1 text-xs transition ${
              status === s
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/70"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center text-muted-foreground">
          <p className="text-sm">No jobs found</p>
          <p className="text-xs">Try adjusting your filters or add a job</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <JobFormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
}
