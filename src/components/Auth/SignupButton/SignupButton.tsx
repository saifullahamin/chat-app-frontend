"use client";
import Link from "next/link";
import styles from "./SignupButton.module.scss";

const SignupButton = () => {
  return (
    <Link href={"/signup"} className={styles.signup}>
      Signup
    </Link>
  );
};

export default SignupButton;
