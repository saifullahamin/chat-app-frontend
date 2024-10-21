"use client";
import Link from "next/link";
import styles from "./LoginButton.module.scss";

const LoginButton = () => {
  return (
    <Link href={"/login"} className={styles.login}>
      Login
    </Link>
  );
};

export default LoginButton;
