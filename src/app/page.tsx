import HomePage from "@/screens/home";
import { getShopsList } from "@/share/controllers/firestore";

export default async function Page() {
  const { data } = await getShopsList();
  return <HomePage data={data} />;
}
