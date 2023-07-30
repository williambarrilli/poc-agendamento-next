"use client";
import Button from "@/share/components/button";
import { EnumMenu } from "@/share/types/enums";
import styles from "./styles.module.scss";
import ListBoxHours from "../listBoxHours";

interface SelectHourViewProps {
  setHourSelected: (value: string) => void;
  dateSelected: string;
  onBack: (value: EnumMenu) => void;
}

export default function SelectHourView({
  setHourSelected,
  dateSelected,
  onBack,
}: SelectHourViewProps) {
  // TODO: estilizar textos

  return (
    <div className={styles.container}>
      <div className={styles.content}>Data selecionada: {dateSelected}</div>
      <div className={styles.content}>Horarios disponiveis:</div>
      <div className={styles["list-box"]}>
        <ListBoxHours setHourSelected={(value) => setHourSelected(value)} />
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
