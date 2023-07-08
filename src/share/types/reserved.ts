import { EnumStatus } from "./enums";

export interface Reserved {
  name: string;
  phone: string;
  date: string;
  hour: string;
  status: EnumStatus;
}
