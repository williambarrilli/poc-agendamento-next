"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error?: any;
  reset?: () => void;
}) {
  //   console.info("error", error);
  return (
    <div>
      <h2>Something went wrong!</h2>
      {/* <button onClick={() => reset()}>Try again</button> */}
    </div>
  );
}
