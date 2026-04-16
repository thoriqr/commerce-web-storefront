import { VariantDetailWarning } from "../types";

export function getVariantStatusText(warning: VariantDetailWarning | null, stock: number) {
  switch (warning) {
    case "UNAVAILABLE":
      return <span className="text-destructive text-sm font-medium">Unavailable</span>;

    case "OUT_OF_STOCK":
      return <span className="text-destructive text-sm font-medium">Out of stock</span>;

    case "LOW_STOCK":
      return <span className="text-warning text-sm font-medium">Only {stock} left</span>;

    default:
      return <span className="text-muted-foreground text-sm">{stock} available</span>;
  }
}
