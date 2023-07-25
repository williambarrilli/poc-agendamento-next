"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useStore } from "@/providers";
import { EnumMenu, EnumStatus } from "@/share/types/enums";
import BannerComponent from "@/share/components/banner";
import ModalComponent from "@/share/components/modal";
import Button from "@/share/components/button";
import { sendReserved } from "@/share/controllers/firestore";
import RegisterView from "./components/registerView";
import CalendarView from "./components/calendarView";
import moment, { Moment } from "moment";
import SelectHourView from "./components/selectHourView";

export default function Agendar() {
  const { store } = useStore();

  // const navigate = useNavigate();

  // useEffect(() => {
  //   logPageAnalytics("Agenda");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [typeBody, setTypeBody] = useState<EnumMenu>(EnumMenu.SELECTREGISTER);
  const [dateSelected, setDateSelected] = useState<string>("");
  const [hourSelected, setHourSelected] = useState<string>("");
  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleScreen = (screen: EnumMenu) => {
    setTypeBody(screen);
  };

  const renderBody = () => {
    const types = {
      SELECTDATE: (
        <CalendarView
          setDateSelected={(value: Moment) => {
            setDateSelected(value.format("DD/MM/YYYY"));
            handleScreen(EnumMenu.SELECTHOUR);
          }}
          url={store.url}
          dateSelected={moment(dateSelected)}
        />
      ),
      SELECTHOUR: (
        <SelectHourView
          setHourSelected={(value: string) => {
            setHourSelected(value);
            setModalConfirm(true);
          }}
          dateSelected={dateSelected}
          onBack={(value: EnumMenu) => handleScreen(value)}
        />
      ),
      SELECTREGISTER: (
        <RegisterView
          name={name}
          phone={phone}
          alterarName={(value) => setName(value)}
          alterarPhone={(value) => setPhone(value)}
          onConfirm={(value) => handleScreen(value)}
        />
      ),
      MYSERVICES: <></>,
    };
    return types[typeBody] || types[EnumMenu.SELECTREGISTER];
  };

  const onConfirm = () => {
    // logReserved("New Reserved");
    sendReserved(
      store.id as string,
      {
        name: name,
        phone: phone,
        date: dateSelected,
        hour: hourSelected,
        status: EnumStatus.PENDENT,
      },
      "solicitacion"
    );
    setDateSelected("");
    setHourSelected("");
    setName("");
    setPhone("");

    alert("Solicitação de reserva enviada");
    // navigate("/" + store.url);
  };
  return (
    <div className={styles.container}>
      <BannerComponent bannerImage={store.url} />
      {renderBody()}
      <ModalComponent
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
      >
        <div className={styles["modal-content"]}>
          <h4>Confirme seu agendamento</h4>
          <h5>
            Data: {dateSelected} as {hourSelected}
          </h5>
          <div className={styles["footer-buttons-modal"]}>
            <div className={styles["footer-button-box"]}>
              <Button
                onClick={() => setModalConfirm(false)}
                text={"Voltar"}
                styleOption="secondary"
              />
            </div>
            <div className={styles["footer-button-box"]}>
              <Button onClick={() => onConfirm()} text={"Confirmar"} />
            </div>
          </div>
        </div>
      </ModalComponent>
    </div>
  );
}
