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
    date: moment().format("DD/MM/YYYY"),
    hour: shop.hoursShopOpen[0],
    status: EnumStatus.APROVED,
    service: shop.services[0]?.name,
  });

  const handleChange = (name: string, value: string | number | boolean) => {
    setNewReserved((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const serviceList = useMemo(
    () => shop.services?.map((service) => service.name) || [],
    [shop.services]
  );

  const reservedsDay = useMemo(
    () =>
      shop.reservedList.filter(
        (reserved) => reserved.date === newReserved.date
      ),
    [newReserved.date, shop.reservedList]
  );

  const listHours = useMemo(() => {
    if (!reservedsDay.length) {
      return shop.hoursShopOpen;
    }
    const checkHour = (hour: string) => {
      return reservedsDay.filter((reserva) => {
        console.log(reserva);
        const horarioInicio = moment(reserva.start, "HH:mm");
        const horarioFim = moment(reserva.end, "HH:mm");
        const horarioVerificar = moment(hour, "HH:mm").add(1, "minutes");
        const estaLivre = horarioVerificar.isBetween(
          horarioInicio,
          horarioFim,
          null,
          "[]"
        );
        return estaLivre;
      });
    };
    return shop.hoursShopOpen?.filter((hour) => !checkHour(hour).length);
  }, [shop.hoursShopOpen, reservedsDay]);

  const submitReserved = () => {
    const shopId = shop?.id as string;
    const timeService = shop.services.find(
      (service) => service.name === newReserved.service
    )?.time;

    const reserved = {
      ...newReserved,
      start: moment(
        `${newReserved.date} ${newReserved.hour}`,
        "DD/MM/YYYY HH:mm"
      ).format(),
      end: moment(newReserved.hour, "HH:mm")
        .add(timeService, "minutes")
        .format("HH:mm"),
    };

    createEvent(
      {
        title: reserved.name,
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

  const isError = useMemo(
    () => !newReserved.name || !newReserved.phone,
    [newReserved]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.text}> Adicionar Reserva </h2>
      <div className={styles.content}>
        <div>
          <Input
            type="date"
            size="md"
            value={moment(newReserved.date, "DD/MM/YYYY").format("YYYY-MM-DD")}
            placeholder="Selecione uma data"
            label="Data:"
            onChange={(e) =>
              handleChange("date", moment(e).format("DD/MM/YYYY"))
            }
          />

          <InputSelect
            options={listHours}
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
              disabled={isError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
