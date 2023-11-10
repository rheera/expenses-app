import logo from "~/assets/spendy-logo-purple-dark.png";

function Logo() {
  return (
    <h1 id="logo">
      <a href="/">
        <img id="img-logo" src={logo} alt="Spendy Logo" />
      </a>
    </h1>
  );
}

export default Logo;
