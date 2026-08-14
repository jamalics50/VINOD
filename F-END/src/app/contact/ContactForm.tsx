"use client";

import { useState } from "react";
import { submitInquiryAction } from "@/app/actions/inquiry";
import { CheckCircle2, AlertCircle, Send, MessageSquare } from "lucide-react";
import clsx from "clsx";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
        type: "general",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || "An error occurred while sending your message.");
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
          <h3 className="font-display text-2xl font-bold text-orchard">Message Sent!</h3>
          <p className="text-bark/70 text-sm max-w-md mx-auto">
            Shukriya <strong>{formData.name}</strong>! We've received your note and will get back to you via WhatsApp or email shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-mango/20 space-y-6">
      <div className="border-b border-bark/10 pb-4">
        <h2 className="font-display text-2xl font-bold text-orchard flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-mango" strokeWidth={1.5} />
          <span>Send Us a Message</span>
        </h2>
        <p className="text-xs text-bark/60 mt-1">
          Have a question about an existing order or fruit ripening? Send us a quick note below.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl bg-sindhri/10 border border-sindhri/30 p-4 text-sindhri text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          <span>{error}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-orchard">
          Your Name <span className="text-sindhri">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="e.g. Bilal Khan"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-bark/20 bg-white px-4 py-3 text-sm focus:border-mango focus:outline-none focus:ring-2 focus:ring-mango/20 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-orchard">
            Email Address <span className="text-sindhri">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="bilal@example.com"
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

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-orchard">
          How can we help? <span className="text-sindhri">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          required
          placeholder="Ask us anything about shipping, varieties, bulk orders, or farm visits..."
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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
          </>
        )}
      </button>
    </form>
  );
}
