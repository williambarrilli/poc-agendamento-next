"use client";
import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { Shop, initialShop } from "@/share/types/shop";
import Button from "@/share/components/button";
import ModalComponent from "@/share/components/modal";
import { getShopByEmail } from "@/share/controllers/firestore";
import { EnumStatus } from "@/share/types/enums";
import { Reserved } from "@/share/types/reserved";
import { sendMessage } from "@/share/utils/send-message-whats-app";
import Calendar from "../agenda/components/calendar";
import ListComponents from "../agenda/components/list";
import { useStore } from "@/providers";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
// import { useNavigate } from "react-router-dom";
// import { EnumStatus } from "types/enums";
// import { logPageAnalytics } from "utils/analitycs";
// import { sendMessage } from "utils/send-message-whats-app";

// import ReservedComponent from "../../components/addFormReserved";
// import Button from "../../components/button";
// import Calendar from "../../components/calendar";
// import ListComponents from "../../components/listComponents";
// import ModalComponent from "../../components/modal";

// import { Reserved } from "../../types/reserved";
// import { Shop, initialShop } from "../../types/shop";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getShopByEmail } from "controllers/firestore";

export default function MyArea() {
  const { data: session, status } = useSession();
  const { store, setStore } = useStore();

  const getStore = async (email: string) => {
    console.log(email);
    const data = await getShopByEmail(email);
    console.log(data);

    if (data) setStore(data);
  };

  useEffect(() => {
    console.log("passo", status, session);
    if (status === "authenticated" && session?.user?.email) {
      getStore(session?.user?.email);
    } else redirect("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStore, session, status]);
  console.log("-----", store);
  // useEffect(() => {
  //   logPageAnalytics("My Area");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [filterList, setFilterList] = useState<Reserved[]>([]);

  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalNewReserved, setIsOpenModalNewReserved] =
    useState<boolean>(false);

  useEffect(() => {
    if (store.reservedList?.length)
      setFilterList(
        store.reservedList?.filter((reserved) =>
          dateSelected?.isSame(moment(reserved.date, "DD/MM/YYYY"))
        )
      );
  }, [dateSelected, store.reservedList]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user && user.email) {
  //       const shop = await getShopByEmail(user.email);
  //       if (shop) setShop(shop);
  //     }
  //   });
  // }, [auth, navigate]);

  useEffect(() => {
    if (dateSelected) return setIsOpenModal(true);
    return setIsOpenModal(false);
  }, [dateSelected]);

  const renderTableBody = () => {
    return store.hoursShopOpen?.map((horario, index) => {
      const filterHour = filterList.find(
        (reserved: Reserved) => reserved.hour === horario
      );
      return (
        <tr key={index}>
          <td>{horario}</td>
          <td>{filterHour?.name ? filterHour.name : "livre"}</td>
          <td>
            {filterHour?.phone && (
              <div className={styles.rowBotton}>
                <Button
                  styleOption="secondary"
                  size="ssm"
                  text="Contato"
                  onClick={() =>
                    sendMessage("Olá tudo bem?", filterHour?.phone)
                  }
                />
              </div>
            )}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.text}>Minha Agenda</h1>
        <h3 className={styles.text}>Selecione o dia que deseja visualizar</h3>

        <div className={styles.content}>
          <Calendar
            onSelectDate={(value: Moment) => setDateSelected(value)}
            listReserved={store.reservedList}
            setDateSelected={setDateSelected}
            dateSelected={dateSelected}
          />
        </div>
        <section className={styles["box-button"]}>
          <div className={styles.button}>
            <Button
              styleOption="primary"
              size="md"
              onClick={() => setIsOpenModalNewReserved(true)}
              text={"Adicionar Reserva"}
            />
          </div>
          <div className={styles.button}>
            <Button
              styleOption="primary"
              size="md"
              onClick={() => console.log("/minha-area/meus-horarios")}
              text={"Meus Horarios"}
            />
          </div>
        </section>
        <h3 className={styles.text}>Solicitações de reservas</h3>
        {/* <ListComponents setHourSelected={(value)=> SelectHourView(value)} /> */}
      </div>
      <ModalComponent
        isOpen={isOpenModalNewReserved}
        onClose={() => setIsOpenModalNewReserved(false)}
      >
        {/* <ReservedComponent
          shop={shop}
          onClose={() => setIsOpenModalNewReserved(false)}
        /> */}
      </ModalComponent>
      <ModalComponent
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <>
          <h1 className={styles.text}>
            Horarios do dia: {dateSelected?.format("DD/MM/YYYY")}
          </h1>
          <table className={styles.table}>
            <thead className={styles.textTread}>
              <th>Horário</th>
              <th>Nome</th>
              <th>Contato</th>
            </thead>
            <tbody className={styles.textTable}>{renderTableBody()}</tbody>
          </table>
        </>
      </ModalComponent>
    </div>
  );
}
