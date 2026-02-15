export type DimensionValue = {
  id: string;
  label: string;
  hexColor?: string; // optional karena cuma color yang punya
};

export type ProductDimension = {
  id: string;
  name: string; // e.g. "Color", "Size"
  values: DimensionValue[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
};
