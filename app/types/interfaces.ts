export interface ChartBarInterface {
  maxValue: number;
  value: number;
  label: string;
}

export interface AddExpense {
  title: string;
  amount: number;
  date: string;
}

export interface Expense extends AddExpense {
  id: string;
}
