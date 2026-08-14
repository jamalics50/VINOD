import { StencilBadge } from "@/components/ui/StencilBadge";

export function TrustQuote() {
  return (
    <section className="py-16 lg:py-24 bg-husk relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Distinctive Crate Seal Quote Card */}
        <div className="relative rounded-3xl bg-white/80 p-8 sm:p-14 shadow-xl border-2 border-orchard/20 backdrop-blur-sm overflow-hidden">
          {/* Top Wooden Crate Stamp Corner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bark/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <StencilBadge variant="mango">Grower&apos;s Pledge</StencilBadge>
              <span className="font-mono text-xs text-bark/60 uppercase tracking-widest">
                GUARANTEE OF AUTHENTICITY
              </span>
            </div>
            <div className="font-mono text-xs text-sindhri font-bold border border-sindhri/30 px-3 py-1 rounded-full w-fit">
              100% UNTREATED FRUIT
            </div>
          </div>

          {/* Pull Quote */}
          <div className="relative z-10 space-y-6">
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-orchard leading-relaxed tracking-tight">
              &ldquo;If a single mango in your crate arrives bruised or artificially ripened, we don&apos;t ask questions — we send a fresh crate directly to your home, on us. That is how our elders did business, and that is how we run Food Basket Farm.&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-center justify-between pt-4 border-t border-bark/5">
              <div>
                <h4 className="font-display text-lg font-bold text-orchard">Malik Tariq Khan</h4>
                <p className="text-xs text-bark/60 font-sans">Head Grower & Co-Founder, Mirpur Khas Orchards</p>
              </div>

              {/* Ink-Stamped Seal Icon */}
              <div className="hidden sm:flex items-center justify-center h-16 w-16 rounded-full border-2 border-dashed border-orchard/40 text-orchard text-xs font-mono font-bold text-center leading-tight rotate-[-12deg] bg-mango/10 p-2">
                FARM SEAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
