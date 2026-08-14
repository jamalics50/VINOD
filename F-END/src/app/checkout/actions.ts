"use server";

import { api } from "@/lib/api";

export interface CheckoutInput {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  items: {
    variantId: string;
    quantity: number;
    priceInPkr: number;
  }[];
  totalPkr: number;
  paymentMethod: string;
}

export async function createOrderAction(data: CheckoutInput) {
  try {
    if (!data.name || !data.phone || !data.address || !data.city || !data.province) {
      return { success: false, error: "Missing required shipping information." };
    }

    if (!data.items || data.items.length === 0) {
      return { success: false, error: "Your basket is empty." };
    }

    // Filter or validate items to ensure valid variantId
    const invalidItems = data.items.filter((item) => !item.variantId || item.variantId === "$undefined" || typeof item.variantId !== "string");
    if (invalidItems.length > 0) {
      return { success: false, error: "One or more cart items have an invalid variant. Please clear your basket and re-add the items." };
    }

    // Create Order through external API
    const order = await api.createOrder(data);

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to process order. Please try again." };
  }
}
