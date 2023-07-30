"use client";
import { signIn } from "next-auth/react";
import styles from "./styles.module.scss";
import Button from "@/share/components/button";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function LoginPage() {
  const handleLogin = () => {
    if (typeof window != undefined) logEvent(getAnalytics(), "login");
    signIn("google");
  };
  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <Button
          onClick={() => handleLogin()}
          text="Entrar com a Conta Google"
        />
      </div>
    </div>
  );
}
