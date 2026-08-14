import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import ProductDetails from './ProductDetails'; // Client component for interactivity

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await api.getProduct(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  // Parse images JSON (falling back to empty array)
  let images: string[] = product.images || [];
  
  if (images.length === 0) {
    images = ['/images/placeholder.png'];
  }

  return (
    <div className="bg-husk min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ProductDetails product={product} images={images} />
      </div>
    </div>
  );
}
