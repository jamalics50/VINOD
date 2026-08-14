import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-husk py-12 lg:py-20">
      {/* Background Gradient Mesh Container */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-orchard via-orchard/90 to-bark px-6 py-16 sm:px-12 md:py-24 lg:flex lg:items-center lg:gap-x-12 lg:px-16 lg:py-28 shadow-xl">
          {/* Subtle Glow Overlay */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-mango/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sindhri/10 blur-3xl pointer-events-none" />
          
          {/* Crate Stamp Pattern Background Effect */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(#E8A93D 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 z-10">
            {/* Stamp Tag */}
            <div className="flex items-center gap-2 mb-6">
              <StencilBadge variant="mango">2026 Season Open</StencilBadge>
              <span className="hidden sm:inline-flex items-center text-xs font-semibold tracking-wider text-husk/70 uppercase">
                <Sparkles className="mr-1 h-4 w-4 text-mango" strokeWidth={1.5} /> Direct From Mirpur Khas
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-display font-bold tracking-tight text-husk sm:text-5xl lg:text-6xl leading-[1.1]">
              Sun-Ripened, <br />
              <span className="text-mango italic font-normal">Straight From</span> the Orchard.
            </h1>

            {/* Alternative Headlines Note / Subtext */}
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-husk/80">
              Hand-picked at peak sweetness in Sindh & Punjab, packed in traditional wooden crates, and delivered fresh across Pakistan within 48 hours.
            </p>

            {/* Call to Action */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="group relative inline-flex items-center gap-2 rounded-full bg-mango px-8 py-4 text-base font-semibold text-bark shadow-md hover:bg-mango/90 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango transition-all duration-300 active:scale-95"
              >
                <span>Shop the Harvest</span>
                <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
              <Link
                href="/category/mangoes"
                className="inline-flex items-center gap-2 rounded-full border border-husk/30 bg-white/5 px-6 py-4 text-base font-medium text-husk hover:bg-white/10 hover:border-husk/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-husk transition-all duration-200"
              >
                Explore Varieties
              </Link>
            </div>
          </div>

          {/* Seasonal Image Placeholder (Styled visual representation) */}
          <div className="mt-12 lg:mt-0 lg:flex-1 z-10 w-full">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-tr from-amber-500/30 via-mango/40 to-yellow-300/30 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-sm group">
              <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-bark/80 to-orchard/90 p-8 flex flex-col justify-between overflow-hidden">
                {/* Decorative Fruit Crate Outline Graphics */}
                <div className="absolute top-4 right-4 text-xs font-mono tracking-widest text-mango/40 border border-mango/20 px-2 py-1 rounded">
                  EST. MIRPUR KHAS
                </div>
                <div className="my-auto text-center space-y-3">
                  <div className="inline-block p-4 rounded-full bg-mango/10 border border-mango/30 text-mango">
                    🥭
                  </div>
                  <h3 className="font-display text-2xl text-husk">Fresh Harvest 2026</h3>
                  <p className="text-xs text-husk/60 max-w-xs mx-auto">
                    Visual placeholder for seasonal photography: Sindhri, Honey Chaunsa & Anwar Ratol crates.
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-husk/50 font-mono border-t border-husk/10 pt-4">
                  <span>PACKED AT FARM</span>
                  <span>100% CARBIDE-FREE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
