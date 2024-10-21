import styles from "./page.module.scss";
import { loginAction } from "../actions/authActions";
import AuthButton from "@/components/Auth/AuthButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const Login = async ({
  searchParams,
}: {
  searchParams: { error?: string };
}) => {
  const error = searchParams.error;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Login</h2>
        <form action={loginAction} className={styles.loginForm}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={styles.inputField}
          />

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          {error && (
            <p className={styles.errorMessage}>{decodeURIComponent(error)}</p>
          )}

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>
          <AuthButton text="Create a new account" link="/signup" />
        </form>
      </div>
    </div>
  );
};

export default Login;
