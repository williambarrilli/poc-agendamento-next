"use client";
import Button from "@/share/components/button";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAnalytics, logEvent } from "firebase/analytics";

interface ErrorProps {
  message: string;
  error?: string;
  url?: string;
}

const Error = ({ message, error, url }: ErrorProps) => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window != undefined)
      logEvent(getAnalytics(), "page_view", {
        name: "Error",
        message,
        options: { error, url },
      });
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
