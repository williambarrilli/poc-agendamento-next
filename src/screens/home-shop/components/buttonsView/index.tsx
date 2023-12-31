"use client";

import { Shop } from "@/share/types/shop";
import instagram from "../../../../../public/icons/instagram.svg";
import styles from "./styles.module.scss";
import Button from "@/share/components/button";
import { sendMessage } from "@/share/utils/send-message-whats-app";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ButtonsView({ shop }: { shop: Shop }) {
  const router = useRouter();

  const message =
    "Olá, tenho interesse em saber mais sobre os serviços oferecidos!";

  const redirectToInstagram = () => {
    // Substitua "nome_do_perfil" pelo nome de usuário do perfil do Instagram
    const instagramURL = `https://www.instagram.com/${shop.instagram}`;
    window.open(instagramURL, "_blank");
  };

  return (
    <div className={styles["container-buttons"]}>
      <div>
        <div className={styles.divider} />
        <div className={styles["content-buttons"]}>
          <Button
            size="lg"
            text="Agendar"
            onClick={() => router.push(`/loja/${shop.url}/agendar`)}
          />
        </div>

        <div className={styles["container-buttons"]}>
          <Button
            size="lg"
            text="Contato"
            onClick={() => sendMessage(message, shop.phone)}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles["content-icons"]}>
          <Image
            className={styles["iconInstagram"]}
            onClick={redirectToInstagram}
            src={instagram}
            alt="instagram"
          />
        </div>
      </div>
    </div>
  );
}
