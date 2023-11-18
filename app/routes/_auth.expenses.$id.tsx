import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

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
