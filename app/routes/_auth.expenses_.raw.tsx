import { getExpenses } from "~/data/expenses.server";

export const loader = () => {
  return getExpenses();
};
