import { ProductListingQueryParams } from "../types";

export function buildListingParams(searchParams: URLSearchParams): ProductListingQueryParams {
  const params: ProductListingQueryParams = {};

  searchParams.forEach((value, key) => {
    if (key !== "cursor") {
      params[key] = value;
    }
  });

  return params;
}
