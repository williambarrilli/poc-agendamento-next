"use client";
import styles from "./styles.module.scss";

import CardComponent from "@/share/components/card";
import { Shop } from "@/share/types/shop";
import HeaderHome from "./components";

export default function HomePage({ data }: { data: Shop[] }) {
  return (
    <div>
      <HeaderHome />
      <div className={styles.container}>
        {data?.map((loja, index) => (
          <div key={index}>
            <CardComponent
              image={loja?.url}
              title={loja?.name}
              url={loja?.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
