"use client";
import { createEvent } from "@/share/controllers/googleCalendar";
/* eslint-disable no-restricted-globals */
import { updateSolicitationReserved } from "../../controllers/firestore";
import { EnumStatus, EnumStatusKeys } from "../../types/enums";
import { Reserved } from "../../types/reserved";
import { sendMessage } from "../../utils/send-message-whats-app";
import Button from "../button";
import styles from "./styles.module.scss";
import { getAnalytics, logEvent } from "firebase/analytics";
import { Shop } from "@/share/types/shop";
import { useSession } from "next-auth/react";
import moment from "moment";

interface ListComponentsProps {
  listItems?: Reserved[];
  shop: Shop;
}

export default function ListComponents({
  listItems,
  shop,
}: ListComponentsProps) {
  const session = useSession();

  const onConfirm = async (item: Reserved, index: number) => {
    if (typeof window != undefined) logEvent(getAnalytics(), "Aprove Reserved");
    item.status = EnumStatus.APROVED;
    createEvent(
      {
        title: item.name,
        start: moment(`${item.date} ${item.hour}`, "DD/MM/YYYY HH:mm").format(),
        end: moment(`${item.date} ${item.end}`, "DD/MM/YYYY HH:mm").format(),
      },
      session?.data?.accessToken as string,
      shop.calendarId
    );
    await updateSolicitationReserved(shop.id as string, item, index);
    const messageConfirm = `Olá, sua solicitação de agendamento para ${item.service} foi confirmada, te aguardo no dia ${item.date} as ${item.hour} horas.`;
    sendMessage(messageConfirm, item.phone);
  };

  const onReject = async (item: Reserved, index: number) => {
    if (typeof window != undefined)
      logEvent(getAnalytics(), "Reprove Reserved");
    item.status = EnumStatus.REPROVED;
    await updateSolicitationReserved(shop.id as string, item, index);
    const messageReject = `Olá, não estarei disponivel neste horário, podemos agendar um outro horário?`;

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
            <div className={styles.text}>{"Data: "} </div>
            {item.date}
            <div className={styles.text}>{"Hora: "} </div>
            {item.hour} as {item.end}
          </div>
          <div className={styles.row}>
            <div className={styles.text}>Nome: </div> {item.name}
            <div className={styles.text}>Atendimento: </div>
            {item?.service}
          </div>
          <div className={styles.row}>
            {item?.status === EnumStatus.PENDENT && (
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
