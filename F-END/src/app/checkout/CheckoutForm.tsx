"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";
import { createOrderAction } from "./actions";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import clsx from "clsx";

const PAKISTANI_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Jammu & Kashmir",
];

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  general?: string;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "Punjab",
    postalCode: "",
    paymentMethod: "COD",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-orchard font-display animate-pulse">
        Loading checkout...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm border border-mango/10 space-y-6">
        <h2 className="font-display text-2xl font-bold text-orchard">Your Basket is Empty</h2>
        <p className="text-bark/70 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-mango text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-mango/90 transition-all"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 5000 ? 0 : 250;
  const finalTotal = totalPrice + deliveryFee;

  // Inline Validation Helper
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        return undefined;
      case "phone":
        if (!value.trim()) return "Phone number is required for delivery updates";
        // Valid PK phone formats: 03001234567 or +923001234567 or 03xx-xxxxxxx
        const cleanPhone = value.replace(/[\s-]/g, "");
        if (!/^(\+92|0)?3\d{9}$/.test(cleanPhone)) {
          return "Please enter a valid Pakistani mobile number (e.g. 03001234567)";
        }
        return undefined;
      case "email":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return undefined;
      case "address":
        if (!value.trim()) return "Delivery street address is required";
        if (value.trim().length < 5) return "Please enter a detailed street address";
        return undefined;
      case "city":
        if (!value.trim()) return "City is required";
        return undefined;
      case "province":
        if (!value) return "Please select your province";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setTouched({
      name: true,
      phone: true,
      email: true,
      address: true,
      city: true,
      province: true,
      postalCode: true,
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await createOrderAction({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        items: items.map((i) => ({
          variantId: i.variantId,
          quantity: i.quantity,
          priceInPkr: i.priceInPkr,
        })),
        totalPkr: finalTotal,
        paymentMethod: formData.paymentMethod,
      });

      if (result.success && result.orderId) {
        clearCart();
        
        // Mock Redirects to Payment Gateway Initiators
        if (formData.paymentMethod === "JAZZCASH") {
          router.push(`/api/payments/jazzcash/initiate?orderId=${result.orderId}`);
        } else if (formData.paymentMethod === "EASYPAISA") {
          router.push(`/api/payments/easypaisa/initiate?orderId=${result.orderId}`);
        } else {
          router.push(`/order-confirmation/${result.orderId}`);
        }
      } else {
        setErrors({ general: result.error || "An error occurred during checkout." });
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrors({ general: "Failed to connect. Please check your internet connection." });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left Column: Shipping Form - 7 cols */}
      <div className="lg:col-span-7 space-y-8">
        {errors.general && (
          <div className="rounded-2xl bg-sindhri/10 border border-sindhri/30 p-4 text-sindhri text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
            <span>{errors.general}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/20 space-y-6">
          <div className="border-b border-bark/10 pb-4">
            <h2 className="font-display text-xl font-bold text-orchard flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mango text-white text-xs font-bold">1</span>
              <span>Delivery Details</span>
            </h2>
            <p className="text-xs text-bark/60 mt-1">
              Provide your Pakistani address for direct orchard delivery.
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-orchard">
              Full Name <span className="text-sindhri">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Tariq Mehmood"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className={clsx(
                "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none",
                errors.name && touched.name
                  ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                  : "border-bark/20 bg-white focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
              )}
            />
            {errors.name && touched.name && (
              <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Contact Row: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-orchard">
                Phone / WhatsApp <span className="text-sindhri">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="0300 1234567"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={clsx(
                  "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none",
                  errors.phone && touched.phone
                    ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                    : "border-bark/20 bg-white focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
                )}
              />
              {errors.phone && touched.phone && (
                <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-orchard">
                Email Address <span className="text-bark/40 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="tariq@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={clsx(
                  "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none",
                  errors.email && touched.email
                    ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                    : "border-bark/20 bg-white focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
                )}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-orchard">
              Street Address / House # <span className="text-sindhri">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="House 42, Block B, Model Town"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              className={clsx(
                "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none",
                errors.address && touched.address
                  ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                  : "border-bark/20 bg-white focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
              )}
            />
            {errors.address && touched.address && (
              <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                <span>{errors.address}</span>
              </p>
            )}
          </div>

          {/* Location Row: City, Province, Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* City */}
            <div className="space-y-1.5">
              <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-orchard">
                City <span className="text-sindhri">*</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="Lahore, Karachi..."
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                onBlur={() => handleBlur("city")}
                className={clsx(
                  "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none",
                  errors.city && touched.city
                    ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                    : "border-bark/20 bg-white focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
                )}
              />
              {errors.city && touched.city && (
                <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>{errors.city}</span>
                </p>
              )}
            </div>

            {/* Province Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="province" className="block text-xs font-bold uppercase tracking-wider text-orchard">
                Province <span className="text-sindhri">*</span>
              </label>
              <select
                id="province"
                value={formData.province}
                onChange={(e) => handleChange("province", e.target.value)}
                onBlur={() => handleBlur("province")}
                className={clsx(
                  "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none bg-white",
                  errors.province && touched.province
                    ? "border-sindhri bg-sindhri/5 focus:border-sindhri focus:ring-[3px] focus:ring-sindhri/25"
                    : "border-bark/20 focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25"
                )}
              >
                {PAKISTANI_PROVINCES.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
              {errors.province && touched.province && (
                <p className="text-xs text-sindhri font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>{errors.province}</span>
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div className="space-y-1.5">
              <label htmlFor="postalCode" className="block text-xs font-bold uppercase tracking-wider text-orchard">
                Postal Code <span className="text-bark/40 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="54000"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                onBlur={() => handleBlur("postalCode")}
                className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-dusk-teal focus:ring-[3px] focus:ring-dusk-teal/25 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Payment Method Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/20 space-y-4">
          <div className="border-b border-bark/10 pb-4">
            <h2 className="font-display text-xl font-bold text-orchard flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mango text-white text-xs font-bold">2</span>
              <span>Payment Option</span>
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {/* Option 1: COD */}
            <label
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                formData.paymentMethod === "COD"
                  ? "border-mango bg-mango/5 shadow-sm"
                  : "border-bark/20 hover:border-mango/50 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                    formData.paymentMethod === "COD" ? "border-mango" : "border-bark/30"
                  )}
                >
                  {formData.paymentMethod === "COD" && <div className="h-2.5 w-2.5 rounded-full bg-mango" />}
                </div>
                <div>
                  <span className="font-bold text-orchard text-sm block">Cash on Delivery (COD)</span>
                  <span className="text-xs text-bark/60">Pay when your fruit crate arrives</span>
                </div>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className="hidden"
              />
            </label>

            {/* Option 2: JazzCash */}
            <label
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                formData.paymentMethod === "JAZZCASH"
                  ? "border-mango bg-mango/5 shadow-sm"
                  : "border-bark/20 hover:border-mango/50 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                    formData.paymentMethod === "JAZZCASH" ? "border-mango" : "border-bark/30"
                  )}
                >
                  {formData.paymentMethod === "JAZZCASH" && <div className="h-2.5 w-2.5 rounded-full bg-mango" />}
                </div>
                <div>
                  <span className="font-bold text-orchard text-sm block">JazzCash Mobile Wallet</span>
                  <span className="text-xs text-bark/60">Redirects to secure payment portal</span>
                </div>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value="JAZZCASH"
                checked={formData.paymentMethod === "JAZZCASH"}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className="hidden"
              />
            </label>

            {/* Option 3: Easypaisa */}
            <label
              className={clsx(
                "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all",
                formData.paymentMethod === "EASYPAISA"
                  ? "border-mango bg-mango/5 shadow-sm"
                  : "border-bark/20 hover:border-mango/50 bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                    formData.paymentMethod === "EASYPAISA" ? "border-mango" : "border-bark/30"
                  )}
                >
                  {formData.paymentMethod === "EASYPAISA" && <div className="h-2.5 w-2.5 rounded-full bg-mango" />}
                </div>
                <div>
                  <span className="font-bold text-orchard text-sm block">Easypaisa</span>
                  <span className="text-xs text-bark/60">Redirects to secure payment portal</span>
                </div>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value="EASYPAISA"
                checked={formData.paymentMethod === "EASYPAISA"}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary Sidebar - 5 cols */}
      <div className="lg:col-span-5 space-y-6">
        <div className="glass-panel shadow-glass-md rounded-3xl p-6 sm:p-8 space-y-6 sticky top-28 border border-mango/20">
          <h3 className="font-display text-xl font-bold text-orchard border-b border-bark/10 pb-4">
            Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
          </h3>

          {/* Line items mini scroll list */}
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-husk/50 border border-mango/10">
                  <Image src={item.image || "/images/placeholder.png"} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-orchard truncate text-xs">{item.name}</h4>
                  <span className="text-[11px] text-bark/60 block">{item.label} &times; {item.quantity}</span>
                </div>
                <span className="font-display font-bold text-orchard text-xs">
                  Rs. {(item.priceInPkr * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-bark/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-bark/70">
              <span>Items Subtotal</span>
              <span className="font-semibold text-orchard">Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-bark/70">
              <span>Nationwide Shipping</span>
              <span className="font-semibold text-orchard">
                {deliveryFee === 0 ? <span className="text-dusk-teal font-bold">FREE</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>

            <div className="border-t border-bark/10 pt-3 flex justify-between items-end">
              <div>
                <span className="font-display text-lg font-bold text-orchard block">Total Payable</span>
                <span className="text-xs text-bark/50">PKR (Includes Taxes)</span>
              </div>
              <span className="font-display text-2xl font-bold text-mango">
                Rs. {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              "w-full flex items-center justify-center gap-3 bg-mango text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(232,169,61,0.39)] transition-all duration-200",
              isSubmitting
                ? "opacity-75 cursor-not-allowed"
                : "hover:shadow-[0_6px_20px_rgba(232,169,61,0.23)] hover:bg-mango/90 active:scale-[0.98]"
            )}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Continue to Payment</span>
                <CheckCircle2 className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>

          <div className="pt-2 border-t border-bark/5 space-y-3 text-xs text-bark/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-dusk-teal flex-shrink-0" strokeWidth={1.5} />
              <span>Direct orchard shipment with temperature protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-dusk-teal flex-shrink-0" strokeWidth={1.5} />
              <span>Nationwide delivery within 24-48 hours of dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
