'use client';

import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import styles from './Login.module.scss';

interface LoginProps {
  onClose: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
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
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email Address'
            required
            className={styles.inputField}
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            className={styles.inputField}
          />

          <button
            type='submit'
            disabled={isPending || !email || !password}
            className={styles.loginButton}
          >
            {isPending ? 'Logging In...' : 'Login'}
          </button>

          <div className={styles.orSeparator}>
            <hr /> <span>or</span> <hr />
          </div>

          <button
            type='button'
            className={styles.createAccountButton}
            onClick={onSignupClick}
          >
            Create a new account
          </button>

          {isError && (
            <p className={styles.errorMessage}>
              {error?.error || 'An unknown error occurred'}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
