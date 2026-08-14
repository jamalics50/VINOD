import Image from "next/image";
import Link from "next/link";
import { Sun, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export const metadata = {
  title: "Our Story | Food Basket Farm",
  description: "Sun-ripened Pakistani mangoes & desi pantry staples, delivered straight from our orchards.",
};

export default function AboutPage() {
  return (
    <div className="bg-husk min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="max-w-3xl space-y-4">
          <StencilBadge variant="mango">Our Story</StencilBadge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-orchard tracking-tight leading-tight">
            Sun-Ripened on the Branch, Shipped Direct to Your Family Table
          </h1>
          <p className="text-bark/80 text-lg leading-relaxed">
            Food Basket Farm was born out of a simple promise: bringing authentic, tree-matured Pakistani fruit and unadulterated desi pantry staples straight from rural orchards across Punjab and Sindh to homes nationwide.
          </p>
        </div>

        {/* Story Paragraph with Clearly Marked Placeholder Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/80 rounded-3xl p-8 sm:p-10 shadow-sm border border-mango/20 space-y-6">
              <h2 className="font-display text-2xl font-bold text-orchard">From Soil to Doorstep</h2>
              
              {/* Clearly marked placeholder paragraph per prompt instructions */}
              <div className="rounded-2xl bg-mango/10 p-6 border border-dashed border-mango/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mango">
                  <span className="w-2 h-2 rounded-full bg-mango animate-ping" />
                  <span>Story Copy Placeholder (Awaiting Final Farm Details)</span>
                </div>
                <p className="text-bark/90 text-sm leading-relaxed italic">
                  "At Food Basket Farm, we harvest our Sindhri, Chaunsa, and Anwar Ratol mangoes only when they reach natural maturity on the tree—never force-ripened with carbide. Our journey began on family land in Multan and Rahim Yar Khan, where generations of care go into every branch. Today, we bridge the gap between traditional Pakistani growers and fruit lovers nationwide, preserving the rich aroma, sweetness, and heritage of authentic harvest."
                </p>
              </div>

              <p className="text-bark/80 leading-relaxed text-sm">
                We believe that good food shouldn't come with compromise. That's why every crate of mangoes is hand-graded for size, aroma, and skin quality before being packed in breathable wooden boxes and shipped directly to your door.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white bg-orchard">
              <Image
                src="/images/products/chaunsa.jpg"
                alt="Food Basket Farm Orchards"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orchard/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono tracking-widest uppercase text-mango font-bold">Rahim Yar Khan & Multan</span>
                <p className="font-display text-lg font-bold">Hand-Picked at Peak Maturity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our 3 Core Pillars (No fake history timeline) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-mango">How We Operate</span>
            <h2 className="font-display text-3xl font-bold text-orchard">The Food Basket Farm Promise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-mango/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-mango/10 text-mango flex items-center justify-center">
                <Sun className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-orchard">Naturally Tree-Matured</h3>
              <p className="text-bark/70 text-sm leading-relaxed">
                No calcium carbide, no artificial accelerators. Our fruit stays on the branch until nature completes its work.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-mango/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-dusk-teal/10 text-dusk-teal flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-orchard">Direct Orchard Delivery</h3>
              <p className="text-bark/70 text-sm leading-relaxed">
                By removing middle-market distribution delays, your fruit arrives within 24 to 48 hours of being picked.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-mango/10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sindhri/10 text-sindhri flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-orchard">Fair Price to Growers</h3>
              <p className="text-bark/70 text-sm leading-relaxed">
                We work closely with small-scale Pakistani farmers, ensuring fair compensation and sustainable agricultural practices.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Band */}
        <div className="bg-orchard text-husk rounded-3xl p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-mango">Taste the Difference This Season</h3>
            <p className="text-husk/80 text-sm max-w-md">
              Browse our seasonal Sindhri, Chaunsa, and Anwar Ratol selection or order artisan desi ghee.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-mango text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-mango/90 transition-all hover:scale-105"
          >
            <span>Explore Our Harvest</span>
            <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
