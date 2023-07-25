"use client";

import Button from "@/share/components/button";
import { sendMessage } from "@/share/utils/send-message-whats-app";
import styles from "./styles.module.scss";

export default function HeaderHome() {
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
          text="Contato"
          onClick={() =>
            sendMessage(
              "Olá, estou entrando em contato referente ao Minhar Reserva",
              "54 981559983"
            )
          }
        />
      </div>
    </div>
  );
}
