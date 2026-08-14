import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export function BrandStoryTeaser() {
  return (
    <section className="py-16 lg:py-24 bg-husk border-t border-bark/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Story Image / Graphic Placeholder */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto aspect-[4/5] max-w-md rounded-3xl bg-gradient-to-tr from-orchard via-dusk-teal to-mango/40 p-3 shadow-2xl ring-1 ring-bark/10">
              <div className="relative h-full w-full rounded-2xl bg-husk p-8 flex flex-col justify-between overflow-hidden border border-orchard/20">
                <div className="space-y-2">
                  <StencilBadge variant="orchard">Est. 1978</StencilBadge>
                  <p className="font-mono text-xs text-bark/60">INDUS BASIN ORCHARDS</p>
                </div>
                
                <div className="my-auto text-center space-y-4">
                  <div className="text-6xl">🌳</div>
                  <h4 className="font-display text-2xl font-bold text-orchard">Mirpur Khas & Khanewal</h4>
                  <p className="text-xs text-bark/70 leading-relaxed max-w-xs mx-auto">
                    Visual placeholder for farm photography: heritage mango trees and traditional fruit mandi crate assembly.
                  </p>
                </div>

                <div className="border-t border-bark/10 pt-4 flex justify-between text-[11px] font-mono text-bark/60">
                  <span>3RD GENERATION</span>
                  <span>MIRPUR KHAS, SINDH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <StencilBadge variant="sindhri">Our Roots</StencilBadge>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-orchard leading-tight">
              Three Generations of Orchard Care, Zero Artificial Carbide.
            </h2>

            <p className="text-base sm:text-lg text-bark/80 leading-relaxed">
              For over forty years, our family has cultivated Sindhri and Chaunsa varieties along the fertile banks of the Indus basin. We never ripen fruit artificially in commercial cold stores. Every crate is packed on the morning of harvest and shipped directly to your city.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {[
                "Tree-ripened for full aroma & flavor",
                "Delivered nationwide within 48 hours",
                "Hand-picked by veteran farm workers",
                "Guaranteed 100% organic farm practices",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-mango flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-bark">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/our-story"
                className="group inline-flex items-center gap-2 font-display text-lg font-bold text-orchard hover:text-dusk-teal transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
