import { Hero } from "@/components/home/Hero";
import { FreshThisWeek } from "@/components/home/FreshThisWeek";
import { CategorySpotlight } from "@/components/home/CategorySpotlight";
import { BrandStoryTeaser } from "@/components/home/BrandStoryTeaser";
import { TrustQuote } from "@/components/home/TrustQuote";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { api } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allProducts = await api.getProducts();
  const products = allProducts.filter(p => p.isActive).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      <ScrollReveal>
        {/* 2. Fresh This Week Section */}
        <FreshThisWeek products={products} />
      </ScrollReveal>

      <ScrollReveal>
        {/* 3. Category Spotlight Section */}
        <CategorySpotlight />
      </ScrollReveal>

      <ScrollReveal>
        {/* 4. Brand Story Teaser */}
        <BrandStoryTeaser />
      </ScrollReveal>

      <ScrollReveal>
        {/* 5. Trust / Quote Block */}
        <TrustQuote />
      </ScrollReveal>

      <ScrollReveal>
        {/* 6. Newsletter Signup Band */}
        <NewsletterBand />
      </ScrollReveal>
    </div>
  );
}
