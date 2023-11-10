import { NavLink } from "@remix-run/react";

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <ul>
        <li className="nav-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/auth">Auth</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/expenses">Expenses</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNavigation;
