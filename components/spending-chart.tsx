"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { expenseAPI } from "@/lib/api"

interface ChartData {
  name: string
  total: number
}

export function SpendingChart() {
  const [data, setData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const response = await expenseAPI.getAllExpenses(1, 1000)
      const expenses = response.data.data.expenses

      const categoryTotals: { [key: string]: number } = {}

      expenses.forEach((expense: any) => {
        const category = expense.category || "others"
        categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount
      })

      const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        total: total as number,
      }))

      setData(chartData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Spending by Category</h2>
      {loading ? (
        <div className="h-80 animate-pulse rounded bg-muted" />
      ) : data.length === 0 ? (
        <div className="flex h-80 items-center justify-center text-muted-foreground">No data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
