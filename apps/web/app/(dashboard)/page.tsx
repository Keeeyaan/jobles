"use client";

import { CheckCircle, Clock, Briefcase, Award, XCircle } from "lucide-react";

import { AnalyticsCard } from "@/components/stats-card";
import { useJobStats } from "@/hooks/useGetUserJobStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: stats, isLoading } = useJobStats();

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Track your job application progress
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <AnalyticsCard
          title="Pending"
          count={stats?.pending || 0}
          icon={<Clock className="h-5 w-5 text-white" />}
          color="bg-yellow-600/80"
        />
        <AnalyticsCard
          title="Applied"
          count={stats?.applied || 0}
          icon={<Briefcase className="h-5 w-5 text-white" />}
          color="bg-blue-600/80"
        />
        <AnalyticsCard
          title="Interviewed"
          count={stats?.interviewed || 0}
          icon={<CheckCircle className="h-5 w-5 text-white" />}
          color="bg-cyan-600/80"
        />
        <AnalyticsCard
          title="Offered"
          count={stats?.offered || 0}
          icon={<Award className="h-5 w-5 text-white" />}
          color="bg-purple-600/80"
        />
        <AnalyticsCard
          title="Accepted"
          count={stats?.accepted || 0}
          icon={<Award className="h-5 w-5 text-white" />}
          color="bg-green-600/80"
        />
        <AnalyticsCard
          title="Rejected"
          count={stats?.rejected || 0}
          icon={<XCircle className="h-5 w-5 text-white" />}
          color="bg-red-600/80"
        />
      </div>

      {/* Charts */}
      {/* {!loading && chartData.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Application Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.18 0 0)"
                  />
                  <XAxis dataKey="name" stroke="oklch(0.65 0 0)" />
                  <YAxis stroke="oklch(0.65 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.12 0 0)",
                      border: "1px solid oklch(0.18 0 0)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )} */}

      {/* Total Count */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Total Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{stats?.total || 0}</div>
          <p className="mt-2 text-muted-foreground">
            All your job applications combined
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
