"use client";
// import { logPageAnalytics } from "utils/analitycs";
import Button from "@/share/components/button";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  message: string;
  error?: string;
  url?: string;
}

const Error = ({ message, error, url }: ErrorProps) => {
  const router = useRouter();
  useEffect(() => {
    // logPageAnalytics("Error", message, { error, url });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.error}>
      <h2 className={styles.title}>Oops!</h2>
      <p className={styles.message}>{message}</p>
      <Button text="Voltar a home" onClick={() => router.push("/")} />
    </div>
  );
};

export default Error;
