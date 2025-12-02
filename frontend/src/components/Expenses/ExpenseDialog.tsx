import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Expense, CreateExpense } from "../../types/expenses";

interface Props {
  open: boolean;
  onClose: () => void;
  editingExpense: Expense | null;
  onAdd: (data: Omit<CreateExpense, "id">) => void;
  onEdit: (data: CreateExpense) => void;
}

const ExpenseDialog = ({
  open,
  onClose,
  editingExpense,
  onAdd,
  onEdit,
}: Props) => {
  const [form, setForm] = useState<Omit<CreateExpense, "id">>({
    description: "",
    amount: "",
  });

  useEffect(() => {
    if (editingExpense) {
      const { id, ...rest } = editingExpense;
      setForm(rest);
    } else {
      setForm({ description: "", amount: "" });
    }
  }, [editingExpense]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (editingExpense) {
      onEdit({ ...form, id: editingExpense.id });
    } else {
      onAdd(form);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Amount"
              name="amount"
              value={form.amount}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editingExpense ? "Save Changes" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDialog;
