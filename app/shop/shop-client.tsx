'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
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
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'availability'>('featured');

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
    const filtered = products.filter((p) => {
      const matchCategory = categoryFilter === 'all' || (p.category || '').toLowerCase() === categoryFilter;
      const matchSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'availability') return (b.availability || 0) - (a.availability || 0);
      return 0; // featured: keep API order
    });

    return sorted;
  }, [products, categoryFilter, searchTerm, sortBy]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => (p.category || 'uncategorized').toLowerCase())));
    return ['all', ...unique];
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <TopBar />
      <Navbar darkBg={false} />

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-[420px] bg-gradient-to-b from-primary-50 via-white to-transparent pointer-events-none" />
        <div className="absolute -top-10 right-0 w-[480px] h-[480px] bg-cta-500/10 rounded-full blur-3xl pointer-events-none" />

        <section className="relative py-16 lg:py-24">
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-primary-100 text-sm text-primary-700">
                  <ShoppingCart className="h-4 w-4 text-cta-500" />
                  <span className="font-medium tracking-wide">Premium Digital Assets</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-slate-900">
                    Shop the tools that power modern brands
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Curated templates, services, and integrations built to launch faster. Seamless checkout and instant delivery backed by our team.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a href="#catalogue">
                    <Button className="bg-cta hover:bg-cta-600 text-white px-7 py-5 rounded-xl text-base font-semibold shadow-lg shadow-cta/20 transition-all hover:translate-y-[-2px] active:translate-y-0">
                      Browse collection
                    </Button>
                  </a>
                  <Link href="/cart">
                    <Button variant="outline" className="border-primary-200 bg-white text-slate-900 hover:bg-primary-50 px-7 py-5 rounded-xl text-base font-semibold transition-all">
                      View cart ({count})
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                  {[
                    { label: 'Instant delivery', value: 'Secure checkout' },
                    { label: 'Category filters', value: 'Smart search' },
                    { label: 'Cart ready', value: 'Add in one click' },
                    { label: 'Responsive', value: 'Mobile-first' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white border border-primary-100 px-4 py-3 shadow-sm">
                      <div className="text-xs uppercase tracking-wide text-primary-500 font-semibold">{stat.label}</div>
                      <div className="text-sm font-semibold text-slate-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/60 via-cta-50/60 to-white rounded-3xl blur-2xl" />
                <div className="relative p-6 rounded-3xl bg-white shadow-xl border border-primary-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center">
                      <Filter className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Effortless discovery</p>
                      <h3 className="text-lg font-semibold text-slate-900">Filters, search, and categories</h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">
                    Refine by category, search by keywords, and sort by price or availability. The catalogue is built to feel like the rest of the site—clean, bright, and responsive.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100">Services</span>
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100">Design</span>
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100">Software</span>
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100">Marketing</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Cart overview</p>
                      <p className="text-sm font-semibold text-slate-900">Items in cart: {count}</p>
                    </div>
                    <ShoppingCart className="h-6 w-6 text-cta-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogue" className="relative pb-24">
          <div className="container-custom">

            {/* Filters Bar */}
            <div className="sticky top-4 z-40 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 mb-10 shadow-lg shadow-slate-200/50 flex flex-col lg:flex-row gap-4 justify-between items-center transition-all">
              <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${categoryFilter === 'all'
                    ? 'bg-cta text-white shadow-lg shadow-cta/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  All products
                </button>
                {categories.filter(c => c !== 'all').map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap capitalize ${categoryFilter === c
                      ? 'bg-cta text-white shadow-lg shadow-cta/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="w-full sm:w-72 relative group">
                  <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cta-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cta-500 focus:ring-2 focus:ring-cta-100 transition-all"
                  />
                </div>
                <div className="w-full sm:w-52">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:border-cta-500 focus:ring-2 focus:ring-cta-100 transition-all"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="availability">Availability</option>
                  </select>
                </div>
              </div>
            </div>

            {statusMessage && (
              <div
                className={`mb-8 rounded-xl px-4 py-3 border flex items-center gap-3 ${statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
                  }`}
              >
                <div className={`h-2 w-2 rounded-full ${statusMessage.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                {statusMessage.text}
              </div>
            )}

            {productsLoading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-96 rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-cta-300 transition-all duration-500 hover:shadow-xl hover:shadow-cta/10 hover:-translate-y-2 flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100">
                          <span className="text-sm font-medium">No Preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-70" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 uppercase tracking-wider">
                          {product.category || 'Product'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 relative">
                      <div className="mb-4">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-cta-500 transition-colors line-clamp-1">{product.name}</h3>
                          <span className="font-bold text-lg text-emerald-600 whitespace-nowrap bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 space-y-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${product.availability && product.availability > 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {product.availability && product.availability > 0 ? 'In stock' : 'Made to order'}
                          </span>
                          <span className="text-cta-600 font-semibold">Instant delivery</span>
                        </div>

                        <AddToCartButton
                          productId={product.id}
                          className="w-full bg-cta text-white hover:bg-cta-600 border-0 py-3.5 text-base font-bold transition-all duration-300 rounded-xl shadow-lg shadow-cta/20"
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
