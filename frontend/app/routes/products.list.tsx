import type { Route } from "./+types/products.list";
import { ProductsList } from "../products/products.list";
import { API_ENDPOINTS } from "../constants";

export async function loader({ }: Route.LoaderArgs) {
  const res = await fetch(`${API_ENDPOINTS.PRODUCTS}/details`);
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  const data = await res.json();

  // Sort newest first. Note: I would do this in the backend instead.
  const sorted = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return sorted;
}

export default function ListProduct({ loaderData }: Route.ComponentProps) {
  /* For debugging purposes */
  console.log("ProductListLoaderData:", loaderData);

  return(
    <ProductsList products={loaderData} />
  );
}
