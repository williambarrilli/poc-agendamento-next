import Image from "next/image";
import { bannersByUrl } from "../../../../public/images/index";
import styles from "./styles.module.scss";

interface BannerComponentProps {
  bannerImage: string;
}

export default function BannerComponent({ bannerImage }: BannerComponentProps) {
  return (
    <div>
      <Image
        className={styles.banner}
        src={bannersByUrl[bannerImage] || bannersByUrl.default}
        alt="bannerImage"
      />
    </div>
  );
}
