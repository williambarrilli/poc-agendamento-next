"use client";
import "../reset.css";
import { ErrorBoundary } from "react-error-boundary";
import GlobalError from "./global-error";
import { SessionProvider } from "next-auth/react";
import Header from "@/share/components/header";
import iconMR from "@/../public/icons/iconMR.svg";
import { firebaseConfig } from "@/init-firebase";
import { initializeApp } from "firebase/app";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  initializeApp(firebaseConfig);

  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <SessionProvider>
        <ErrorBoundary fallback={<GlobalError />}>
          <body>
            <Header logoImage={iconMR} />
            {children}
          </body>
        </ErrorBoundary>
      </SessionProvider>
    </html>
  );
}
