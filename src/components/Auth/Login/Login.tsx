"use client";

import { useState } from "react";
import styles from "./Login.module.scss";
import { loginAction } from "@/app/actions/authActions";

interface LoginProps {
  onClose: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSignupClick }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      await loginAction(formData);
    } catch (error) {
      setError((error as Error).message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
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

          <button
            type="submit"
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>
          <button
            type="button"
            className={styles.createAccountButton}
            onClick={onSignupClick}
          >
            Create a new account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
