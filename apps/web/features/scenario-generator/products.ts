import rawProducts from "./dummy-products.json";
import type { DummyProduct, ProductOption } from "./types";

const products = rawProducts as DummyProduct[];

function getTranslationNames(product: DummyProduct): string[] {
  const names =
    product.translations
      ?.map((translation) => translation.name?.trim())
      .filter((name): name is string => Boolean(name && name.length > 0)) ?? [];

  return Array.from(new Set(names));
}

export const PRODUCT_OPTIONS: ProductOption[] = products.map((product) => {
  const names = getTranslationNames(product);
  const name = names[0] ?? `Product ${product.id}`;

  return {
    id: product.id,
    name,
    price: product.base_price ?? 0,
    category: "coffee",
    label: name,
    searchKey: (names.length > 0 ? names.join(" ") : name).toLowerCase(),
  };
});
