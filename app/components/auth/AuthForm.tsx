import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react";

function AuthForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";

  const getCaptions = () => {
    if (authMode === "login") {
      return {
        submitBtnCaption: isSubmitting ? "Logging in..." : "Login",
        redirectCaption: "Create a new user",
        redirectParams: "?mode=signup",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            key="lock"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
              clipRule="evenodd"
            />
          </svg>
        ),
      };
    } else {
      return {
        submitBtnCaption: isSubmitting ? "Signing up..." : "Sign up",
        redirectCaption: "Log in with existing user",
        redirectParams: "?mode=login",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            key="user-plus"
          >
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
          </svg>
        ),
      };
    }
  };
  const captions = getCaptions();

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">{captions.icon}</div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{captions.submitBtnCaption}</button>
        <Link to={captions.redirectParams}>{captions.redirectCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
