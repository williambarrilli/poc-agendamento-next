import MyArea from "@/screens/my-area";
import { getShopByEmail } from "@/share/controllers/firestore";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function MyAreaPage() {
  const session = await getSession();
  console.log("MyAreaPage", session);

  // if (session?.user?.email) {
  //   const data = await getShopByEmail(session?.user?.email);
  // }
  return <MyArea />;

  // return redirect("/error");
}
