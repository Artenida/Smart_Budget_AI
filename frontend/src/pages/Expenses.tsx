import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ExpensesList from "../components/Expenses/ExpensesList";
import type { Expense } from "../types/expenses";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      date: "2025-11-19",
      category: "Food",
      description: "Lunch",
      amount: "$12",
    },
    {
      id: 2,
      date: "2025-11-18",
      category: "Transport",
      description: "Taxi",
      amount: "$20",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAdd = (data: Omit<Expense, "id">) => {
    console.log("Add expense!");
  };

  const handleEdit = (updated: Expense) => {
    console.log("Edit expense!");
  };

  const handleDelete = (id: number) => {
    console.log("Delete single expense!");
  };

  const handleDeleteAll = () => {
    console.log("Delete all expenses!");
  };

  const openAddDialog = () => {
    setEditingExpense(null);
    setDialogOpen(true);
  };

  const openEditDialog = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  return (
    <div style={{ padding: "32px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Expenses List
        </Typography>
        <Button variant="contained">Add Expense</Button>
      </Grid>

      <ExpensesList
        expenses={expenses}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
}
