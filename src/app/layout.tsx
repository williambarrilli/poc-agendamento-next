"use client";
import "../reset.css";
import { ErrorBoundary } from "react-error-boundary";
import GlobalError from "./global-error";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <SessionProvider>
        <ErrorBoundary fallback={<GlobalError />}>
          <body>{children}</body>
        </ErrorBoundary>
      </SessionProvider>
    </html>
  );
}
