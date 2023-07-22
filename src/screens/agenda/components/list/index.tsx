import { useMemo } from "react";
import styles from "./styles.module.scss";
import objStr from "obj-str";
import { useStore } from "@/store";
import { Reserved } from "@/share/types/reserved";

interface ListComponentsProps {
  setHourSelected: (value: string) => void;
  reservedList: Reserved[];
}

export default function ListComponents({
  setHourSelected,
  reservedList,
}: ListComponentsProps) {
  const { store } = useStore();
  const listHours = useMemo(() => {
    if (!reservedList.length) {
      return store?.hoursShopOpen?.map((item) => {
        return { hour: item, hasReservation: false };
      });
    }

    return store?.hoursShopOpen?.map((hour) => {
      const hasReservation = !!reservedList?.filter(
        (reserva) => reserva.hour === hour
      ).length;
      return { hour, hasReservation };
    });
  }, [reservedList, store.hoursShopOpen]);

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
