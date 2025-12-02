export interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: string;
}

export interface ExpenseUpdate {
  id: number;
  description: string;
  amount: string;
  category: string;
}