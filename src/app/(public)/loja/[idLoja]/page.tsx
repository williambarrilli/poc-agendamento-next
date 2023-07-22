import HomeShop from "@/screens/home-shop";
import { getShopByUrl } from "@/share/controllers/firestore";

export default async function HomeShopPage({
  params,
}: {
  params: { idLoja: string };
}) {
  const data = await getShopByUrl(params.idLoja);

  return <HomeShop data={data} />;
}
