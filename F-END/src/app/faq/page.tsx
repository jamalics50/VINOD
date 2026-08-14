"use client";

import { useState } from "react";
import { ChevronDown, MessageCircleQuestion, Truck, CreditCard, ShieldCheck, Sun } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";
import clsx from "clsx";

interface FAQItem {
  id: string;
  category: "shipping" | "payment" | "freshness" | "storage";
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  // Shipping & Delivery
  {
    id: "s1",
    category: "shipping",
    question: "Which cities across Pakistan do you deliver to?",
    answer:
      "We deliver nationwide across Pakistan, including major metropolitan hubs (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta) as well as smaller towns across Punjab, Sindh, KPK, and Balochistan.",
  },
  {
    id: "s2",
    category: "shipping",
    question: "How long does shipping take after an order is placed?",
    answer:
      "Orders are dispatched directly from our orchards in Multan and Rahim Yar Khan. Delivery typically takes 24 to 48 hours for major cities and 2-3 business days for remote regions.",
  },
  {
    id: "s3",
    category: "shipping",
    question: "How is the fruit packaged for long-distance transit?",
    answer:
      "Our fruit is hand-sorted and packed in ventilated, padded wooden or corrugated cardboard crates designed specifically to absorb shocks during transit while maintaining airflow.",
  },

  // Payment Methods
  {
    id: "p1",
    category: "payment",
    question: "What payment options do you support?",
    answer:
      "We accept Cash on Delivery (COD), Direct Bank Transfer, JazzCash, and Easypaisa. You can select your preferred payment method during checkout.",
  },
  {
    id: "p2",
    category: "payment",
    question: "Are there any hidden delivery charges?",
    answer:
      "No hidden fees. Nationwide shipping is flat Rs. 250 for orders below Rs. 5,000, and completely FREE for all orders of Rs. 5,000 or more.",
  },

  // Freshness & Guarantee
  {
    id: "f1",
    category: "freshness",
    question: "What is your Freshness Guarantee?",
    answer:
      "We guarantee that our fruit is tree-matured and free from calcium carbide or artificial chemical accelerators. If any fruit arrives severely bruised or damaged during transit, take a quick photo and contact us on WhatsApp (+92 300 1234567) within 24 hours for a prompt replacement or credit.",
  },
  {
    id: "f2",
    category: "freshness",
    question: "Are your mangoes carbide-free?",
    answer:
      "Yes! 100% of our harvest is naturally ripened on the branch or allowed to mature naturally in breathable wooden crates.",
  },

  // Storage & Ripening Tips
  {
    id: "t1",
    category: "storage",
    question: "How should I store my mangoes when they arrive?",
    answer:
      "If the mangoes feel firm, keep them at room temperature in a cool, shaded room (preferably wrapped in paper or kept in the box) until they turn fragrant and yield softly to gentle pressure. Only refrigerate them once they are fully ripe to prolong freshness.",
  },
  {
    id: "t2",
    category: "storage",
    question: "Should I wash the mangoes immediately?",
    answer:
      "We recommend washing mangoes in cool water just before eating. Storing unwashed mangoes in room temperature allows their natural protective bloom to keep the skin fresh.",
  },
];

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<"all" | "shipping" | "payment" | "freshness" | "storage">("all");
  const [openIds, setOpenIds] = useState<string[]>(["s1", "f1"]);

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    activeTab === "all" ? FAQS : FAQS.filter((faq) => faq.category === activeTab);

  return (
    <div className="bg-husk min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <StencilBadge variant="dusk">Help & Information</StencilBadge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-orchard tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-bark/80 text-base">
            Everything you need to know about our fruit, shipping timelines, payment methods, and mango storage.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: "all", label: "All Questions", icon: MessageCircleQuestion },
            { id: "shipping", label: "Shipping & Transit", icon: Truck },
            { id: "payment", label: "Payment Methods", icon: CreditCard },
            { id: "freshness", label: "Freshness & Guarantee", icon: ShieldCheck },
            { id: "storage", label: "Storage & Ripening", icon: Sun },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all",
                  isActive
                    ? "bg-mango text-white shadow-md scale-105"
                    : "bg-white text-bark/80 hover:bg-mango/10 hover:text-orchard border border-mango/10"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-mango/10 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-husk/20 transition-colors"
                >
                  <span className="font-display text-lg font-bold text-orchard pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={clsx(
                      "w-8 h-8 rounded-full bg-husk flex items-center justify-center text-orchard transition-transform duration-300 flex-shrink-0",
                      isOpen && "rotate-180 bg-mango text-white"
                    )}
                  >
                    <ChevronDown className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-bark/80 text-sm leading-relaxed border-t border-bark/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="bg-white rounded-3xl p-8 text-center border border-mango/20 shadow-sm space-y-3">
          <h3 className="font-display text-xl font-bold text-orchard">Still have questions?</h3>
          <p className="text-bark/70 text-sm max-w-md mx-auto">
            Our team is always happy to assist with ripening guidance or order tracking.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dusk-teal text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-dusk-teal/90 transition-all text-sm"
            >
              <span>Chat on WhatsApp (+92 300 1234567)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
