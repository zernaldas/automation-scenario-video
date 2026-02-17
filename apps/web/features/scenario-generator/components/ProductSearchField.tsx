import { useEffect, useMemo, useState } from "react";

import { PRODUCT_OPTIONS } from "../products";
import type { ProductPayload } from "../types";

type ProductSearchFieldProps = {
  value: ProductPayload | null;
  onChange: (value: ProductPayload | null) => void;
};

export function ProductSearchField({ value, onChange }: ProductSearchFieldProps) {
  const [query, setQuery] = useState(value?.name ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(value?.name ?? "");
  }, [value]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return PRODUCT_OPTIONS.slice(0, 8);
    }

    return PRODUCT_OPTIONS.filter((product) =>
      product.searchKey.includes(normalizedQuery),
    ).slice(0, 8);
  }, [query]);

  const handleInputChange = (nextValue: string) => {
    setQuery(nextValue);
    onChange(null);
    setOpen(true);
  };

  const handleSelect = (nextValue: ProductPayload) => {
    const payload: ProductPayload = {
      id: nextValue.id,
      name: nextValue.name,
      price: nextValue.price,
      category: nextValue.category,
    };

    setQuery(payload.name);
    onChange(payload);
    setOpen(false);
  };

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium">Products</label>
      <input
        value={query}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder="Cari produk berdasarkan translations.name"
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-200 transition focus:ring"
      />

      {open && filteredProducts.length > 0 && (
        <ul className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(product)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              >
                {product.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
