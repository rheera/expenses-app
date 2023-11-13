import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { z } from "zod";

const addExpenseSchema = z.object({
  title: z.string(),
  amount: z.string(),
  date: z.string(),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());
  try {
    const expenseData = addExpenseSchema.parse(formData);
    await addExpense(expenseData);
    return redirect("/expenses");
  } catch (error) {
    console.log(`form error ${error}`);
    return json({ error });
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
