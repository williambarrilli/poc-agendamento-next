import { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import MonthCard from "./monthCard";
import arrowRight from "../../../../../public/icons/arrowRight.svg";
import arrowLeft from "../../../../../public/icons/arrowLeft.svg";
import styles from "./styles.module.scss";
import { Reserved } from "@/share/types/reserved";
import { EnumStatus } from "@/share/types/enums";
import Image from "next/image";

export interface CalendarProps {
  onSelectDate: (value: Moment) => void;
  listReserved?: Reserved[];
  minDate?: Moment;
  dateSelected: Moment | null;
  setDateSelected: (value: Moment) => void;
}

export default function Calendar({
  onSelectDate,
  listReserved = [],
  minDate,
  dateSelected,
  setDateSelected,
}: CalendarProps) {
  const [monthEndYearSelected, setMonthEndYearSelected] = useState<Moment>(
    moment()
  );

  const jobsForDays: Reserved[] = useMemo(
    () =>
      listReserved.filter(
        (reserved) =>
          monthEndYearSelected.isSame(
            moment(reserved.date, "DD/MM/YYYY"),
            "month"
          ) && reserved.status === EnumStatus.APROVED
      ) || [],
    [monthEndYearSelected, listReserved]
  );

  return (
    <div className={styles.container}>
      <div className={styles["header-page"]}>
        <section className={styles["arrow-box"]}>
          <Image
            onClick={() =>
              setMonthEndYearSelected(
                moment(monthEndYearSelected).subtract(1, "year")
              )
            }
            className={styles["arrow-img"]}
            src={arrowLeft}
            alt="arrowLeft"
          />
        </section>
        <span>{monthEndYearSelected.format("YYYY")}</span>
        <span className={styles["arrow-box"]}>
          <Image
            onClick={() =>
              setMonthEndYearSelected(
                moment(monthEndYearSelected).add(1, "year")
              )
            }
            className={styles["arrow-img"]}
            src={arrowRight}
            alt="arrowRight"
          />
        </span>
      </div>
      <div className={styles["content"]}>
        <MonthCard
          monthEndYearSelected={monthEndYearSelected}
          setMonthEndYearSelected={setMonthEndYearSelected}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          onClick={(value: Moment) => onSelectDate(value)}
          jobsForDays={jobsForDays}
          minDate={minDate}
        />
      </div>
    </div>
  );
}
