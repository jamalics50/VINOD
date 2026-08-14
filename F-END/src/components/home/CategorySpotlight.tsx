import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export function CategorySpotlight() {
  return (
    <section className="py-16 lg:py-24 bg-husk">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <StencilBadge variant="dusk">Our Collections</StencilBadge>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-orchard">
            From Our Orchards to Your Kitchen
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mangoes Spotlight Card */}
          <Link
            href="/category/mangoes"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-mango/90 via-amber-600 to-orchard p-8 sm:p-12 text-husk shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[380px] flex flex-col justify-between"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-bark/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
            <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 flex justify-between items-start">
              <StencilBadge variant="orchard" className="bg-husk/90">
                Primary Harvest
              </StencilBadge>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-husk/20 backdrop-blur-md text-husk group-hover:bg-husk group-hover:text-orchard transition-all duration-300">
                <ArrowUpRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-6 w-6" strokeWidth={1.5} />
              </div>
            </div>

            <div className="relative z-10 space-y-3 mt-12">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-husk tracking-tight">
                Fresh Mangoes
              </h3>
              <p className="text-husk/90 text-sm sm:text-base max-w-md font-sans leading-relaxed">
                Pakistan&apos;s finest mango varieties — Sindhri, Honey Chaunsa, and Anwar Ratol. Tree-ripened, hand-packed in wooden crates.
              </p>
              <span className="inline-block text-xs font-mono tracking-widest text-husk font-bold underline underline-offset-4 pt-2">
                EXPLORE MANGO VARIETIES &rarr;
              </span>
            </div>
          </Link>

          {/* Pantry Spotlight Card */}
          <Link
            href="/category/pantry"
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orchard via-orchard/95 to-bark p-8 sm:p-12 text-husk shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[380px] flex flex-col justify-between"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
            <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-mango/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10 flex justify-between items-start">
              <StencilBadge variant="mango">
                Desi Pantry
              </StencilBadge>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-husk/20 backdrop-blur-md text-husk group-hover:bg-mango group-hover:text-bark transition-all duration-300">
                <ArrowUpRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-6 w-6" strokeWidth={1.5} />
              </div>
            </div>

            <div className="relative z-10 space-y-3 mt-12">
              <h3 className="text-3xl sm:text-4xl font-display font-bold text-husk tracking-tight">
                Desi Pantry <span className="text-xs font-mono font-normal bg-mango/20 text-mango border border-mango/30 px-2 py-1 rounded ml-2">COMING SOON</span>
              </h3>
              <p className="text-husk/80 text-sm sm:text-base max-w-md font-sans leading-relaxed">
                Desi pantry favorites coming soon — cultured A2 ghee, cold-pressed mustard oil, and wild forest honey.
              </p>
              <span className="inline-block text-xs font-mono tracking-widest text-mango font-bold underline underline-offset-4 pt-2">
                PREVIEW PANTRY COLLECTION &rarr;
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
