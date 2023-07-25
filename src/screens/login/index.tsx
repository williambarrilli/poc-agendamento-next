"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/share/components/input";
import Button from "@/share/components/button";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <>
        Signed in as {session?.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google", { callbackUrl: "/minha-area" })}>
        Sign in with Google
      </button>
    </>
  );
}
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState("");

// const handleChangeEmail = (value: string) => {
//   setEmail(value);
// };

// const handleChangePassword = (value: string) => {
//   setPassword(value);
// };

// const handleLogin = async () => {
//   // TODO refatorar para hook
//   // setLoading(true);
//   // const user = await signInWithEmailAndPassword(auth, email, password)
//   //   .then(({ user }) => user)
//   //   .catch((error) => {
//   //     console.log(error);
//   //     setError("Seu email ou senha estão incorretos!");
//   //   });
//   // if (user?.email) {
//   //   // logLoginUserAnalytics();
//   // }
//   // setLoading(false);
// };

// // useEffect(() => {
// //   onAuthStateChanged(auth, async (user) => {
// //     if (user && user.email) {
// //       // setSessionStorage("user", user);
// //       // navigate("/minha-area");
// //     }
// //   });
// // }, [auth]);
// return (
//   <div>
//     <div className={styles.container}>
//       <div className={styles.modalContent}>
//         <Input
//           type="email"
//           value={email}
//           placeholder="Digite seu email"
//           label="Email"
//           onChange={handleChangeEmail}
//           size="lg"
//         />
//         <Input
//           type="password"
//           value={password}
//           placeholder="Digite sua senha"
//           label="Senha"
//           size="lg"
//           onChange={handleChangePassword}
//         />
//         {error && <div className={styles.error}>{error}</div>}
//         <div className={styles.button}>
//           <Button
//             type="submit"
//             styleOption="primary"
//             onClick={() => handleLogin()}
//             text="Entrar"
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }
