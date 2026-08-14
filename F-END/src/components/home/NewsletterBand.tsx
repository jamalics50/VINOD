"use client";

import { Send } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export function NewsletterBand() {
  return (
    <section className="bg-orchard text-husk py-16 lg:py-20 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-mango/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="space-y-4 max-w-2xl mx-auto">
          <StencilBadge variant="mango">Harvest Alerts</StencilBadge>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-husk tracking-tight">
            Be First to Know When the Chaunsa Harvest Drops
          </h2>
          <p className="text-husk/80 text-sm sm:text-base leading-relaxed">
            Pakistani mango seasons are short and demand is high. Join our VIP farm dispatch list for early access to limited harvest releases and secret pantry drops.
          </p>
        </div>

        {/* Signup Form */}
        <form 
          className="mx-auto max-w-md flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="flex-1 rounded-full bg-white/10 px-5 py-3.5 text-sm text-husk placeholder:text-husk/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-mango focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-mango px-7 py-3.5 text-sm font-bold text-bark hover:bg-mango/90 active:scale-95 transition-all shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
          >
            <span>Notify Me</span>
            <Send className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
          </button>
        </form>

        <p className="text-xs text-husk/50 font-mono">
          NO SPAM. ONLY SEASONAL HARVEST ANNOUNCEMENTS & DISCOUNTS.
        </p>
      </div>
    </section>
  );
}
