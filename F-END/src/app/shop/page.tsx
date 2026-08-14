import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const allProducts = await api.getProducts();
  const products = allProducts.filter(p => p.isActive);

  return (
    <div className="bg-husk min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-mango/20 pb-8 gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-orchard mb-4">All Products</h1>
            <p className="text-bark/80 max-w-2xl text-lg">
              Browse our complete selection of fresh, orchard-picked fruit and premium desi pantry staples.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/category/mangoes" 
              className="px-6 py-2 rounded-full border border-mango/40 bg-mango/5 text-orchard font-medium hover:bg-mango hover:text-white transition-colors duration-200"
            >
              Mangoes
            </Link>
            <Link 
              href="/category/pantry" 
              className="px-6 py-2 rounded-full border border-mango/40 bg-mango/5 text-orchard font-medium hover:bg-mango hover:text-white transition-colors duration-200"
            >
              Desi Pantry
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-bark/60">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
              const images = product.images || [];
              const mainImage = images[0] || '/images/placeholder.png';
              
              // Sort variants by price ascending to find the starting price
              const sortedVariants = [...product.variants].sort((a, b) => a.priceInPkr - b.priceInPkr);
              const lowestPrice = sortedVariants[0]?.priceInPkr;

              return (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-glass-md transition-all duration-[250ms] ease-out border border-mango/10">
                  <div className="relative aspect-square w-full overflow-hidden bg-husk/50">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-orchard backdrop-blur-sm shadow-sm border border-mango/20">
                        {product.category.name}
                      </span>
                    </div>
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
