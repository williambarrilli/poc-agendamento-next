"use client";

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
        <h2>Something went wrong!</h2>
        <button onClick={() => reset && reset()}>Try again</button>
      </body>
    </html>
  );
}