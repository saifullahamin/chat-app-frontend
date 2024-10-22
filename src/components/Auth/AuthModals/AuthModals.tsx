"use client";
import React, { useState } from "react";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/Signup";
import styles from "./AuthModals.module.scss";
const AuthModals: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const handleLoginClick = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const handleSignupClick = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };
  return (
    <div className={styles.buttonGroup}>
      <button className={styles.signup} onClick={handleSignupClick}>
        Signup
      </button>
      <button className={styles.login} onClick={handleLoginClick}>
        Login
      </button>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <Login onClose={handleCloseModal} onSignupClick={handleSignupClick} />
      )}
      {/* Signup Modal */}
      {isSignupModalOpen && (
        <Signup onClose={handleCloseModal} onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};
export default AuthModals;
