"use client";

import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Simulating an error
    throw new Error("Simulated error!");
  }, []);

  return <div>Aqui vai o codigo da login</div>;
}
