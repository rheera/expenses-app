import type { Expense } from ".prisma/client";
import {
  redirect,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export const meta: MetaFunction = ({ matches, params }) => {
  const expenses = matches.find((match) => match.id === "routes/_auth.expenses")
    ?.data as Expense[];
  const expenseData = expenses.find((expense) => expense.id === params.id);

  return [
    { title: expenseData?.title || "Expense Data" },
    {
      name: "description",
      content: "Update your expense",
    },
  ];
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariant(params.id, "Missing expense id param");
  const expenseId = params.id;
  if (request.method === "PATCH") {
    const formData = Object.fromEntries(await request.formData());
    try {
      const validExpense = validateExpenseInput(formData);
      await updateExpense(expenseId, validExpense);
      return redirect("/expenses");
    } catch (error) {
      return error;
    }
  } else if (request.method === "DELETE") {
    try {
      await deleteExpense(expenseId);
      return { deleteId: expenseId };
    } catch (error) {
      throw error;
    }
  }
};

export default function ExpensesDetail() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("..");
  };

  return (
    <Modal onClose={handleClose}>
      <ExpenseForm />
    </Modal>
  );
}
