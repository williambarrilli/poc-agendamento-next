"use client";

// import CardComponent from "components/card";
// import { useGetShopsListHook } from "@/hook/getShopsList";
import Button from "@/share/components/button";
import Loading from "@/share/components/loading";
import { sendMessage } from "@/share/utils/send-message-whats-app";
import styles from "./styles.module.scss";
// import Error from "pages/error";
// import { sendMessage } from "utils/send-message-whats-app";
// import { logPageAnalytics } from "utils/analitycs";
import { useEffect } from "react";

export default function HomePage() {
  const { data, isLoading, error } = { data: [], isLoading: false, error: "" };
  // useEffect(() => {
  //   // logPageAnalytics("Home");
  // }, []);

  if (isLoading) return <Loading />;
  // if (error)
  //   return <Error message="Ocorreu um erro inesperado." error={error} />;
  const click = () => {
    throw new Error("Erro simulado!");
  };

  return (
    <div>
      <div className={styles.presentation}>
        <h2>
          Agendamento <span className={styles.orange}>simplificado!</span>
        </h2>
        <p className={styles.subtitle}>
          Bem-vindo a nossa página de agendamento, a solução perfeita para
          otimizar a gestão do tempo e aumentar a eficiência do seu negócio!
          Entre em contato para uma demonstração personalizada!
        </p>
        <Button
          styleOption="primary"
          size="md"
          text="Erro simulado"
          onClick={() => click()}
        />
        <Button
          styleOption="primary"
          size="md"
          text="Contato"
          onClick={() =>
            sendMessage(
              "Olá, estou entrando em contato referente ao Minhar Reserva",
              "54 981559983"
            )
          }
        />
      </div>

      <div className={styles.container}>
        {data?.map((loja, index) => (
          <div key={index}>
            {/* <CardComponent image={loja.url} title={loja.name} url={loja.url} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
