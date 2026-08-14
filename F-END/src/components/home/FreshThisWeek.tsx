"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, Check } from "lucide-react";
import { Product, ProductVariant, Category } from "@/lib/api";
import { StencilBadge } from "@/components/ui/StencilBadge";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type ProductWithRelations = Product & {
  variants: ProductVariant[];
  category: Category;
};

export function FreshThisWeek({ products }: { products: ProductWithRelations[] }) {
  const addItem = useCartStore((state) => state.addItem);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 lg:py-24 bg-husk">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-bark/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StencilBadge variant="sindhri">Fresh This Week</StencilBadge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-orchard">
              Hand-Picked & Ready to Ship
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dusk-teal hover:text-orchard transition-colors group"
          >
            <span>View all products</span>
            <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        {/* Horizontally Scrollable Row */}
        <div className="relative -mx-6 px-6 lg:-mx-8 lg:px-8 overflow-hidden">
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
            {products.map((product, index) => {
              const images = product.images || [];
              const mainImage = images[0] || '/images/placeholder.png';
              
              const sortedVariants = [...product.variants].sort((a, b) => a.priceInPkr - b.priceInPkr);
              const lowestPriceVariant = sortedVariants[0];

              return (
                <motion.div
                  key={product.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.07 }}
                  className="group relative flex-none w-[280px] sm:w-[320px] snap-start rounded-2xl bg-white/60 p-4 shadow-sm border border-bark/5 hover:-translate-y-1 hover:shadow-glass-md transition-all duration-[250ms] ease-out flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div 
                      className={`relative aspect-square w-full rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-inner border border-black/5`}
                    >
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${mainImage})` }}
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/0" />
                      <div className="relative z-10 flex justify-between items-start">
                        <StencilBadge variant={product.category.name.toLowerCase() === 'mangoes' ? 'mango' : 'dusk'}>
                          {product.category.name}
                        </StencilBadge>
                      </div>

                      <div className="relative z-10 text-right mt-auto">
                        <span className="text-[11px] font-mono tracking-wider font-semibold text-bark/80 bg-white/90 px-2 py-0.5 rounded-full backdrop-blur-sm shadow-sm">
                          {lowestPriceVariant?.label}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="mt-4 space-y-1">
                      <h3 className="font-display text-lg font-bold text-orchard group-hover:text-dusk-teal transition-colors">
                        <Link href={`/product/${product.slug}`}>
                          <span className="absolute inset-0 z-10" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-bark/70 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-bark/5 pt-4">
                    <div>
                      <span className="text-xs text-bark/50 block">From</span>
                      <span className="font-display text-xl font-bold text-orchard">
                        {lowestPriceVariant ? `Rs. ${lowestPriceVariant.priceInPkr.toLocaleString()}` : "Out of stock"}
                      </span>
                    </div>
                    <AddToCartButton 
                      product={product}
                      lowestPriceVariant={lowestPriceVariant}
                      mainImage={mainImage}
                      addItem={addItem}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AddToCartButton({ product, lowestPriceVariant, mainImage, addItem }: any) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        if (!lowestPriceVariant) return;
        addItem({
          id: lowestPriceVariant.id,
          productId: product.id,
          variantId: lowestPriceVariant.id,
          name: product.name,
          label: lowestPriceVariant.label,
          priceInPkr: lowestPriceVariant.priceInPkr,
          quantity: 1,
          image: mainImage,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-mango text-white hover:bg-mango/90 hover:scale-105 active:scale-[0.97] transition-all duration-300 active:duration-[120ms] shadow-[0_4px_14px_0_rgba(232,169,61,0.39)] focus-visible:outline-2 focus-visible:outline-mango"
      aria-label={`Add ${product.name} to cart`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        <ShoppingCart className={clsx(
            "absolute h-4 w-4 transition-all duration-300", 
            added ? "opacity-0 scale-75" : "opacity-100 scale-100"
          )} strokeWidth={1.5} />
        <Check className={clsx(
            "absolute h-4 w-4 transition-all duration-300", 
            added ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )} strokeWidth={1.5} />
      </div>
    </button>
  );
}
