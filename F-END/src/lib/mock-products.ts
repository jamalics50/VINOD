export interface Product {
  id: string;
  name: string;
  variety: string;
  varietyBadge: string;
  price: number;
  priceFormatted: string;
  unit: string;
  category: "mangoes" | "pantry";
  tag?: string;
  tagVariant?: "sindhri" | "mango" | "dusk" | "orchard";
  imageColor: string; // Placeholder background style
  description: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "sindhri-export-box",
    name: "Mirpur Khas Sindhri Box",
    variety: "Sindhri",
    varietyBadge: "Sindhri Special",
    price: 2850,
    priceFormatted: "Rs. 2,850",
    unit: "5 kg crate",
    category: "mangoes",
    tag: "Fresh Harvest",
    tagVariant: "sindhri",
    imageColor: "from-amber-400 to-yellow-600",
    description: "Aromatic, fiberless, and deliciously sweet golden Sindhri mangoes harvested fresh from Sindh orchards.",
  },
  {
    id: "honey-chaunsa-crate",
    name: "Khanewal Honey Chaunsa",
    variety: "Chaunsa",
    varietyBadge: "Honey Chaunsa",
    price: 3200,
    priceFormatted: "Rs. 3,200",
    unit: "5 kg crate",
    category: "mangoes",
    tag: "Customer Favorite",
    tagVariant: "mango",
    imageColor: "from-yellow-400 to-amber-500",
    description: "Intensely sweet with a signature floral aroma. The undisputed king of mid-season mangoes.",
  },
  {
    id: "anwar-ratol-wooden-crate",
    name: "Multani Anwar Ratol",
    variety: "Anwar Ratol",
    varietyBadge: "Anwar Ratol",
    price: 3600,
    priceFormatted: "Rs. 3,600",
    unit: "4 kg crate",
    category: "mangoes",
    tag: "Limited Batch",
    tagVariant: "orchard",
    imageColor: "from-lime-400 to-emerald-600",
    description: "Small in size, massive in flavor. Highly prized for its rich nectar-like richness.",
  },
  {
    id: "organic-desi-ghee",
    name: "Pure A2 Cultured Desi Ghee",
    variety: "Pantry",
    varietyBadge: "Desi Pantry",
    price: 2400,
    priceFormatted: "Rs. 2,400",
    unit: "1 kg jar",
    category: "pantry",
    tag: "Artisanal",
    tagVariant: "dusk",
    imageColor: "from-amber-200 to-amber-400",
    description: "Traditionally slow-churned from grass-fed cow milk in small farmstead batches.",
  },
  {
    id: "langra-premium-crate",
    name: "Sindh Valley Langra",
    variety: "Langra",
    varietyBadge: "Langra Prime",
    price: 2900,
    priceFormatted: "Rs. 2,900",
    unit: "5 kg crate",
    category: "mangoes",
    tag: "Tangy & Sweet",
    tagVariant: "orchard",
    imageColor: "from-emerald-400 to-teal-600",
    description: "Green-skinned even when ripe, with a unique juicy tanginess loved by connoisseurs.",
  },
];
