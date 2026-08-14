"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-husk min-h-screen py-16 flex items-center justify-center">
        <div className="animate-pulse font-display text-lg text-orchard">Loading basket...</div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const deliveryFee = totalPrice >= 5000 || totalPrice === 0 ? 0 : 250;
  const finalTotal = totalPrice + deliveryFee;

  return (
    <div className="bg-husk min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 border-b border-mango/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-mango mb-1 block">Shopping Basket</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-orchard">Your Selected Harvest</h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-sindhri hover:underline self-start md:self-auto"
            >
              Clear Entire Basket
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 lg:p-16 text-center max-w-2xl mx-auto shadow-sm border border-mango/10 space-y-6">
            <div className="w-24 h-24 rounded-full bg-husk mx-auto flex items-center justify-center text-mango shadow-inner">
              <ShoppingBag className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-orchard">Your Basket is Currently Empty</h2>
              <p className="text-bark/70 max-w-md mx-auto">
                Explore our orchards of sun-ripened Sindhri, Chaunsa, Anwar Ratol mangoes, and artisanal desi ghee.
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-mango text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-mango/90 transition-all hover:scale-105"
              >
                <ArrowLeft className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-5 h-5" strokeWidth={1.5} />
                <span>Explore Shop</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Table / List View - 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Desktop Table View */}
              <div className="hidden sm:block bg-white rounded-2xl overflow-hidden shadow-sm border border-mango/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-husk/50 text-orchard font-display text-xs uppercase tracking-wider border-b border-bark/10">
                      <th className="py-4 px-6 font-bold">Product</th>
                      <th className="py-4 px-4 font-bold text-center">Option</th>
                      <th className="py-4 px-4 font-bold text-center">Price</th>
                      <th className="py-4 px-4 font-bold text-center">Quantity</th>
                      <th className="py-4 px-6 font-bold text-right">Subtotal</th>
                      <th className="py-4 px-4 font-bold text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-bark/5 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-husk/20 transition-colors">
                        {/* Product Info */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-husk/50 border border-mango/10">
                              <Image
                                src={item.image || "/images/placeholder.png"}
                                alt={item.name}
                                fill
                                className="object-cover object-center"
                                sizes="64px"
                              />
                            </div>
                            <span className="font-display font-bold text-orchard text-base">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Option / Variant Label */}
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block text-xs font-semibold text-dusk-teal bg-dusk-teal/10 px-2.5 py-1 rounded-full">
                            {item.label}
                          </span>
                        </td>

                        {/* Unit Price */}
                        <td className="py-4 px-4 text-center font-medium text-bark/80">
                          Rs. {item.priceInPkr.toLocaleString()}
                        </td>

                        {/* Quantity Stepper */}
                        <td className="py-4 px-4 text-center">
                          <div className="inline-flex items-center rounded-full bg-husk/40 backdrop-blur-md p-1 border border-husk/60 shadow-sm">
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
                                  className="text-center font-bold text-orchard text-xs block"
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
                        </td>

                        {/* Item Total */}
                        <td className="py-4 px-6 text-right font-display font-bold text-orchard text-base">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={item.priceInPkr * item.quantity}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.12 }}
                            >
                              Rs. {(item.priceInPkr * item.quantity).toLocaleString()}
                            </motion.span>
                          </AnimatePresence>
                        </td>

                        {/* Action Remove */}
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-bark/40 hover:text-sindhri p-2 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-mango/10 flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-husk/50 border border-mango/10">
                      <Image
                        src={item.image || "/images/placeholder.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-display font-bold text-orchard">{item.name}</h4>
                          <span className="inline-block text-[11px] font-semibold text-dusk-teal bg-dusk-teal/10 px-2 py-0.5 rounded-full mt-1">
                            {item.label}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-bark/40 hover:text-sindhri p-1"
                        >
                          <Trash2 className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="inline-flex items-center rounded-full bg-husk/40 backdrop-blur-md p-0.5 border border-husk/60 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-bark hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Minus className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-3 w-3" strokeWidth={1.5} />
                          </button>
                          <div className="w-6 flex items-center justify-center overflow-hidden">
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
                            className="flex h-6 w-6 items-center justify-center rounded-full text-bark hover:bg-white hover:shadow-sm transition-all"
                          >
                            <Plus className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 h-3 w-3" strokeWidth={1.5} />
                          </button>
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={item.priceInPkr * item.quantity}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="font-display font-bold text-orchard"
                          >
                            Rs. {(item.priceInPkr * item.quantity).toLocaleString()}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orchard hover:text-mango transition-colors"
                >
                  <ArrowLeft className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-4 h-4" strokeWidth={1.5} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Sidebar Summary Card - 1 Column */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/20 space-y-6 sticky top-28">
                <h3 className="font-display text-xl font-bold text-orchard border-b border-bark/10 pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-bark/70">
                    <span>Subtotal</span>
                    <span className="font-semibold text-orchard">Rs. {totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-bark/70">
                    <span>Nationwide Delivery</span>
                    <span className="font-semibold text-orchard">
                      {deliveryFee === 0 ? (
                        <span className="text-dusk-teal font-bold">FREE</span>
                      ) : (
                        `Rs. ${deliveryFee}`
                      )}
                    </span>
                  </div>

                  {totalPrice < 5000 && (
                    <div className="rounded-xl bg-mango/10 p-3 text-xs text-orchard flex items-start gap-2 border border-mango/20">
                      <Truck className="w-4 h-4 text-mango flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>
                        Add <strong>Rs. {(5000 - totalPrice).toLocaleString()}</strong> more to qualify for <strong>FREE</strong> shipping across Pakistan!
                      </span>
                    </div>
                  )}

                  <div className="border-t border-bark/10 pt-4 flex justify-between items-end">
                    <div>
                      <span className="font-display text-lg font-bold text-orchard block">Grand Total</span>
                      <span className="text-xs text-bark/50">Incl. all local taxes & packing</span>
                    </div>
                    <span className="font-display text-2xl font-bold text-mango">
                      Rs. {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-3 bg-mango text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(232,169,61,0.39)] hover:shadow-[0_6px_20px_rgba(232,169,61,0.23)] hover:bg-mango/90 transition-all duration-200 active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-5 h-5" strokeWidth={1.5} />
                </Link>

                <div className="pt-2 border-t border-bark/5 space-y-3 text-xs text-bark/60">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-dusk-teal" strokeWidth={1.5} />
                    <span>Direct orchard-to-door freshness guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-dusk-teal" strokeWidth={1.5} />
                    <span>Express dispatch across Lahore, Karachi, Islamabad & nationwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
