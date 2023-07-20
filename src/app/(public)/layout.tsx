import { StoreProvider } from "@/store/storeContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
