import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

export function AnalyticsCard({
  title,
  count,
  icon,
  color,
}: AnalyticsCardProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{title}</span>
          <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{count}</div>
        <p className="mt-1 text-sm text-muted-foreground">Job applications</p>
      </CardContent>
    </Card>
  );
}
