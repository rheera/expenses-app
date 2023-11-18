import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  // const credentials = Object.fromEntries(await request.formData());

  // we should validate on the server the email and password

  if (authMode === "login") {
    // login logic
  } else {
    // sign up logic
  }
};

export default function Auth() {
  return (
    <main>
      <AuthForm />
    </main>
  );
}
