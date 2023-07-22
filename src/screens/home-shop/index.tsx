import BannerComponent from "@/share/components/banner";
import styles from "./styles.module.scss";
import Loading from "@/share/components/loading";
import { Shop } from "@/share/types/shop";
import ButtonsView from "./components/buttonsView";
import { useUpdateStore } from "@/share/hook/useUpdateStore";

export default function HomeShop({ data }: { data: Shop | undefined }) {
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
