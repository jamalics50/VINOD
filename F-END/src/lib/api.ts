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

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const data = await fetchAPI('/products', { next: { revalidate: 60 } });
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Error fetching products:', e);
      return [];
    }
  },

  getProduct: async (slug: string): Promise<Product | null> => {
    try {
      return await fetchAPI(`/products/${slug}`, { next: { revalidate: 60 } });
    } catch (e) {
      console.error('Error fetching product:', e);
      return null;
    }
  },

  getCategories: async (): Promise<Category[]> => {
    try {
      const data = await fetchAPI('/categories', { next: { revalidate: 3600 } });
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Error fetching categories:', e);
      return [];
    }
  },

  getCategory: async (slug: string): Promise<Category | null> => {
    try {
      return await fetchAPI(`/categories/${slug}`, { next: { revalidate: 3600 } });
    } catch (e) {
      return null;
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
