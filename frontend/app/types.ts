export type ProductType = {
  id: number;
  name: string;
};

export type Colour = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  ProductType?: ProductType;
  Colours?: Colour[];
  createdAt: string;
};

export type ProductsListProps = {
  products: Product[];
};

export type ProductsCreateProps = {
  productTypes: ProductType[];
  colors: Colour[];
};
