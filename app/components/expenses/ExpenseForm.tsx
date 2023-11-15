import type { Expense, ValidationErrors } from "~/types/interfaces";
import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";
import type { action } from "~/routes/_auth.expenses.add";

function ExpenseForm() {
  const params = useParams();
  const matches = useMatches();
  let expenseData;
  // check if there are params, if so get the matching expense
  if (Object.keys(params).length) {
    const allExpenses = matches.find(
      (match) => match.id === "routes/_auth.expenses"
    )?.data;

    // fully type check that it is an expense array
    if (allExpenses && Array.isArray(allExpenses)) {
      expenseData = allExpenses.find(
        (expense: Expense) => expense.id === params.id
      );
    }
  }

  // we have to slice the date since we don't want time only YYYY-MM-DD
  const defaultFormValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date.slice(0, 10),
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<typeof action>() as ValidationErrors;

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultFormValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultFormValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultFormValues.date}
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
