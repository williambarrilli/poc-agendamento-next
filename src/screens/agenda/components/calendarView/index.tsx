import Button from "@/share/components/button";
import styles from "./styles.module.scss";
import moment, { Moment } from "moment";
import Calendar from "../calendar";
import { EnumMenu } from "@/share/types/enums";

export interface CalendarViewProps {
  setDateSelected: (value: Moment) => void;
  onBack: (value: EnumMenu) => void;
  dateSelected: Moment;
  url: string | undefined;
}

export default function CalendarView({
  dateSelected,
  setDateSelected,
  url,
  onBack,
}: CalendarViewProps) {
  return (
    <div className={styles.container}>
      <div>
        <div>
          <h4 className={styles.text}>Selecione a data desejada:</h4>
        </div>
        <div className={styles.content}>
          <Calendar
            onSelectDate={(value) => setDateSelected(moment(value))}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            minDate={moment()}
          />
        </div>
        <div className={styles.contentButtons}>
          <Button
            styleOption="secondary"
            size="md"
            onClick={() => onBack(EnumMenu.SELECTREGISTER)}
            text={"Voltar"}
          />
        </div>
      </div>
    </div>
  );
}
