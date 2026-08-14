import { AlertTriangle, Truck, RefreshCw, Lock } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export const metadata = {
  title: "Policies | Food Basket Farm",
  description: "Shipping, Returns & Replacements, and Privacy Policies for Food Basket Farm.",
};

export default function PoliciesPage() {
  return (
    <div className="bg-husk min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <StencilBadge variant="sindhri">Store Policies</StencilBadge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-orchard tracking-tight">
            Shipping, Returns & Privacy
          </h1>
          <p className="text-bark/80 text-base">
            Transparent guidelines on how we handle dispatch, quality replacements, and your customer data.
          </p>
        </div>

        {/* PROMPT 4 Mandatory Draft Notice Banner */}
        <div className="rounded-2xl bg-sindhri/10 border-2 border-dashed border-sindhri/30 p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sindhri text-white flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div className="space-y-1 text-sm text-bark/90">
            <h4 className="font-display font-bold text-sindhri text-base">Draft Copy for Store Owner Review</h4>
            <p className="leading-relaxed">
              This policy text is a temporary operational template provided for website demonstration. It should be reviewed by legal counsel before being finalized as a binding agreement for commercial deployment.
            </p>
          </div>
        </div>

        {/* Section 1: Shipping Policy */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-mango/20 space-y-6">
          <div className="flex items-center gap-3 border-b border-bark/10 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-mango/10 text-mango flex items-center justify-center">
              <Truck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold text-orchard">1. Shipping & Delivery Policy</h2>
          </div>

          <div className="space-y-4 text-sm text-bark/80 leading-relaxed">
            <p>
              <strong>1.1 Orchard Dispatch:</strong> All orders of fresh mangoes and desi pantry staples are packed directly at our partner orchards in Multan and Rahim Yar Khan. Orders placed before 2:00 PM PKT are queued for dispatch on the same or next business day depending on fruit maturity.
            </p>
            <p>
              <strong>1.2 Delivery Timelines:</strong> Standard delivery time is 24 to 48 hours for major cities (Lahore, Karachi, Islamabad, Rawalpindi, Multan, Faisalabad, Peshawar). Remote regions or interior districts may require up to 3 business days.
            </p>
            <p>
              <strong>1.3 Shipping Charges:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Flat delivery rate of <strong>Rs. 250</strong> across Pakistan for orders below Rs. 5,000.</li>
              <li><strong>FREE Nationwide Shipping</strong> on all orders of Rs. 5,000 or more.</li>
            </ul>
          </div>
        </div>

        {/* Section 2: Returns & Replacements */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-mango/20 space-y-6">
          <div className="flex items-center gap-3 border-b border-bark/10 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-dusk-teal/10 text-dusk-teal flex items-center justify-center">
              <RefreshCw className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold text-orchard">2. Returns & Freshness Replacement Guarantee</h2>
          </div>

          <div className="space-y-4 text-sm text-bark/80 leading-relaxed">
            <p>
              <strong>2.1 Perishable Goods Exception:</strong> Due to the perishable nature of fresh fruit, we do not accept physical returns of delivered produce. However, your satisfaction is fully covered under our <strong>Freshness Guarantee</strong>.
            </p>
            <p>
              <strong>2.2 Transit Damage & Quality Claims:</strong> If your fruit crate arrives damaged, bruised, or spoiled during transport, please inform us within <strong>24 hours of delivery</strong>.
            </p>
            <p>
              <strong>2.3 Claim Procedure:</strong> Take clear photographs or a short video showing the damaged items and send them to our WhatsApp customer support at <strong>+92 300 1234567</strong> along with your Order ID.
            </p>
            <p>
              <strong>2.4 Resolution:</strong> Verified claims will be resolved with a free replacement crate sent on the next available dispatch slot, or a full store credit voucher.
            </p>
          </div>
        </div>

        {/* Section 3: Privacy Policy */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-mango/20 space-y-6">
          <div className="flex items-center gap-3 border-b border-bark/10 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-sindhri/10 text-sindhri flex items-center justify-center">
              <Lock className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold text-orchard">3. Privacy Policy</h2>
          </div>

          <div className="space-y-4 text-sm text-bark/80 leading-relaxed">
            <p>
              <strong>3.1 Information Collection:</strong> We collect personal details provided during checkout (Name, Phone Number, Shipping Address, Email Address) strictly for the purpose of fulfilling your order and sending delivery status updates via SMS/WhatsApp.
            </p>
            <p>
              <strong>3.2 Data Protection:</strong> Your personal information is stored securely in encrypted databases. We never sell, rent, or trade your contact information to third-party marketing brokers.
            </p>
            <p>
              <strong>3.3 Third-Party Services:</strong> Logistics partners (courier companies) receive only necessary delivery details (Name, Address, Phone Number) to complete doorstep delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
