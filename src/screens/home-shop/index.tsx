import BannerComponent from "@/share/components/banner";
import styles from "./styles.module.scss";
import Loading from "@/share/components/loading";
import { Shop } from "@/share/types/shop";

export default function HomeShop({ data }: { data: Shop | undefined }) {
  if (data)
    return (
      <>
        <BannerComponent bannerImage={data && data.url} />
        <h1 className={styles.text}> {data?.name} </h1>
        {/* <ButtonsView shop={data} /> */}
      </>
    );
  return <Loading />;
}
