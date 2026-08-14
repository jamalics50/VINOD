"use server";

import { api } from "@/lib/api";

export interface InquiryInput {
  type: "general" | "corporate";
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  quantity?: string;
  message: string;
}

export async function submitInquiryAction(data: InquiryInput) {
  try {
    if (!data.name || !data.email || !data.phone || !data.message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const result = await api.submitInquiry({
      type: data.type,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      companyName: data.companyName?.trim() || null,
      quantity: data.quantity?.trim() || null,
      message: data.message.trim(),
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true, inquiryId: result.inquiryId };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again." };
  }
}
