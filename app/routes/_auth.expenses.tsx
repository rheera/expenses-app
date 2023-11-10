import { Outlet } from "@remix-run/react";

export default function Expenses() {
  return (
    <>
      <h1>Hi I'm Expenses</h1>
      <Outlet />
    </>
  );
}
