"use client"

import { ExpenseForm } from "@/components/expense-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewExpensePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/expenses">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Expenses
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Add New Expense</h1>
        <p className="text-muted-foreground">Create a new expense entry</p>
      </div>

      <ExpenseForm />
    </div>
  )
}
