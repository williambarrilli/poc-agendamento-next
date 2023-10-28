import { Reserved } from "./reserved";

export interface Shop {
  id?: string;
  name: string;
  url: string;
  phone: string;
  instagram: string;
  reservedList: Reserved[];
  solicitationList: Reserved[];
  email: string;
  hoursShopOpen: string[];
  idCalendar: string;
}

export const initialShop = {
  id: "",
  name: "",
  url: "",
  phone: "",
  instagram: "",
  reservedList: [],
  solicitationList: [],
  email: "",
  hoursShopOpen: [],
  idCalendar: "",
};
