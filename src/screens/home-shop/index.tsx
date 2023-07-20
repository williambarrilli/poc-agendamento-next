"use client";
import BannerComponent from "@/share/components/banner";
import styles from "./styles.module.scss";
import Loading from "@/share/components/loading";
import { Shop } from "@/share/types/shop";
import { useStore } from "@/store";
import { useEffect } from "react";

export default function HomeShop({ data }: { data: Shop | undefined }) {
  const { state, setState } = useStore();

  useEffect(() => {
    if (data) setState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data) {
    return (
      <>
        <BannerComponent bannerImage={data && data.url} />
        <h1 className={styles.text}> {data?.name} </h1>
        {/* <ButtonsView shop={data} /> */}
      </>
    );
  }
  return <Loading />;
}
