'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { publicApiClient } from '@/lib/public-api-client';
import { useCart } from '@/lib/hooks/useCart';
import AddToCartButton from '@/components/ui/AddToCartButton';

type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string | null;
  category?: string | null;
  availability?: number;
};

export default function ShopPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const { count } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await publicApiClient.getProducts();
      if (response.success && response.data) {
        const parsed = (response.data as any[]).map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          price: Number(p.price),
          imageUrl: p.imageUrl ?? p.image_url ?? null,
          category: p.category,
          availability: p.availability,
        })) as Product[];
        setProducts(parsed);
      }
    } catch (error) {
      console.error('Failed to load products', error);
      setStatusMessage({ type: 'error', text: 'Failed to load products.' });
    } finally {
      setProductsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = categoryFilter === 'all' || (p.category || '').toLowerCase() === categoryFilter;
      const matchSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, categoryFilter, searchTerm]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => (p.category || 'uncategorized').toLowerCase())));
    return ['all', ...unique];
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white selection:bg-cta-500/30">
      <TopBar />
      <Navbar darkBg />

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary-900/50 to-transparent pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-cta-500/5 rounded-full blur-3xl pointer-events-none" />

        <section className="relative py-20 lg:py-28">
          <div className="container-custom relative z-10">
            <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-primary-200">
                <ShoppingCart className="h-4 w-4 text-cta-400" />
                <span className="font-medium tracking-wide">Premium Digital Assets</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary-200">
                Elevate Your Project
              </h1>

              <p className="text-xl text-primary-200/80 leading-relaxed max-w-2xl">
                Discover curated tools, templates, and expert services designed to accelerate your digital growth.
                Instant delivery, secure checkout.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-cta hover:bg-cta-600 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-cta/20 transition-all hover:scale-105 active:scale-95">
                  Browse Collection
                </Button>
                <Link href="/cart">
                  <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg backdrop-blur-sm transition-all">
                    View Cart ({count})
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pb-24">
          <div className="container-custom">

            {/* Filters Bar */}
            <div className="sticky top-4 z-40 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-10 shadow-2xl shadow-black/20 flex flex-col md:flex-row gap-4 justify-between items-center transition-all">
              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${categoryFilter === 'all'
                    ? 'bg-cta text-white shadow-lg shadow-cta/20'
                    : 'bg-white/5 text-primary-300 hover:bg-white/10'
                    }`}
                >
                  All Products
                </button>
                {categories.filter(c => c !== 'all').map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${categoryFilter === c
                      ? 'bg-cta text-white shadow-lg shadow-cta/20'
                      : 'bg-white/5 text-primary-300 hover:bg-white/10'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-72 relative group">
                <Search className="h-4 w-4 text-primary-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cta-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-primary-500 focus:outline-none focus:border-cta-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {statusMessage && (
              <div
                className={`mb-8 rounded-xl px-4 py-3 border flex items-center gap-3 ${statusMessage.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-200 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-200 border-red-500/20'
                  }`}
              >
                <div className={`h-2 w-2 rounded-full ${statusMessage.type === 'success' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                {statusMessage.text}
              </div>
            )}

            {productsLoading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/5 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-primary-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-[#0B0F19] border border-white/5 rounded-3xl overflow-hidden hover:border-cta-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cta/10 hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-primary-600 bg-slate-900">
                          <span className="text-sm font-medium">No Preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/10 text-white uppercase tracking-wider">
                          {product.category || 'Product'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative">
                      <div className="mb-4">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-cta-400 transition-colors line-clamp-1">{product.name}</h3>
                          <span className="font-bold text-lg text-emerald-400 whitespace-nowrap bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-primary-300 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between text-xs font-medium text-primary-400">
                          <span className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${product.availability && product.availability > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            {product.availability && product.availability > 0 ? 'In Stock' : 'Made to Order'}
                          </span>
                          <span>Instant Delivery</span>
                        </div>

                        <AddToCartButton
                          productId={product.id}
                          className="w-full bg-white text-slate-950 hover:bg-cta hover:text-white border-0 py-6 text-base font-bold transition-all duration-300 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
