"use client";

import { useState } from "react";
import styles from "./Signup.module.scss";
import { signupAction } from "@/app/actions/authActions";

interface SignupProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, onLoginClick }) => {
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    try {
      await signupAction(formData);
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
        <h2 className={styles.modalTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
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
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordStrength && (
            <p
              className={`${styles.passwordStrength} ${
                passwordStrength === "weak"
                  ? styles.weak
                  : passwordStrength === "medium"
                  ? styles.medium
                  : styles.strong
              }`}
            >
              Password strength: {passwordStrength}
            </p>
          )}
          <button
            type="submit"
            className={styles.signupButton}
            disabled={loading || passwordStrength === "weak"}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>
          <button
            type="button"
            className={styles.loginButton}
            onClick={onLoginClick}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

function checkPasswordStrength(password: string) {
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const mediumPassword = /^(?=.*[a-z])(?=.*\d).{6,}$/;

  if (strongPassword.test(password)) {
    return "strong";
  } else if (mediumPassword.test(password)) {
    return "medium";
  } else {
    return "weak";
  }
}
