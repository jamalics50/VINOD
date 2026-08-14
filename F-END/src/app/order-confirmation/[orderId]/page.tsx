import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, MessageSquare, Truck, Package, ArrowRight, PhoneCall, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const order = await api.getOrder(orderId);

  if (!order) {
    notFound();
  }

  const deliveryFee = order.totalPkr >= 5000 ? 0 : 250;
  const itemsSubtotal = order.items.reduce((acc, item) => acc + item.pricePkr * item.quantity, 0);

  return (
    <div className="bg-husk min-h-screen py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-10">
        {/* Banner Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-mango/20 text-center space-y-6">
          <div className="w-20 h-20 bg-dusk-teal/10 text-dusk-teal rounded-full mx-auto flex items-center justify-center shadow-inner">
            <CheckCircle2 className="w-10 h-10" strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-mango/10 text-orchard border border-mango/20">
              Order #{order.id.slice(-8).toUpperCase()} Confirmed
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-orchard">
              Shukriya, {order.customer.name}!
            </h1>
            <p className="text-bark/80 max-w-md mx-auto text-base">
              Your order has been logged in our orchard dispatch queue.
            </p>
          </div>

          {/* Prompt 4 mandatory WhatsApp / SMS notification note */}
          <div className="bg-husk/60 rounded-2xl p-6 border border-mango/20 text-left flex items-start gap-4 max-w-xl mx-auto">
            <div className="w-10 h-10 rounded-full bg-mango text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1 text-sm">
              <h4 className="font-display font-bold text-orchard text-base">We'll message you when it ships!</h4>
              <p className="text-bark/70 leading-relaxed">
                Our farm manager will reach out via WhatsApp or SMS at <strong>{order.customer.phone}</strong> to confirm your dispatch date and tracking link as soon as your fruit crate is packed.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details & Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Address Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/10 space-y-4">
            <h3 className="font-display text-lg font-bold text-orchard border-b border-bark/10 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-mango" strokeWidth={1.5} />
              <span>Shipping Details</span>
            </h3>
            <div className="space-y-2 text-sm text-bark/80">
              <p className="font-bold text-orchard text-base">{order.customer.name}</p>
              <p>{order.customer.address}</p>
              <p>
                {order.customer.city}, {order.customer.province} {order.customer.postalCode ? `- ${order.customer.postalCode}` : ""}
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-bark/60">
                <PhoneCall className="w-4 h-4 text-dusk-teal" strokeWidth={1.5} />
                <span>{order.customer.phone}</span>
              </div>
              {order.customer.email && (
                <p className="text-xs text-bark/60">{order.customer.email}</p>
              )}
            </div>
          </div>

          {/* Delivery & Status Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/10 space-y-4">
            <h3 className="font-display text-lg font-bold text-orchard border-b border-bark/10 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-mango" strokeWidth={1.5} />
              <span>Fulfillment Status</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-bark/60">Order Status:</span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-mango/10 text-orchard border border-mango/20">
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-bark/60">Payment Method:</span>
                <span className="font-bold text-orchard">
                  {order.paymentMethod === "COD"
                    ? "Cash on Delivery (COD)"
                    : order.paymentMethod === "JAZZCASH"
                    ? "JazzCash Mobile Wallet"
                    : order.paymentMethod === "EASYPAISA"
                    ? "Easypaisa"
                    : order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-bark/60">Estimated Transit:</span>
                <span className="font-bold text-orchard">24-48 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Order Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-mango/10 space-y-6">
          <h3 className="font-display text-xl font-bold text-orchard border-b border-bark/10 pb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-mango" strokeWidth={1.5} />
            <span>Ordered Items</span>
          </h3>

          <div className="divide-y divide-bark/10">
            {order.items.map((item) => {
              const images = item.variant.product.images || [];
              const mainImage = images[0] || "/images/placeholder.png";

              return (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-husk/50 border border-mango/10">
                      <Image src={mainImage} alt={item.variant.product.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-orchard text-base">
                        {item.variant.product.name}
                      </h4>
                      <span className="inline-block text-xs font-semibold text-dusk-teal bg-dusk-teal/10 px-2 py-0.5 rounded-full mt-0.5">
                        {item.variant.label} &times; {item.quantity}
                      </span>
                    </div>
                  </div>

                  <span className="font-display font-bold text-orchard text-base">
                    Rs. {(item.pricePkr * item.quantity).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-bark/10 pt-4 space-y-2 text-sm max-w-xs ml-auto">
            <div className="flex justify-between text-bark/70">
              <span>Items Subtotal</span>
              <span className="font-semibold text-orchard">Rs. {itemsSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-bark/70">
              <span>Nationwide Delivery</span>
              <span className="font-semibold text-orchard">
                {deliveryFee === 0 ? <span className="text-dusk-teal font-bold">FREE</span> : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="border-t border-bark/10 pt-3 flex justify-between items-end">
              <span className="font-display text-lg font-bold text-orchard">Total Amount</span>
              <span className="font-display text-2xl font-bold text-mango">
                Rs. {order.totalPkr.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-orchard text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-orchard/90 transition-all hover:scale-105"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 w-5 h-5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}
