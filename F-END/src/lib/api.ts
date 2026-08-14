export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  products: Product[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  label: string;
  priceInPkr: number;
  stockQuantity: number;
  sku: string;
  product: Product;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  isActive: boolean;
  category: Category;
  variants: ProductVariant[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  province: string;
  address: string;
  postalCode?: string | null;
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  pricePkr: number;
  variant: ProductVariant;
}

export interface Order {
  id: string;
  customerId: string;
  status: string;
  paymentMethod: string;
  createdAt: string | Date;
  totalPkr: number;
  customer: Customer;
  items: OrderItem[];
}

export interface Inquiry {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  companyName: string | null;
  quantity: string | null;
  message: string;
  createdAt: string | Date;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchAPI<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API error ${response.status}: ${errorBody}`);
  }

  if (response.status !== 204) {
    return response.json();
  }
  return undefined as unknown as T;
}

const fallbackCategories: Category[] = [
  { id: "cat-mangoes", name: "Mangoes", slug: "mangoes", description: "Premium orchard-fresh mangoes", products: [] },
  { id: "cat-pantry", name: "Desi Pantry", slug: "pantry", description: "Traditional pure desi staples", products: [] }
];

const fallbackProducts: Product[] = [
  {
    id: "prod-sindhri", categoryId: "cat-mangoes", name: "Mirpur Khas Sindhri Box", slug: "sindhri-export-box",
    description: "Aromatic, fiberless, and deliciously sweet golden Sindhri mangoes harvested fresh from Sindh orchards.",
    images: ["/images/products/sindhri-mango.png"], isActive: true, category: fallbackCategories[0],
    variants: [{ id: "var-s1", productId: "prod-sindhri", label: "5 kg crate", priceInPkr: 2850, stockQuantity: 50, sku: "SIN-5KG", product: {} as any }]
  },
  {
    id: "prod-chaunsa", categoryId: "cat-mangoes", name: "Khanewal Honey Chaunsa", slug: "honey-chaunsa-crate",
    description: "Intensely sweet with a signature floral aroma. The undisputed king of mid-season mangoes.",
    images: ["/images/products/chaunsa-mango.png"], isActive: true, category: fallbackCategories[0],
    variants: [{ id: "var-c1", productId: "prod-chaunsa", label: "5 kg crate", priceInPkr: 3200, stockQuantity: 50, sku: "CHN-5KG", product: {} as any }]
  },
  {
    id: "prod-ratol", categoryId: "cat-mangoes", name: "Multani Anwar Ratol", slug: "anwar-ratol-wooden-crate",
    description: "Small in size, massive in flavor. Highly prized for its rich nectar-like richness.",
    images: ["/images/products/anwar-ratol.png"], isActive: true, category: fallbackCategories[0],
    variants: [{ id: "var-r1", productId: "prod-ratol", label: "4 kg crate", priceInPkr: 3600, stockQuantity: 20, sku: "RAT-4KG", product: {} as any }]
  },
  {
    id: "prod-langra", categoryId: "cat-mangoes", name: "Sindh Valley Langra", slug: "langra-premium-crate",
    description: "Green-skinned even when ripe, with a unique juicy tanginess loved by connoisseurs.",
    images: ["/images/products/langra-mango.png"], isActive: true, category: fallbackCategories[0],
    variants: [{ id: "var-l1", productId: "prod-langra", label: "5 kg crate", priceInPkr: 2900, stockQuantity: 30, sku: "LAN-5KG", product: {} as any }]
  },
  {
    id: "prod-ghee", categoryId: "cat-pantry", name: "Pure A2 Cultured Desi Ghee", slug: "organic-desi-ghee",
    description: "Traditionally slow-churned from grass-fed cow milk in small farmstead batches.",
    images: ["/images/products/desi-ghee.png"], isActive: true, category: fallbackCategories[1],
    variants: [{ id: "var-g1", productId: "prod-ghee", label: "1 kg jar", priceInPkr: 2400, stockQuantity: 100, sku: "GHEE-1KG", product: {} as any }]
  },
  {
    id: "prod-jaggery", categoryId: "cat-pantry", name: "Organic Sugarcane Jaggery", slug: "organic-jaggery",
    description: "Chemical-free pure jaggery made from fresh sugarcane juice.",
    images: ["/images/products/jaggery.png"], isActive: true, category: fallbackCategories[1],
    variants: [{ id: "var-j1", productId: "prod-jaggery", label: "1 kg pack", priceInPkr: 850, stockQuantity: 100, sku: "JAG-1KG", product: {} as any }]
  },
  {
    id: "prod-honey", categoryId: "cat-pantry", name: "Wild Sidr Honey", slug: "organic-honey",
    description: "Raw, unfiltered wild Sidr honey harvested from the pristine northern valleys.",
    images: ["/images/products/organic-honey.png"], isActive: true, category: fallbackCategories[1],
    variants: [{ id: "var-h1", productId: "prod-honey", label: "500g jar", priceInPkr: 3500, stockQuantity: 50, sku: "HON-500G", product: {} as any }]
  }
];

fallbackCategories[0].products = fallbackProducts.filter(p => p.categoryId === "cat-mangoes");
fallbackCategories[1].products = fallbackProducts.filter(p => p.categoryId === "cat-pantry");

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const data = await fetchAPI('/products', { next: { revalidate: 60 } });
      return Array.isArray(data) && data.length > 0 ? data : fallbackProducts;
    } catch (e) {
      console.error('Error fetching products:', e);
      return fallbackProducts;
    }
  },

  getProduct: async (slug: string): Promise<Product | null> => {
    try {
      const data = await fetchAPI(`/products/${slug}`, { next: { revalidate: 60 } });
      return data || fallbackProducts.find(p => p.slug === slug) || null;
    } catch (e) {
      console.error('Error fetching product:', e);
      return fallbackProducts.find(p => p.slug === slug) || null;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const data = await fetchAPI('/categories', { next: { revalidate: 3600 } });
      return Array.isArray(data) && data.length > 0 ? data : fallbackCategories;
    } catch (e) {
      console.error('Error fetching categories:', e);
      return fallbackCategories;
    }
  },

  getCategory: async (slug: string): Promise<Category | null> => {
    try {
      const data = await fetchAPI(`/categories/${slug}`, { next: { revalidate: 3600 } });
      return data || fallbackCategories.find(c => c.slug === slug) || null;
    } catch (e) {
      return fallbackCategories.find(c => c.slug === slug) || null;
    }
  },

  createOrder: async (data: any): Promise<Order> => {
    const payload = {
      customer: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        city: data.city,
        province: data.province,
      },
      items: data.items,
      paymentMethod: data.paymentMethod,
      totalPkr: data.totalPkr,
    };
    return fetchAPI<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getOrder: async (id: string): Promise<Order | null> => {
    try {
      return await fetchAPI(`/orders/${id}`, { cache: 'no-store' });
    } catch (e) {
      return null;
    }
  },

  submitInquiry: async (data: any): Promise<{ success: boolean; inquiryId?: string; error?: string }> => {
    try {
      const result = await fetchAPI('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return { success: true, inquiryId: result.id };
    } catch (e: any) {
      console.error('Error submitting inquiry:', e);
      return { success: false, error: e.message || 'Failed to submit inquiry' };
    }
  },
};
