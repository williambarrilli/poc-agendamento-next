"use client";

import { createContext, useContext, useState } from "react";
import { Shop, initialShop } from "@/share/types/shop";

const initStateValue: Shop = initialShop;
const StoreContext = createContext<{
  state: Shop;
  setState: React.Dispatch<React.SetStateAction<Shop>>;
}>({
  state: initStateValue,
  setState: () => {},
});

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<Shop>(initStateValue);

  return (
    <StoreContext.Provider value={{ state, setState }}>
      {children}
    </StoreContext.Provider>
  );
};
