import type { Route } from "./+types/products.create";
import { ProductsCreate } from "../products/products.create";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function CreateProduct() {
  return <ProductsCreate />;
}
