import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  IconButton,
  Button,
  Typography,
  TableHead,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type {Expense} from "../../types/expenses";

interface Props {
    expenses: Expense[];
    onEdit: (e: Expense) => void;
    onDelete: (id: number) => void;
    onDeleteAll: () => void;
}

const ExpensesList = ({ expenses, onEdit, onDelete, onDeleteAll }: Props) => {
  return (
    <Card sx={{ width: "100%", mt: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Expenses
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {expenses.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell>{exp.date}</TableCell>
                  <TableCell>{exp.category}</TableCell>
                  <TableCell>{exp.description}</TableCell>
                  <TableCell>{exp.amount}</TableCell>

                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(exp)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(exp.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {expenses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No expenses found!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Button
          variant="outlined"
          color="error"
          onClick={onDeleteAll}
          sx={{ mb: 2 }}
        >
          Delete All
        </Button>

        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
