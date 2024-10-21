import styles from "./page.module.scss";
import { loginAction } from "../actions/authActions";
import { cookies } from "next/headers";
import AuthButton from "@/components/Auth/AuthButton";

const Login: React.FC = () => {
  const loginError = cookies().get("loginError")?.value;
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
          {loginError && <p className={styles.errorMessage}>{loginError}</p>}

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
