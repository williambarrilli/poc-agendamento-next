export default function HomePage({
  params,
}: {
  params: { id: string; token: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // return <p>Post: {router.query.slug}</p>
  console.log(params);
  return <div>Aqui vai o codigo da da loja</div>;
}
