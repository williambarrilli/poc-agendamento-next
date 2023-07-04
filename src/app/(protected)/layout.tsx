export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
