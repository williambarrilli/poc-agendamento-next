import "../reset.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./error";
import GlobalError from "./global-error";

export const metadata = {
  title: "Minha Reserva PF",
  description: "Aplicação de reservas em fase de testes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <ErrorBoundary fallback={<GlobalError />}>
        <body>{children}</body>
      </ErrorBoundary>
    </html>
  );
}
