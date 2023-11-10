import type { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: expensesStyles },
];

export default function Expenses() {
  return (
    <>
      <h1>Hi I'm Expenses</h1>
      <Outlet />
    </>
  );
}
