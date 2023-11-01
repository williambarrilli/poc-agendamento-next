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
import { useSession } from "next-auth/react";
import { getShopByEmail } from "@/share/controllers/firestore";

export default function MyArea({ shop }: { shop: Shop }) {
  const router = useRouter();
  const session = useSession();
  const [filterList, setFilterList] = useState<Reserved[]>([]);
  const [dateSelected, setDateSelected] = useState<Moment | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalNewReserved, setIsOpenModalNewReserved] =
    useState<boolean>(false);
  const [shopUpdate, setShopUpdate] = useState<Shop>(shop);

  useEffect(() => {
    if (shopUpdate.reservedList?.length)
      setFilterList(
        shopUpdate.reservedList.filter((reserved) =>
          dateSelected?.isSame(moment(reserved.date, "DD/MM/YYYY"))
        )
      );
  }, [dateSelected, shopUpdate.reservedList]);

  useEffect(() => {
    if (dateSelected) return setIsOpenModal(true);
    return setIsOpenModal(false);
  }, [dateSelected]);

  // ======================

  const handleUpdateShop = async () => {
    const attShop: any = await getShopByEmail(shop?.email || "");
    if (attShop) setShopUpdate(attShop);
  };

  const renderTableBody = () => {
    return shop?.hoursShopOpen?.map((horario, index) => {
      const filterHour = filterList.find((reserved: Reserved) => {
        const horarioInicio = moment(reserved.start, "HH:mm");
        const horarioFim = moment(reserved.end, "HH:mm");
        const horarioVerificar = moment(horario, "HH:mm").add(1, "minutes");
        const estaLivre = horarioVerificar.isBetween(
          horarioInicio,
          horarioFim,
          null,
          "[]"
        );
        return estaLivre;
      });

      return (
        <tr key={horario}>
          <td>{horario}</td>
          <td>{filterHour?.name ? filterHour.name : "livre"}</td>
          <td>
            {filterHour?.phone && (
              <div key={index}>
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
          <td>{filterHour?.service}</td>
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
            listReserved={shopUpdate.reservedList}
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
          shop={shop as Shop}
          listItems={shopUpdate.solicitationList?.filter(
            (reserved) => reserved.status === EnumStatus.PENDENT
          )}
          handleUpdateShop={handleUpdateShop}
        />
      </div>
      <ModalComponent
        isOpen={isOpenModalNewReserved}
        onClose={() => setIsOpenModalNewReserved(false)}
      >
        <ReservedComponent
          shop={shop as Shop}
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
              <tr>
                <th>Horário</th>
                <th>Nome</th>
                <th>Contato</th>
                <th>Atendimento</th>
              </tr>
            </thead>
            <tbody className={styles.textTable}>{renderTableBody()}</tbody>
          </table>
        </>
      </ModalComponent>
    </div>
  );
}
