import { EnumStatus } from "./enums";

export interface Reserved {
  name: string;
  phone: string;
  date: string;
  start?: string;
  end?: string;
  hour: string;
  status?: EnumStatus;
}
