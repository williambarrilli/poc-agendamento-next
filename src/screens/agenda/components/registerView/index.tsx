import Input from "@/share/components/input";
import styles from "./styles.module.scss";
import { useMemo } from "react";
import Button from "@/share/components/button";
import InputSelect from "@/share/components/inputSelect";
import { ServiceType } from "@/share/types/shop";
export interface RegisterViewProps {
  name: string;
  phone: string;
  serviceName: string;
  alterarName: (value: string) => void;
  alterarPhone: (value: string) => void;
  alterarSevice: (value: ServiceType) => void;
  onConfirm: () => void;
  services: ServiceType[];
}

export default function RegisterView({
  name,
  phone,
  serviceName,
  alterarName,
  alterarPhone,
  alterarSevice,
  onConfirm,
  services,
}: RegisterViewProps) {
  const handleNomeChange = (value: string) => {
    alterarName(value);
  };
  const handlePhoneChange = (value: string) => {
    alterarPhone(value);
  };
  const handleSeviceChange = (value: string) => {
    alterarSevice(services?.filter((service) => service?.name === value)[0]);
  };

  const isError = useMemo(
    () => !name || !phone || !serviceName,
    [name, phone, serviceName]
  );
  const serviceList = useMemo(
    () => services?.map((service) => service.name) || [],
    [services]
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.text}> Informações do cliente </h2>
      <div className={styles.content}>
        <div>
          <Input
            type="text"
            value={name}
            placeholder="Digite seu nome"
            label="Nome:"
            onChange={handleNomeChange}
          />
          <Input
            type="number"
            value={phone}
            placeholder="(**)****-****"
            label="Telefone:"
            onChange={handlePhoneChange}
          />
          <InputSelect
            value={serviceName}
            placeholder="Escolha o serviço"
            label="Atendimentos disponíveis:"
            onChange={handleSeviceChange}
            options={serviceList}
          />
          <div className={styles["box-button"]}>
            <Button
              styleOption="primary"
              text="Continuar"
              size="md"
              onClick={() => onConfirm()}
              disabled={isError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
