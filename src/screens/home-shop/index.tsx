"use client";
import BannerComponent from "@/share/components/banner";
import styles from "./styles.module.scss";
import Loading from "@/share/components/loading";
import { Shop } from "@/share/types/shop";
import ButtonsView from "./components/buttonsView";
import { useEffect } from "react";
import { useStore } from "@/providers/storeContext";

export default function HomeShop({ data }: { data: Shop | undefined }) {
  const { setStore } = useStore();
  useEffect(() => {
    if (data) setStore(data);
  }, [data, setStore]);

  if (data) {
    return (
      <>
        <BannerComponent bannerImage={data.url} />
        <h1 className={styles.text}> {data.name} </h1>
        <ButtonsView shop={data} />
      </>
    );
  }
  return <Loading />;
}
