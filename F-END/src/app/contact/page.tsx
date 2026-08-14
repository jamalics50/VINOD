import { ContactForm } from "./ContactForm";
import { PhoneCall, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import { StencilBadge } from "@/components/ui/StencilBadge";

export const metadata = {
  title: "Contact Us | Food Basket Farm",
  description: "Get in touch with Food Basket Farm for order inquiries, delivery updates, and support.",
};

export default function ContactPage() {
  return (
    <div className="bg-husk min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <StencilBadge variant="mango">Get In Touch</StencilBadge>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-orchard tracking-tight leading-tight">
            We'd Love to Hear From You
          </h1>
          <p className="text-bark/80 text-lg leading-relaxed">
            Whether you need help selecting a mango variety, checking your delivery status, or inquiring about bulk orders, our farm team is just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Sidebar - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-mango/20 space-y-8">
              <h3 className="font-display text-xl font-bold text-orchard border-b border-bark/10 pb-4">
                Direct Contact Details
              </h3>

              <div className="space-y-6 text-sm">
                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-dusk-teal/10 text-dusk-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                    <PhoneCall className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-bark/50 block">Phone & WhatsApp</span>
                    <a
                      href="https://wa.me/923001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-bold text-orchard text-base hover:text-mango transition-colors"
                    >
                      +92 300 1234567
                    </a>
                    <span className="text-xs text-bark/60 block mt-0.5">Fastest response for delivery inquiries</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-mango/10 text-mango flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-bark/50 block">Email Support</span>
                    <a
                      href="mailto:hello@foodbasketfarm.pk"
                      className="font-display font-bold text-orchard text-base hover:text-mango transition-colors"
                    >
                      hello@foodbasketfarm.pk
                    </a>
                    <span className="text-xs text-bark/60 block mt-0.5">For corporate inquiries & feedback</span>
                  </div>
                </div>

                {/* Farm Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-sindhri/10 text-sindhri flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-bark/50 block">Main Orchard Hub</span>
                    <p className="font-display font-bold text-orchard text-base">
                      Multan & Rahim Yar Khan
                    </p>
                    <span className="text-xs text-bark/60 block mt-0.5">Punjab, Pakistan</span>
                  </div>
                </div>

                {/* Support Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orchard/10 text-orchard flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-bark/50 block">Support Hours</span>
                    <p className="font-bold text-orchard text-sm">Monday – Saturday: 9:00 AM – 7:00 PM PKT</p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action */}
              <div className="pt-4 border-t border-bark/10">
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-dusk-teal text-white font-bold py-3.5 px-4 rounded-xl shadow-sm hover:bg-dusk-teal/90 transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column - 7 cols */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
