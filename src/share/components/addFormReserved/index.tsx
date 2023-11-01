import styles from "./styles.module.scss";
import Input from "../input";
import Button from "../button";
import { Reserved } from "../../types/reserved";
import { useMemo, useState } from "react";
import { EnumStatus } from "../../types/enums";
import InputSelect from "../inputSelect";
import moment from "moment";
import { Shop } from "@/share/types/shop";
import { createEvent } from "@/share/controllers/googleCalendar";
import { useSession } from "next-auth/react";
import { sendReserved } from "@/share/controllers/firestore";

interface ReservedProps {
  shop: Shop;
  onClose: () => void;
}
export default function ReservedComponent({ shop, onClose }: ReservedProps) {
  const session = useSession();

  const [newReserved, setNewReserved] = useState<Reserved>({
    name: "",
    phone: "",
    date: "",
    hour: "",
    status: EnumStatus.APROVED,
    service: "",
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setNewReserved((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitReserved = () => {
    const formatedDate = moment(newReserved.date, "YYYY/MM/DD").format(
      "DD/MM/YYYY"
    );
    const shopId = shop?.id as string;
    const reserved = {
      ...newReserved,
      date: formatedDate,
      start: moment(
        `${formatedDate} ${newReserved.hour}`,
        "DD/MM/YYYY HH:mm"
      ).format(),
      end: moment(`${formatedDate} ${newReserved.hour}`, "DD/MM/YYYY HH:mm")
        .add(1, "h")
        .format(), // MOCKADO 1 HORA
    };
    console.log("reserva", reserved);
    createEvent(
      {
        title: newReserved.name,
        start: reserved.start,
        end: reserved.end,
      },
      session.data?.accessToken as string,
      shop.calendarId
    );

    sendReserved(shopId, reserved, "reserved");
    alert("Reserva adicionada");
    onClose();
  };
  const serviceList = useMemo(
    () => shop.services?.map((service) => service.name) || [],
    [shop]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.text}> Adicionar Reserva </h2>
      <div className={styles.content}>
        <div>
          <Input
            type="date"
            size="md"
            value={newReserved.date}
            placeholder="Selecione uma data"
            label="Data:"
            onChange={(e) => handleChange("date", e)}
          />

          <InputSelect
            options={shop?.hoursShopOpen || []}
            size="md"
            value={newReserved.hour}
            placeholder="Selecione uma horario"
            label="Horário:"
            onChange={(e) => handleChange("hour", e)}
          />
          <Input
            type="text"
            size="md"
            value={newReserved.name}
            placeholder="Digite o nome"
            label="Nome:"
            onChange={(e) => handleChange("name", e)}
          />

          <Input
            type="tel"
            size="md"
            value={newReserved.phone}
            placeholder="(**)****-****"
            label="Telefone:"
            onChange={(e) => handleChange("phone", e)}
          />
          <InputSelect
            value={newReserved.service}
            placeholder="Escolha o serviço"
            label="Atendimentos disponíveis:"
            onChange={(e) => handleChange("service", e)}
            options={serviceList}
          />
          <div className={styles["box-button"]}>
            <Button
              styleOption="secondary"
              text="Voltar"
              size="md"
              onClick={() => onClose()}
            />
            <Button
              styleOption="primary"
              text="Confirmar"
              size="md"
              onClick={() => submitReserved()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
