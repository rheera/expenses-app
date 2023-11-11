import { Link } from "@remix-run/react";
import logo from "~/assets/spendy-logo-purple-dark.png";

function Logo() {
  return (
    <h1 id="logo">
      <Link to="/">
        <img id="img-logo" src={logo} alt="Spendy Logo" />
      </Link>
    </h1>
  );
}

export default Logo;
