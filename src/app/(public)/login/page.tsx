import LoginPage from "@/screens/login";
import { getSession } from "next-auth/react";

export const metadata = {
  title: "Login",
  description: "Aplicação de reservas em fase de testes",
};

export default async function Login(props: any) {
  console.log(props);
  console.log("client");
  return <LoginPage />;
}

export async function getStaticProps() {
  const session = await getSession();
  return {
    props: { session },
  };
}
