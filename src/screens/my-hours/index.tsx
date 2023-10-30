"use client";
import Button from "@/share/components/button";
import InputSelect from "@/share/components/inputSelect";
import { updateHourShop } from "@/share/controllers/firestore";
import { hours, minutes } from "@/share/utils/constants";
import moment from "moment";
import { useEffect, useState } from "react";
import { Shop } from "@/share/types/shop";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { logEvent, getAnalytics } from "firebase/analytics";

export default function MyHours({ shop }: { shop: Shop | undefined }) {
  const router = useRouter();
  const [myHours, setMyHours] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<string>("07");
  const [selectedMinute, setSelectedMinute] = useState<string>("00");

  useEffect(() => {
    if (typeof window != undefined)
      logEvent(getAnalytics(), "page_view", {
        name: "My Hours",
        shop: shop?.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewHour = () => {
    const newHour = `${selectedHour}:${selectedMinute}`;

    if (myHours.includes(newHour)) {
      return alert("Este horário já foi adicionado");
    }
    const updatedList = [...myHours, newHour];
    updatedList.sort(compareHours);

    setMyHours(updatedList);
  };

  const compareHours = (timeA: string, timeB: string) => {
    const momentA = moment(timeA, "H:mm");
    const momentB = moment(timeB, "H:mm");
    return momentA.diff(momentB);
  };

  const handleRemoveItem = (index: number) => {
    const updatedList = [...myHours];
    updatedList.splice(index, 1);
    setMyHours(updatedList);
  };

  const handleSubmit = () => {
    const shopId = shop?.id as string;
    updateHourShop(shopId, myHours);
    router.push("/minha-area");
  };

  useEffect(() => {
    if (shop?.hoursShopOpen?.length) setMyHours(shop.hoursShopOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.text}>Meus Horarios</h1>
        <section className={styles.section}>
          <InputSelect
            value={selectedHour}
            placeholder="horas"
            options={hours}
            onChange={setSelectedHour}
            size="sm"
          />
          <article>h</article>
          <InputSelect
            value={selectedMinute}
            placeholder="horas"
            options={minutes}
            onChange={setSelectedMinute}
            size="sm"
          />
          <article>min</article>
          <div>
            <Button
              styleOption="primary"
              size="sm"
              onClick={() => handleAddNewHour()}
              text={"Adicionar"}
            />
          </div>
        </section>

        <h3 className={styles.paragraph}>Horários que deseja atender:</h3>
        <div className={styles.pill}>
          {myHours.map((hour, index) => (
            <div key={index}>
              <div className={styles.button}>
                <Button
                  styleOption="primary"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                  text={hour + "  X"}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <div className={styles.button}>
            <Button
              styleOption="secondary"
              size="md"
              onClick={() => router.push("/minha-area")}
              text={"Cancelar"}
            />
          </div>
          <div className={styles.button}>
            <Button
              styleOption="primary"
              size="md"
              onClick={() => handleSubmit()}
              text={"Salvar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
