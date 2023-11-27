import type { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserSession(request);
  return getExpenses();
};
