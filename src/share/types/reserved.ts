import { EnumStatus } from "./enums";
import { ServiceType } from "./shop";

export interface Reserved {
  name: string;
  phone: string;
  date: string;
  start?: string;
  end?: string;
  hour: string;
  status?: EnumStatus;
  service: string;
}
