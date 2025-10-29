"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { expenseAPI } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Expense {
  _id: string
  expenseName: string
  amount: number
  category: string
  date: string
}

const categories = ["all", "income", "housing", "groceries", "shopping", "entertainment", "others"]

export function ExpensesList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchExpenses()
  }, [currentPage])

  useEffect(() => {
    filterExpenses()
  }, [searchTerm, selectedCategory, expenses])

  const fetchExpenses = async () => {
    setLoading(true)
    try {
      const response = await expenseAPI.getAllExpenses(currentPage, 10)
      setExpenses(response.data.data.expenses)
      setTotalPages(response.data.data.totalPages)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterExpenses = () => {
    let filtered = [...expenses]

    if (selectedCategory !== "all") {
      filtered = filtered.filter((expense) => expense.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.expenseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredExpenses(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return

    try {
      await expenseAPI.deleteExpense(id)
      fetchExpenses()
    } catch (error) {
      console.error("Error deleting expense:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="h-24 animate-pulse p-6" />
          ))}
        </div>
      ) : filteredExpenses.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No expenses found</p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <Card key={expense._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{expense.expenseName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {expense.category} • {format(new Date(expense.date), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-foreground">${expense.amount.toFixed(2)}</p>
                    <div className="flex gap-2">
                      <Link href={`/expenses/edit/${expense._id}`}>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(expense._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
