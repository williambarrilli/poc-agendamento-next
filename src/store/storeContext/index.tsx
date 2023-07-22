"use client";

import { createContext, useContext, useState } from "react";
import { Shop, initialShop } from "@/share/types/shop";

const initStateValue: Shop = initialShop;
const StoreContext = createContext<{
  store: Shop;
  setStore: React.Dispatch<React.SetStateAction<Shop>>;
}>({
  store: initStateValue,
  setStore: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Shop>(initStateValue);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
