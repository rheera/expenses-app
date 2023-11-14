export interface ChartBarInterface {
  maxValue: number;
  value: number;
  label: string;
}

export interface AddExpense {
  title: string;
  amount: string;
  date: string;
}

export interface Expense extends AddExpense {
  id: string;
}

export interface ValidationErrors {
  title?: string;
  amount?: string;
  date?: string;
}
