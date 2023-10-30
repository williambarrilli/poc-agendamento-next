"use client";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import Button from "../button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

interface HeaderProps {
  logoImage: any;
}

const Header = ({ logoImage }: HeaderProps) => {
  const router = useRouter();
  const session = useSession();
  return (
    <header className={styles.header}>
      <div>
        <Image
          className={styles.logo}
          src={logoImage}
          alt="Logo"
          onClick={() => router.push("/")}
        />
      </div>
      {session.data?.accessToken && (
        <div className={styles.button}>
          <Button
            styleOption="secondary"
            onClick={() => signOut()}
            text="Sair"
          />
        </div>
      )}

      <div className={styles.button}>
        <Button
          styleOption="primary"
          onClick={() => router.push("/login")}
          text="Minha Area"
        />
      </div>
    </header>
  );
};

export default Header;
