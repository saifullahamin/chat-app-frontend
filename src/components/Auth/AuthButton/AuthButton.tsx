"use client";

import Link from "next/link";
import styles from "./AuthButton.module.scss";
import React from "react";

const AuthButton: React.FC<{ text: string; link: string }> = ({
  text,
  link,
}) => {
  return (
    <Link href={link} className={styles.authButton}>
      {text}
    </Link>
  );
};

export default AuthButton;
