import Button from "@/share/components/button";
import { EnumMenu } from "@/share/types/enums";
import { Reserved } from "@/share/types/reserved";
import styles from "./styles.module.scss";
import ListComponents from "../list";

interface SelectHourViewProps {
  setHourSelected: (value: string) => void;
  dateSelected: string;
  onBack: (value: EnumMenu) => void;
  listReserveDate: Reserved[];
}

export default function SelectHourView({
  setHourSelected,
  dateSelected,
  onBack,
  listReserveDate,
}: SelectHourViewProps) {
  // TODO: estilizar textos
  return (
    <div className={styles.container}>
      <div className={styles.content}>Data selecionada: {dateSelected}</div>
      <div className={styles.content}>Horarios disponiveis:</div>
      <div className={styles["list-box"]}>
        <ListComponents
          reservedList={listReserveDate}
          setHourSelected={(value) => setHourSelected(value)}
        />
      </div>
      <div className={styles.content}>Selecione seu horário </div>

      <Button
        size="md"
        styleOption="secondary"
        onClick={() => onBack(EnumMenu.SELECTDATE)}
        text={"Voltar"}
      />
    </div>
  );
}
