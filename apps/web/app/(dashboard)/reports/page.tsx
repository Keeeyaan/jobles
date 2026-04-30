import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconCalendar, IconDownload } from "@tabler/icons-react";

export default function ReportsPage() {
  return (
    <>
      <Card className="ring-0 rounded-none gap-0 overflow-hidden">
        <CardHeader className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="text-2xl font-bold">
              Reports & Analytics
            </CardTitle>
            <CardDescription>
              Perfomance metrics and test runs insights.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <IconCalendar /> Last 30 Days
            </Button>
            <Button variant="outline">
              <IconDownload />
              Export
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
