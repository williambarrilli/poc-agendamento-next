import MyHours from "@/screens/my-hours";
import { getShopByEmail } from "@/share/controllers/firestore";
import { Shop } from "@/share/types/shop";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../../../../pages/api/auth/[...nextauth]";

export default async function MyHoursPage() {
  const getPage = async (): Promise<Shop | undefined> => {
    "use server";
    const session: Session | null = await getServerSession(authOptions);
    if (session?.user?.email) return await getShopByEmail(session?.user?.email);
  };
  const shop = await getPage();
  return <MyHours shop={shop} />;
}
