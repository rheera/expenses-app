import type { LinksFunction } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import authStyles from "~/styles/auth.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export default function Auth() {
  return (
    <main>
      <h1>Im Auth</h1>
      <AuthForm />
    </main>
  );
}
