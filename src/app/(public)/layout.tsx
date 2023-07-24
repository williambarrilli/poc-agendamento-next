import { StoreProvider } from "@/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
