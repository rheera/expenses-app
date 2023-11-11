import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";

export const loader = ({ params }: LoaderFunctionArgs) => {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  throw json(
    { message: "That page does not exist" },
    {
      status: 404,
      statusText: "Not Found",
    }
  );
};
