export type FormState = {
  prompt: string;
  scenarioType: string;
  platform: string;
  product: ProductPayload | null;
};

export type ResultRow = {
  title: string;
  status: string;
  prompt: string;
  scenarioType: string;
  platform: string;
  productName: string;
  productSegment: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type DummyProductTranslation = {
  name?: string;
};

export type DummyProduct = {
  id: number;
  base_price?: number;
  default_category?: {
    translations?: DummyProductTranslation[];
  };
  translations?: DummyProductTranslation[];
};

export type ProductPayload = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export type ProductOption = ProductPayload & {
  label: string;
  searchKey: string;
};
