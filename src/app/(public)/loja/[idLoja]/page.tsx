export default function HomePage({
  params,
}: {
  params: { id: string; token: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log(params);
  return <div>Aqui vai o codigo da da loja</div>;
}
