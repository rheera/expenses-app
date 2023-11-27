import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import ErrorPage from "~/components/util/ErrorPage";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserSession(request);
  const expenses = await getExpenses();
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expenses for analysis" },
      { status: 404, statusText: "Expenses not found" }
    );
  }
  return expenses;
};

export default function ExpensesAnalysis() {
  const expenses = useLoaderData<typeof loader>();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export function ErrorBoundary() {
  return (
    <main>
      <ErrorPage title="Expenses not found">
        <section id="no-expenses">
          <p>
            Start <Link to="/expenses/add">adding some</Link> today
          </p>
        </section>
      </ErrorPage>
    </main>
  );
}
