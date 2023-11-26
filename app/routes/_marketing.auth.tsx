import {
  redirect,
  type ActionFunctionArgs,
  type LinksFunction,
} from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { signup } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import authStyles from "~/styles/auth.css";
import { StatusError } from "~/types/interfaces";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const credentials = Object.fromEntries(await request.formData());
  try {
    const validatedCredentials = validateCredentials(credentials);
    if (authMode === "login") {
      // login logic
    } else {
      await signup(validatedCredentials);
      return redirect("/expenses");
    }
  } catch (error) {
    if (error instanceof Error) {
      if ((error as StatusError).status === 422) {
        return { credentials: error.message };
      }
    }
    return error;
  }
};

export default function Auth() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}
