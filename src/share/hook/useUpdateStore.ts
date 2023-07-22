"use client";
import { useStore } from "@/store";
import { Shop } from "../types/shop";

export const useUpdateStore = (data: Shop | undefined) => {
  const { setStore } = useStore();
  if (data) setStore(data);
};
