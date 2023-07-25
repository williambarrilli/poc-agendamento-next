import BannerComponent from "../banner";
import styles from "./styles.module.scss";
// import BannerComponent from "../banner";
import Link from "next/link";

export interface CardComponentProps {
  image: string;
  title: string;
  url: string;
  subtitle?: string;
}

export default function CardComponent({
  image,
  title,
  url,
}: CardComponentProps) {
  return (
    <Link href={`loja/${url}`}>
      <div className={styles.card}>
        <BannerComponent bannerImage={image} />
        <h5 className={styles.cardsTitle}>{title}</h5>
      </div>
    </Link>
  );
}
