import Button from "@/share/components/button";
import styles from "./styles.module.scss";
import moment, { Moment } from "moment";
import Calendar from "../calendar";

export interface CalendarViewProps {
  setDateSelected: (value: Moment) => void;
  dateSelected: Moment;
  url: string | undefined;
}

export default function CalendarView({
  dateSelected,
  setDateSelected,
  url,
}: CalendarViewProps) {
  // const navigate = useNavigate();

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
            onClick={() => console.log("/" + url)}
            text={"Voltar"}
          />
        </div>
      </div>
    </div>
  );
}
