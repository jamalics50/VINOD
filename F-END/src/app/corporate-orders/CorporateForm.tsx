"use client";

import { useState } from "react";
import { submitInquiryAction } from "@/app/actions/inquiry";
import { CheckCircle2, AlertCircle, Send, Building2 } from "lucide-react";
import clsx from "clsx";

export function CorporateForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    phone: "",
    quantity: "50-100 Crates",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await submitInquiryAction({
        type: "corporate",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        quantity: formData.quantity,
        message: formData.message,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "An error occurred while submitting your inquiry.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-mango/20 text-center space-y-6">
        <div className="w-16 h-16 bg-dusk-teal/10 text-dusk-teal rounded-full mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-orchard">Inquiry Received!</h3>
          <p className="text-bark/70 text-sm max-w-md mx-auto">
            Thank you, <strong>{formData.name}</strong> from <strong>{formData.companyName || "your company"}</strong>. Our corporate gifting lead will reach out within 24 hours to discuss custom branding and delivery schedules.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-mango/20 space-y-6">
      <div className="border-b border-bark/10 pb-4">
        <h2 className="font-display text-2xl font-bold text-orchard flex items-center gap-2">
          <Building2 className="w-6 h-6 text-mango" strokeWidth={1.5} />
          <span>Request Corporate Quotation</span>
        </h2>
        <p className="text-xs text-bark/60 mt-1">
          Custom wooden box branding, nationwide bulk delivery & tailored fruit selections.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl bg-sindhri/10 border border-sindhri/30 p-4 text-sindhri text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company Name */}
        <div className="space-y-1.5">
          <label htmlFor="companyName" className="block text-xs font-bold uppercase tracking-wider text-orchard">
            Company / Organization Name <span className="text-sindhri">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            required
            placeholder="e.g. Systems Limited"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
          />
        </div>

        {/* Contact Name */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-orchard">
            Contact Person Name <span className="text-sindhri">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="e.g. Zainab Ahmed"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
          />
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-orchard">
            Corporate Email <span className="text-sindhri">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="zainab@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-orchard">
            Phone / WhatsApp <span className="text-sindhri">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="0300 1234567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
          />
        </div>
      </div>

      {/* Quantity Estimate Dropdown */}
      <div className="space-y-1.5">
        <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-orchard">
          Estimated Quantity Required <span className="text-sindhri">*</span>
        </label>
        <select
          id="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
        >
          <option value="10-50 Crates">10 – 50 Premium Crates</option>
          <option value="50-100 Crates">50 – 100 Premium Crates</option>
          <option value="100-500 Crates">100 – 500 Premium Crates</option>
          <option value="500+ Crates">500+ Crates (Large Enterprise)</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-orchard">
          Order Requirements / Custom Branding Notes <span className="text-sindhri">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="Specify delivery cities, preferred fruit variety (e.g. Sindhri or Chaunsa), custom card messages, or Eid hamper requests..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "w-full flex items-center justify-center gap-3 bg-mango text-white font-bold text-base py-4 rounded-xl shadow-md transition-all",
          isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:bg-mango/90 hover:scale-[1.01]"
        )}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Submitting Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Quotation Request</span>
            <Send className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}
