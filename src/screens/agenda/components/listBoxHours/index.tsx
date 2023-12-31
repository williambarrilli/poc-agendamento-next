import { useMemo } from "react";
import styles from "./styles.module.scss";
import objStr from "obj-str";
import { useStore } from "@/providers";
import moment from "moment";
import { Reserved } from "@/share/types/reserved";

interface ListBoxHoursProps {
  setHourSelected: (value: string) => void;
  dateSelected: string;
}

export default function ListBoxHours({
  setHourSelected,
  dateSelected,
}: ListBoxHoursProps) {
  const {
    store: { reservedList, hoursShopOpen },
  } = useStore();

  const reservedsDay = useMemo(
    () =>
      reservedList.filter(
        (reserved) =>
          moment(reserved.date).format("DD/MM/YYYY") ===
          moment(dateSelected).format("DD/MM/YYYY")
      ),
    [dateSelected, reservedList]
  );
  const listHours = useMemo(() => {
    const checkHour = (hour: string) => {
      return reservedsDay.filter((reserva) => {
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

    if (!reservedList.length) {
      return hoursShopOpen?.map((item) => {
        return { hour: item, hasReservation: false };
      });
    }

    return hoursShopOpen?.map((hour) => {
      const hasReservation = !!checkHour(hour).length;
      return { hour, hasReservation };
    });
  }, [reservedList.length, hoursShopOpen, reservedsDay]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {listHours?.map((horario, index) => (
          <button
            className={`${objStr({
              [styles["itemHour"]]: true,
              [styles["itemHour-reserved"]]: !!horario.hasReservation,
            })}`}
            disabled={horario.hasReservation}
            key={index}
            onClick={() => setHourSelected(horario.hour)}
          >
            {horario.hour}
          </button>
        ))}
      </div>
    </div>
  );
}
