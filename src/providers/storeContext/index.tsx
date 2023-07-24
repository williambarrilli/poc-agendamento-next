"use client";
import { createContext, useContext, useState } from "react";
import { Shop, initialShop } from "@/share/types/shop";

const StoreContext = createContext<{
  store: Shop;
  setStore: React.Dispatch<React.SetStateAction<Shop>>;
}>({
  store: initialShop,
  setStore: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Shop>(initialShop);
  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
