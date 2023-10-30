import moment, { Moment } from "moment";
import { useMemo } from "react";
import calendarBuild from "../calendarBuild";
import styles from "./styles.module.scss";
import objStr from "obj-str";
import arrowRight from "../../../../../../public/icons/arrowRight.svg";
import arrowLeft from "../../../../../../public/icons/arrowLeft.svg";
import { Reserved } from "@/share/types/reserved";
import Image from "next/image";
export interface MonthCardProps {
  monthEndYearSelected: Moment;
  dateSelected: Moment | null;
  setMonthEndYearSelected: (value: Moment) => void;
  setDateSelected: (value: Moment) => void;
  onClick: (value: Moment) => void;
  jobsForDays: Reserved[];
  minDate?: Moment;
}

export default function MonthCard({
  monthEndYearSelected,
  dateSelected,
  setMonthEndYearSelected,
  setDateSelected,
  onClick,
  jobsForDays = [],
  minDate,
}: MonthCardProps) {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const getMonth = (month: number) => {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[month - 1];
  };
  const calendar: Moment[][] = useMemo(
    () =>
      calendarBuild(
        moment()
          .locale("pt")
          .month(monthEndYearSelected.month())
          .year(monthEndYearSelected.year())
      ) || [],
    [monthEndYearSelected]
  );

  const handleClick = (day: Moment) => {
    if (minDate && isCurrentDay(day)) return;
    setDateSelected(day);
    onClick(day);
  };

  const getJobsOfDay = (day: Moment) => {
    const numberJobs = jobsForDays.filter((job) =>
      day.isSame(moment(job.date, "DD/MM/YYYY"), "day")
    ).length;
    if (!numberJobs) return;
    else if (numberJobs <= 1) return "low";
    else if (numberJobs <= 3) return "medium";
    else if (numberJobs >= 4) return "high";
  };

  const isCurrentDay = (day: Moment) => {
    if (!monthEndYearSelected.isSame(day, "month")) return true;
    if (minDate && minDate > day) return true;
  };

  const isWeekend = (day: Moment) => {
    const dayOfWeek = day.weekday();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles["arrow-box"]}>
          <Image
            onClick={() =>
              setMonthEndYearSelected(
                moment(monthEndYearSelected).subtract(1, "month")
              )
            }
            className={styles["arrow-img"]}
            src={arrowLeft}
            alt="arrowLeft"
          />
          <span className={styles.tittle}>
            {getMonth(Number(monthEndYearSelected?.format("M")))}
          </span>
          <Image
            onClick={() =>
              setMonthEndYearSelected(
                moment(monthEndYearSelected).add(1, "month")
              )
            }
            className={styles["arrow-img"]}
            src={arrowRight}
            alt="arrowRight"
          />
        </div>
      </div>
      <div className={styles["week-days"]}>
        {weekDays.map((value, index) => (
          <div className={styles["week-day"]} key={index}>
            {value}
          </div>
        ))}
      </div>
      {calendar?.map((week, index) => (
        <div className={styles.week} key={index}>
          {week.map((day, index) => (
            <span
              key={index}
              className={`${objStr({
                [styles["day"]]: true,
                [styles["state"]]: true,
                [styles["is-selected"]]: dateSelected?.isSame(day),
                [styles["is-not-current-month"]]:
                  isCurrentDay(day) || day.weekday() === 0,
                [styles["is-weekend"]]: isWeekend(day),
              })}`}
              onClick={() => handleClick(day)}
            >
              <div>
                {day.format("DD").toString()}

                <div
                  className={`${objStr({
                    [styles["sublime"]]: true,
                    [styles[`${getJobsOfDay(day)}`]]: true,
                  })}`}
                />
              </div>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
