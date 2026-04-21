import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  color: string;
  isFetching?: boolean;
}

export function StatsCard({ title, count, icon, color }: StatsCardProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{title}</span>
          <div className={`rounded-lg p-2 ${color} text-white`}>{icon}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
        <p className="mt-1 text-sm text-muted-foreground">Job applications</p>
      </CardContent>
    </Card>
  );
}
