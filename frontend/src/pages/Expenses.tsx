import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ExpensesList from "../components/Expenses/ExpensesList";
import type { ExpenseUpdate, Expense } from "../types/expenses";
import ExpenseDialog from "../components/Expenses/ExpenseDialog";
import { createExpense, getExpenses, updateExpense } from "../api/expenses";

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  //Fetch expenses from backend
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if(!token) return;

    const fetchExpenses = async () => {
      try {
        const data = await getExpenses(token);
        setExpenses(data);
      } catch(error) {
        console.error("Failed to fetch expenses: ", error)
      }
    };

    fetchExpenses();
  }, []);

  const handleAdd = async(data: Omit<ExpenseUpdate, "id">) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      await createExpense(token, data);

      const updatedList = await getExpenses(token);
      setExpenses(updatedList);

      setDialogOpen(false)
    } catch(error) {
      console.error("Failed to create expense: ", error)
    }
  };

  const handleEdit = async (updated: ExpenseUpdate) => {
    try {
      const token = localStorage.getItem("access_token");
      if(!token) return

      await updateExpense(token, updated.id, updated);

      const refreshed = await getExpenses(token);
      setExpenses(refreshed);

      setDialogOpen(false);
    } catch(error) {
      console.error("Failed to update: ", error)
    }
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
