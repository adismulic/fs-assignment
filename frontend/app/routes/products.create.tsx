import type { Route } from "./+types/products.create";
import { ProductsCreate } from "../products/products.create";
import { API_ENDPOINTS } from "../constants";

export async function loader({ }: Route.LoaderArgs) {
    try {
        const productTypesRes = await fetch(API_ENDPOINTS.PRODUCT_TYPES);
        const colorsRes = await fetch(API_ENDPOINTS.COLOURS);

        if (!productTypesRes.ok || !colorsRes.ok) {
            return { productTypes: [], colors: [], error: "Failed to fetch data" };
        }

        const productTypes = await productTypesRes.json();
        const colors = await colorsRes.json();

        return { productTypes, colors };
    } catch (error) {
        return { productTypes: [], colors: [], error: "Network error" };
    }
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  return <ProductsCreate productTypes={loaderData.productTypes} colors={loaderData.colors} />;
}
