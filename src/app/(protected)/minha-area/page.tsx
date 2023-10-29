import MyArea from "@/screens/my-area";
import { getShopByEmail } from "@/share/controllers/firestore";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { Shop } from "@/share/types/shop";

export default async function MyAreaPage() {
  const getPage = async (): Promise<Shop | undefined> => {
    "use server";
    const session: Session | null = await getServerSession(authOptions);
    if (session?.user?.email) return await getShopByEmail(session?.user?.email);
  };

  const shop = await getPage();
  return <MyArea shop={shop} />;
}
