"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Calendar } from "lucide-react"
import { expenseAPI } from "@/lib/api"

interface Stats {
  totalExpenses: number
  monthlyExpenses: number
  averageExpense: number
  expenseCount: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalExpenses: 0,
    monthlyExpenses: 0,
    averageExpense: 0,
    expenseCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await expenseAPI.getAllExpenses(1, 1000)
      const expenses = response.data.data.expenses

      const total = expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0)
      const count = expenses.length
      const average = count > 0 ? total / count : 0

      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()

      const monthlyTotal = expenses
        .filter((exp: any) => {
          const expDate = new Date(exp.date)
          return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
        })
        .reduce((sum: number, exp: any) => sum + exp.amount, 0)

      setStats({
        totalExpenses: total,
        monthlyExpenses: monthlyTotal,
        averageExpense: average,
        expenseCount: count,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="h-20 animate-pulse rounded bg-muted" />
          </Card>
        ))}
      </div>
    )
  }

  const statCards = [
    {
      title: "Total Expenses",
      value: `$${stats.totalExpenses.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      title: "This Month",
      value: `$${stats.monthlyExpenses.toFixed(2)}`,
      icon: Calendar,
    },
    {
      title: "Average Expense",
      value: `$${stats.averageExpense.toFixed(2)}`,
      icon: TrendingUp,
    },
    {
      title: "Total Count",
      value: stats.expenseCount,
      icon: TrendingDown,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className="rounded-lg bg-primary/10 p-3">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
