import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/expenses.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

export default function ExpensesAnalysis() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
