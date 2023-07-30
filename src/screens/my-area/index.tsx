"use client";
import moment, { Moment } from "moment";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { Shop } from "@/share/types/shop";
import Button from "@/share/components/button";
import ModalComponent from "@/share/components/modal";
import { EnumStatus } from "@/share/types/enums";
import { Reserved } from "@/share/types/reserved";
import { sendMessage } from "@/share/utils/send-message-whats-app";
import Calendar from "../agenda/components/calendar";
import { useRouter } from "next/navigation";
import ReservedComponent from "@/share/components/addFormReserved";
import ListComponents from "@/share/components/listComponents";
import { getShopByEmail } from "@/share/controllers/firestore";

export default function MyArea({ shop }: { shop: Shop | undefined }) {
  const router = useRouter();

  const [filterList, setFilterList] = useState<Reserved[]>([]);
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalNewReserved, setIsOpenModalNewReserved] =
    useState<boolean>(false);
  const [shopListAtt, setShoplistAtt] = useState<Reserved[]>([]);

  const updateList = async (email: string | undefined) => {
    if (email) {
      const newShop = (await getShopByEmail(email)) as unknown as Shop;
      console.log("passo", newShop);
      setShoplistAtt(newShop?.solicitationList || []);
    }
  };
  const solicitationList = useMemo(
    () => (shopListAtt.length ? shopListAtt : shop?.solicitationList),
    [shop?.solicitationList, shopListAtt]
  );
  useEffect(() => {
    if (shop?.reservedList?.length)
      setFilterList(
        shop?.reservedList?.filter((reserved) =>
          dateSelected?.isSame(moment(reserved.date, "DD/MM/YYYY"))
        )
      );
  }, [dateSelected, shop?.reservedList]);

  useEffect(() => {
    if (dateSelected) return setIsOpenModal(true);
    return setIsOpenModal(false);
  }, [dateSelected]);

  const renderTableBody = () => {
    return shop?.hoursShopOpen?.map((horario, index) => {
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
            listReserved={shop?.reservedList}
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
              onClick={() => router.push("/minha-area/meus-horarios")}
              text={"Meus Horarios"}
            />
          </div>
        </section>
        <h3 className={styles.text}>Solicitações de reservas</h3>
        <ListComponents
          shopId={shop?.id || ""}
          listItems={solicitationList?.filter(
            (reserved) => reserved.status === EnumStatus.PENDENT
          )}
          updateList={() => updateList(shop?.email)}
        />
      </div>
      <ModalComponent
        isOpen={isOpenModalNewReserved}
        onClose={() => setIsOpenModalNewReserved(false)}
      >
        <ReservedComponent
          shop={shop}
          onClose={() => setIsOpenModalNewReserved(false)}
        />
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
