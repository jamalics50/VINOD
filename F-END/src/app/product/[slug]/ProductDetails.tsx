"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { Product, ProductVariant, Category } from '@/lib/api';
import clsx from 'clsx';
import Link from 'next/link';

type ProductWithRelations = Product & {
  variants: ProductVariant[];
  category: Category;
};

export default function ProductDetails({
  product,
  images,
}: {
  product: ProductWithRelations;
  images: string[];
}) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      id: selectedVariant.id, // Using variant ID for cart item
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      label: selectedVariant.label,
      priceInPkr: selectedVariant.priceInPkr,
      quantity,
      image: images[0],
    });
    
    // Optional: add a success toast here
  };

  return (
    <div>
      <Link href="/shop" className="text-bark/60 hover:text-mango text-sm font-medium transition-colors mb-8 inline-block">&larr; Back to Shop</Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-mango/10">
            <Image
              src={images[0]}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Thumbnails if we had multiple images */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <button key={i} className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-transparent focus-visible:outline-none focus-visible:border-mango focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2">
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-mango/10 text-orchard border border-mango/20">
              {product.category.name}
            </span>
          </div>
          
          <h1 className="font-display text-4xl font-bold text-orchard mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="text-3xl font-bold text-orchard mb-6 flex items-end gap-2">
            Rs. {selectedVariant?.priceInPkr.toLocaleString()}
            {product.category.slug === 'pantry' && <span className="text-sm font-normal text-bark/60 mb-1">/ {selectedVariant?.label}</span>}
          </div>
          
          <p className="text-lg text-bark/80 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-white rounded-2xl p-6 border border-husk shadow-sm mb-8">
            {/* Variants */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-orchard mb-3 uppercase tracking-wider">Select Option</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={clsx(
                      "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2",
                      selectedVariant?.id === variant.id
                        ? "border-mango bg-mango/5 text-orchard shadow-sm"
                        : "border-husk text-bark/70 hover:border-mango/40 hover:text-orchard bg-white"
                    )}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-orchard mb-3 uppercase tracking-wider">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-husk/50 rounded-lg p-1 border border-mango/10">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-md text-bark hover:bg-white hover:text-orchard transition-colors hover:shadow-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-orchard">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-md text-bark hover:bg-white hover:text-orchard transition-colors hover:shadow-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-bark/60">
                  {selectedVariant?.stockQuantity} in stock
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-mango text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(232,169,61,0.39)] hover:shadow-[0_6px_20px_rgba(232,169,61,0.23)] hover:bg-mango/90 transition-all duration-200 active:scale-[0.98]"
            >
              Add to Cart - Rs. {((selectedVariant?.priceInPkr || 0) * quantity).toLocaleString()}
            </button>
          </div>
          
          {/* Info Tabs */}
          <div className="border-t border-mango/10 pt-8 mt-4">
            <h3 className="font-display text-xl font-bold text-orchard mb-4">Farm Notes</h3>
            <ul className="space-y-3 text-bark/80">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-mango flex-shrink-0" />
                <p>Harvested at peak ripeness and shipped directly from our orchards to your door.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-mango flex-shrink-0" />
                <p>Packed carefully in breathable crates to ensure perfect condition upon arrival.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-mango flex-shrink-0" />
                <p>100% natural growing practices with zero artificial ripening agents used.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
