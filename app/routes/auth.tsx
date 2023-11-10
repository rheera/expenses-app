import type { LinksFunction } from "@remix-run/node";
import authStyles from "~/styles/auth.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: authStyles },
];

export default function Auth() {
  return <h1>Hi I'm Auth</h1>;
}
