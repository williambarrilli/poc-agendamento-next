"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import styles from "./styles.module.scss";

export default function LoginPage() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.modalContent}>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
}
