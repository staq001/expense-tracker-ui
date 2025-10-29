"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { RecentExpenses } from "@/components/recent-expenses"
import { SpendingChart } from "@/components/spending-chart"

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your expenses</p>
      </div>

      <DashboardStats />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SpendingChart />
        <RecentExpenses />
      </div>
    </div>
  )
}
