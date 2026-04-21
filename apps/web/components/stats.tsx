"use client";

import {
  IconAward,
  IconClock,
  IconCircleX,
  IconBriefcase,
  IconPhoneDone,
  IconCircleCheck,
} from "@tabler/icons-react";
import { StatsCard } from "./stats-card";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

type Stats = {
  total: number;
  pending: number;
  applied: number;
  interviewed: number;
  offered: number;
  accepted: number;
  rejected: number;
};

type StatsCardProp = {
  stats?: Stats;
  isLoading: boolean;
  isFetching?: boolean;
};

const statsConfig = [
  {
    key: "applied",
    label: "Applied",
    icon: <IconBriefcase />,
    color: "bg-blue-500",
  },
  {
    key: "pending",
    label: "Pending",
    icon: <IconClock />,
    color: "bg-yellow-500",
  },
  {
    key: "interviewed",
    label: "Interviewed",
    icon: <IconPhoneDone />,
    color: "bg-indigo-500",
  },
  {
    key: "offered",
    label: "Offered",
    icon: <IconAward />,
    color: "bg-pink-500",
  },
  {
    key: "accepted",
    label: "Accepted",
    icon: <IconCircleCheck />,
    color: "bg-green-500",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: <IconCircleX />,
    color: "bg-red-500",
  },
] as const;

export function Stats({ stats, isLoading, isFetching }: StatsCardProp) {
  return (
    <div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {isLoading
        ? statsConfig.map((_, i) => <StatsCardSkeleton key={i} />)
        : statsConfig.map((item) => {
            const value = stats?.[item.key] ?? 0;

            return (
              <StatsCard
                key={item.key}
                color={item.color}
                count={value}
                icon={item.icon}
                title={item.label}
                isFetching={isFetching}
              />
            );
          })}
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        <div className="h-8 w-24 bg-muted rounded animate-pulse mt-2" />
      </CardHeader>
      <CardFooter className="flex-col items-start gap-2">
        <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
