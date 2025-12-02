import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ExpensesList from "../components/Expenses/ExpensesList";
import type { CreateExpense, Expense } from "../types/expenses";
import ExpenseDialog from "../components/Expenses/ExpenseDialog";

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

  const handleAdd = (data: Omit<CreateExpense, "id">) => {
    console.log("Add expense!");
    console.log(data);
  };

  const handleEdit = (updated: CreateExpense) => {
    console.log("Edit expense!");
    console.log(updated);
  };

  const handleDelete = (id: number) => {
    console.log("Delete single expense!");
    console.log(id);
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
    console.log(expense);
    setDialogOpen(true);
  };

  return (
    <div style={{ padding: "32px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Expenses List
        </Typography>

        <Button variant="contained" onClick={openAddDialog}>
          Add Expense
        </Button>
      </Grid>

      <ExpensesList
        expenses={expenses}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        onDeleteAll={handleDeleteAll}
      />

      <ExpenseDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editingExpense={editingExpense}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </div>
  );
}
