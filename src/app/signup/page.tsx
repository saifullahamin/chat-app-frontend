import { signupAction } from "../actions/authActions";
import styles from "./page.module.scss";
import { cookies } from "next/headers";
import AuthButton from "@/components/Auth/AuthButton";

const Signup: React.FC = () => {
  const signupError = cookies().get("signupError")?.value;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Sign Up</h2>
        <form action={signupAction} className={styles.signupForm}>
          <input
            type="text"
            name="displayName"
            placeholder="Full Name"
            required
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit" className={styles.signupButton}>
            Sign Up
          </button>
          {signupError && <p className={styles.errorMessage}>{signupError}</p>}

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>

          <AuthButton text="Already have an account? Login" link="/login" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
