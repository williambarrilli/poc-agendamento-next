"use client";
import styles from "./styles.module.scss";

import CardComponent from "@/share/components/card";
import { Shop } from "@/share/types/shop";
import HeaderHome from "./components";
import { useRouter } from "next/navigation";

export default function HomePage({ data }: { data: Shop[] }) {
  const router = useRouter();

  return (
    <div>
      <HeaderHome />
      <button type="button" onClick={() => router.push("/login")}>
        Dashboard
      </button>
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
