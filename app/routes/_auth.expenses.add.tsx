import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  await addExpense(formData);
  return redirect("/expenses");
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
