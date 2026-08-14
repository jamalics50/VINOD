import { CorporateForm } from "./CorporateForm";
import { PackageOpen, ShieldCheck, Truck, Users } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export const metadata = {
  title: "Corporate Gifting & Bulk Orders | Food Basket Farm",
  description: "Send premium Pakistani mango crates and Eid hampers to employees, clients, and partners.",
};

export default function CorporateOrdersPage() {
  return (
    <div className="bg-husk min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="max-w-3xl space-y-4">
          <StencilBadge variant="sindhri">Corporate & Bulk Gifting</StencilBadge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-orchard tracking-tight leading-tight">
            Share the Sweetness of Pakistan's Finest Harvest
          </h1>
          <p className="text-bark/80 text-lg leading-relaxed">
            Delight your employees, business partners, and clients with hand-picked Sindhri and Chaunsa mango hampers, customized wooden crates, and premium desi pantry boxes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column - 7 cols */}
          <div className="lg:col-span-7">
            <CorporateForm />
          </div>

          {/* Perks Sidebar - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-mango/20 space-y-6">
              <h3 className="font-display text-xl font-bold text-orchard border-b border-bark/10 pb-4">
                Why Corporate Clients Choose Us
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-mango/10 text-mango flex items-center justify-center flex-shrink-0">
                    <PackageOpen className="w-5 h-5 transition-transform duration-200 hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-orchard text-base">Custom Branded Wooden Boxes</h4>
                    <p className="text-bark/70 text-xs mt-1 leading-relaxed">
                      We offer custom laser engraving or printed sleeves featuring your corporate logo and a personalized message card.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-dusk-teal/10 text-dusk-teal flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 transition-transform duration-200 hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-orchard text-base">Multi-City Doorstep Delivery</h4>
                    <p className="text-bark/70 text-xs mt-1 leading-relaxed">
                      We ship directly to individual employee home addresses across Lahore, Karachi, Islamabad, Faisalabad, and nationwide.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-sindhri/10 text-sindhri flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 transition-transform duration-200 hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-orchard text-base">100% Quality & Replacement Guarantee</h4>
                    <p className="text-bark/70 text-xs mt-1 leading-relaxed">
                      Every box undergoes double quality inspection. If any fruit arrives damaged during transit, we replace it instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orchard/10 text-orchard flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 transition-transform duration-200 hover:scale-110" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-orchard text-base">Dedicated Account Manager</h4>
                    <p className="text-bark/70 text-xs mt-1 leading-relaxed">
                      Enjoy single-point contact for invoice processing, order tracking, and custom packaging coordination.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
