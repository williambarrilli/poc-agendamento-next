"use client";
import { signIn } from "next-auth/react";
import styles from "./styles.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      </div>
    </div>
  );
}
