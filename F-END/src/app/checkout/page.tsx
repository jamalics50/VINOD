import { CheckoutForm } from "./CheckoutForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Checkout | Food Basket Farm",
  description: "Complete your fresh fruit & desi pantry order from Food Basket Farm.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-husk min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between border-b border-mango/20 pb-6 gap-4">
          <div>
            <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-bark/60 hover:text-mango transition-colors mb-2">
              <ArrowLeft className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
              <span>Back to Basket</span>
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-orchard">Checkout & Shipping</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-bark/70 font-semibold bg-white/60 px-4 py-2 rounded-full border border-mango/10">
            <span className="w-2 h-2 rounded-full bg-dusk-teal animate-pulse" />
            <span>Secure Direct-Orchard Checkout</span>
          </div>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
}
