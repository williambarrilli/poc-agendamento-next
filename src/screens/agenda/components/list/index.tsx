import { useMemo } from "react";
import styles from "./styles.module.scss";
import objStr from "obj-str";
import { useStore } from "@/providers";

interface ListComponentsProps {
  setHourSelected: (value: string) => void;
}

export default function ListComponents({
  setHourSelected,
}: ListComponentsProps) {
  const {
    store: { reservedList, hoursShopOpen },
  } = useStore();

  const listHours = useMemo(() => {
    if (!reservedList.length) {
      return hoursShopOpen?.map((item) => {
        return { hour: item, hasReservation: false };
      });
    }

    return hoursShopOpen?.map((hour) => {
      const hasReservation = !!reservedList?.filter(
        (reserva) => reserva.hour === hour
      ).length;
      return { hour, hasReservation };
    });
  }, [reservedList, hoursShopOpen]);

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
