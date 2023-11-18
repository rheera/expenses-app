import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  try {
    const validExpense = validateExpenseInput(formData);
    // probably should use zod to check this type but we're already validating with our validation function
    await addExpense(validExpense);
    return redirect("/expenses");
  } catch (error) {
    return error;
  }
};

export default function AddExpenses() {
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
