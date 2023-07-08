import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import BannerComponent from "../banner";

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
  subtitle = "Agende seu horario",
}: CardComponentProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div>
      <div className={styles.card} onClick={handleClick}>
        <BannerComponent bannerImage={image} />
        <h5 className={styles.cardsTitle}>{title}</h5>
        {/* <p className={styles.cardsSubtitle}>{subtitle}</p> */}
      </div>
    </div>
  );
}
