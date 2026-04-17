import { Edit2, Trash2, MapPin, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Job } from "@repo/schemas";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  applied: "bg-blue-500/10 text-blue-500",
  interviewed: "bg-purple-500/10 text-purple-500",
  offered: "bg-green-500/10 text-green-500",
  accepted: "bg-indigo-500/10 text-indigo-500",
  rejected: "bg-red-500/10 text-red-500",
};

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">{job.company}</h3>
            <p className="text-sm text-muted-foreground">{job.position}</p>
          </div>

          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              statusStyles[job.status],
            )}
          >
            {job.status}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{job.location || "Remote / Not specified"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              Applied {new Date(job.applicationDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {job.description || "No description provided"}
        </p>

        {/* Actions */}
        <div className="mt-2 flex gap-2 opacity-0 transition group-hover:opacity-100">
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <Edit2 className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
