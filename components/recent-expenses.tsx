"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { expenseAPI } from "@/lib/api"

interface Expense {
  _id: string
  expenseName: string
  amount: number
  category: string
  date: string
}

export function RecentExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    try {
      const response = await expenseAPI.getAllExpenses(1, 5)
      setExpenses(response.data.data.expenses)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">Recent Expenses</h2>
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded bg-muted" />)
        ) : expenses.length === 0 ? (
          <p className="text-center text-muted-foreground">No expenses yet</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense._id} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">{expense.expenseName}</p>
                <p className="text-sm text-muted-foreground">
                  {expense.category} • {formatDistanceToNow(new Date(expense.date), { addSuffix: true })}
                </p>
              </div>
              <p className="text-lg font-semibold text-foreground">${expense.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
