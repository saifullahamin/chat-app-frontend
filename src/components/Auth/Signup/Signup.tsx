'use client';

import { useState } from 'react';
import styles from './Signup.module.scss';
import { useSignup } from '@/hooks/useSignup';
import { checkPasswordStrength } from '@/utils/passwordUtils';

interface SignupProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const Signup: React.FC<SignupProps> = ({ onClose, onLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordStrengthValid, setPasswordStrengthValid] = useState(false);
  const { mutate: signup, isPending, isError, error } = useSignup();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    const { strength, valid } = checkPasswordStrength(pwd);
    setPasswordStrength(strength);
    setPasswordStrengthValid(valid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordStrengthValid) {
      return;
    }

    signup({ email, password, displayName });
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
            type='text'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Display Name'
            required
            className={styles.inputField}
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            className={styles.inputField}
          />
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Password'
            required
            className={styles.inputField}
          />
          {password && (
            <div className={styles.passwordStrength}>
              Password strength: <span>{passwordStrength}</span>
            </div>
          )}
          <button
            type='submit'
            disabled={
              isPending || !passwordStrengthValid || !displayName || !email
            }
            className={styles.signupButton}
          >
            {isPending ? 'Signing Up...' : 'Sign Up'}
          </button>
          {isError && (
            <p className={styles.errorMessage}>
              {error?.error || 'An unknown error occurred'}
            </p>
          )}

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>

          <button
            type='button'
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
