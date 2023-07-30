"use client";
import Error from "@/screens/error";

export default function GlobalError({
  error,
  reset,
}: {
  error?: any;
  reset?: () => void;
}) {
  console.error(error);
  return (
    <html>
      <body>
        <Error message="Algo inesperado aconteceu!" />
      </body>
    </html>
  );
}
