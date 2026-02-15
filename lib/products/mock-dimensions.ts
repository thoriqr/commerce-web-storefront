import { ProductDimension } from "./types";

export const mockDimensions: ProductDimension[] = [
  {
    id: "color",
    name: "Color",
    values: [
      { id: "red", label: "Red", hexColor: "#EF4444" },
      { id: "blue", label: "Blue", hexColor: "#3B82F6" },
      { id: "black", label: "Black", hexColor: "#000000" },
      { id: "white", label: "White", hexColor: "#FFFFFF" }
    ]
  },
  {
    id: "size",
    name: "Size",
    values: [
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" }
    ]
  }
];
