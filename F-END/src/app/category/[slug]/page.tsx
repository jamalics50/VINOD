import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await api.getCategory(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="bg-husk min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 border-b border-mango/20 pb-8">
          <Link href="/shop" className="text-bark/60 hover:text-mango text-sm font-medium transition-colors mb-4 inline-block">&larr; Back to Shop</Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-orchard mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-bark/80 max-w-2xl text-lg">
              {category.description}
            </p>
          )}
        </div>

        {category.products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-bark/60">No products available in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.products.map((product) => {
              const images = product.images || [];
              const mainImage = images[0] || '/images/placeholder.png';
              
              const sortedVariants = [...product.variants].sort((a, b) => a.priceInPkr - b.priceInPkr);
              const lowestPrice = sortedVariants[0]?.priceInPkr;

              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-mango/10">
                  <div className="relative aspect-square w-full overflow-hidden bg-husk/50">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="font-display text-xl font-bold text-orchard mb-2 group-hover:text-mango transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-bark/70 mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-husk flex items-center justify-between">
                      <div className="text-lg font-bold text-orchard">
                        {lowestPrice ? (
                          <>
                            <span className="text-sm font-normal text-bark/60 mr-1">From</span>
                            Rs. {lowestPrice.toLocaleString()}
                          </>
                        ) : (
                          "Out of stock"
                        )}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-mango/10 flex items-center justify-center text-mango group-hover:bg-mango group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
