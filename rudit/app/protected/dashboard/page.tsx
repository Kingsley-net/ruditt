"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const supabase = createClient();

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data: students } = await supabase.from("students").select("id", { count: "exact" });
    const { data: teachers } = await supabase.from("teachers").select("id", { count: "exact" });
    const { data: parents } = await supabase.from("parents").select("id", { count: "exact" });
    const { data: payments } = await supabase.from("payments").select("amount");
    const { data: logs } = await supabase
      .from("activity_logs")
      .select("action, actor, created_at")
      .order("created_at", { ascending: false })
      .limit(5);

    const totalEarnings = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;

    setStats({
      students: students?.length || 0,
      teachers: teachers?.length || 0,
      parents: parents?.length || 0,
      earnings: totalEarnings,
    });

    setActivities(logs || []);
  }

  if (!stats) return <div className="p-10">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Here’s what’s new today</p>
        </div>
        <Link href="/website-builder">
          <Button>Build Website</Button>
        </Link>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={stats.students} />
        <StatCard title="Total Teachers" value={stats.teachers} />
        <StatCard title="Total Parents" value={stats.parents} />
        <StatCard title="Total Earnings" value={`₦${stats.earnings.toLocaleString()}`} />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVITIES */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{a.action} by {a.actor}</span>
                <span className="text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* DONUT */}
        <Card>
          <CardHeader>
            <CardTitle>Students Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[
                  { name: "JSS", value: 4200 },
                  { name: "SSS", value: 3300 },
                  { name: "Primary", value: 5200 }
                ]} dataKey="value" innerRadius={60} outerRadius={90}>
                  <Cell fill="#4f46e5" />
                  <Cell fill="#16a34a" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* EARNINGS CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Total Earnings</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { month: "Jan", income: 120000 },
              { month: "Feb", income: 90000 },
              { month: "Mar", income: 150000 },
              { month: "Apr", income: 110000 }
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
