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

export interface Expense {
  id: string;
  dateAdded: string;
  title: string;
  amount: number;
  date: string;
}

export interface ValidationErrors {
  title?: string;
  amount?: string;
  date?: string;
}

export interface CredentialValidationErrors {
  email?: string;
  password?: string;
}

export interface StatusError extends Error {
  status?: number;
}
