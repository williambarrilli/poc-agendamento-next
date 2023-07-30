"use client";
/* eslint-disable no-restricted-globals */
import { updateSolicitationReserved } from "../../controllers/firestore";
import { EnumStatus, EnumStatusKeys } from "../../types/enums";
import { Reserved } from "../../types/reserved";
import { sendMessage } from "../../utils/send-message-whats-app";
import Button from "../button";
import styles from "./styles.module.scss";
import { getAnalytics, logEvent } from "firebase/analytics";

interface ListComponentsProps {
  listItems?: Reserved[];
  shopId: string;
  updateList: () => void;
}

export default function ListComponents({
  listItems,
  shopId,
  updateList,
}: ListComponentsProps) {
  const onConfirm = async (item: Reserved, index: number) => {
    if (typeof window != undefined) logEvent(getAnalytics(), "Aprove Reserved");
    item.status = EnumStatus.APROVED;
    await updateSolicitationReserved(shopId, item, index);
    const messageConfirm = `Olá, sua solicitação de agendamento foi confirmada, te aguardo no dia ${item.date} as ${item.hour} horas.`;
    updateList();
    sendMessage(messageConfirm, item.phone);
  };

  const onReject = async (item: Reserved, index: number) => {
    if (typeof window != undefined)
      logEvent(getAnalytics(), "Reprove Reserved");
    item.status = EnumStatus.REPROVED;
    await updateSolicitationReserved(shopId, item, index);
    const messageReject = `Olá, não estarei disponivel neste horário, podemos agendar um outro horário?`;
    updateList();

    sendMessage(messageReject, item.phone);
  };

  if (!listItems?.length) {
    return (
      <div className={styles.text}>
        {"Nenhuma solicitação reserva encontrada para esta data"}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {listItems.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.row}>
            <div className={styles.text}>Nome: </div> {item.name}
            <div className={styles.text}>{"| Data: "} </div>
            {item.date}
            <div className={styles.text}>{"| Hora: "} </div>
            {item.hour}
          </div>
          <div className={styles.row}>
            {item.status !== EnumStatus.PENDENT ? (
              <>{EnumStatusKeys[item.status]}</>
            ) : (
              <>
                <div className={styles.rowBotton}>
                  <Button
                    styleOption="secondary"
                    size="md"
                    text="Rejeitar"
                    onClick={() => onReject(item, index)}
                  />
                </div>
                <div className={styles.rowBotton}>
                  <Button
                    styleOption="primary"
                    size="md"
                    text="Confirmar"
                    onClick={() => onConfirm(item, index)}
                  />
                </div>
              </>
            )}
            <div className={styles.rowBotton}>
              <Button
                styleOption="secondary"
                size="md"
                text="Contato"
                onClick={() => sendMessage("Olá tudo bem?", item.phone)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
