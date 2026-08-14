"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press & prevent body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 5000 || totalPrice === 0 ? 0 : 250;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            aria-label="Shopping Cart Drawer"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col glass-panel shadow-glass-lg border-l border-mango/20"
          >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bark/10 p-6 bg-white/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mango/10 text-orchard">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-orchard">Your Basket</h2>
              <p className="text-xs text-bark/60">
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-bark/60 hover:bg-bark/10 hover:text-orchard transition-colors"
            aria-label="Close cart"
          >
            <X className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Cart Line Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mango/10 text-mango">
                <ShoppingBag className="h-10 w-10" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-orchard">Your basket is empty</h3>
                <p className="text-sm text-bark/70 max-w-xs">
                  Sun-ripened fruit and desi pantry staples are waiting for you in the orchard!
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-mango px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-mango/90 transition-all"
              >
                <span>Browse Products</span>
                <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm border border-bark/5 hover:border-mango/20 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-husk/50 border border-mango/10">
                  <Image
                    src={item.image || "/images/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between self-stretch">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-orchard line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-bark/40 hover:text-sindhri transition-colors p-1"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <span className="inline-block text-xs font-semibold text-dusk-teal bg-dusk-teal/10 px-2 py-0.5 rounded-full mt-0.5">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity Stepper */}
                    <div className="inline-flex items-center rounded-full bg-white/40 backdrop-blur-md p-1 border border-white/40 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-bark hover:bg-white hover:text-orchard transition-colors hover:shadow-sm"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <div className="w-8 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={item.quantity}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="text-center text-xs font-bold text-orchard block"
                          >
                            {item.quantity}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-bark hover:bg-white hover:text-orchard transition-colors hover:shadow-sm"
                        aria-label="Increase quantity"
                      >
                        <Plus className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Subtotal price for item */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.priceInPkr * item.quantity}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.12 }}
                        className="font-display text-sm font-bold text-orchard"
                      >
                        Rs. {(item.priceInPkr * item.quantity).toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="border-t border-bark/10 bg-white p-6 space-y-4 shadow-inner">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-bark/70">
                <span>Items Subtotal</span>
                <span className="font-semibold text-orchard">Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-bark/70">
                <span>Nationwide Shipping</span>
                <span className="font-semibold text-orchard">
                  {deliveryFee === 0 ? (
                    <span className="text-dusk-teal font-bold">FREE</span>
                  ) : (
                    `Rs. ${deliveryFee}`
                  )}
                </span>
              </div>
              {totalPrice < 5000 && (
                <p className="text-[11px] text-bark/60 italic">
                  Add Rs. {(5000 - totalPrice).toLocaleString()} more for free nationwide delivery!
                </p>
              )}
              <div className="flex justify-between border-t border-bark/10 pt-2 font-display text-lg font-bold text-orchard">
                <span>Estimated Total</span>
                <span className="text-mango">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex items-center justify-center rounded-xl border border-mango/40 bg-husk px-4 py-3 text-sm font-bold text-orchard hover:bg-mango/10 transition-all text-center"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 rounded-xl bg-mango px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-mango/90 transition-all text-center"
              >
                <span>Checkout</span>
                <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}
      </motion.aside>
      </>
      )}
    </AnimatePresence>
    </>
  );
}
