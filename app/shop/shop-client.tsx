'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, Filter } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#2D3A6B'}}>
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-[420px] bg-gradient-to-b from-[#1E3A8A] via-[#1E3A8A]/90 to-transparent pointer-events-none" />
        <div className="absolute -top-10 right-0 w-[480px] h-[480px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <section className="relative py-16 lg:py-24">
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-6 mb-16">
                <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                  SHOP
                </div>
                <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                    Shop the tools that power modern brands
                  </h1>
                </div>
                <div className="w-full rounded-none bg-white/20 border border-white/30 shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
                  <p className="text-sm text-white font-medium">
                    Curated templates, services, and integrations built to launch faster. Seamless checkout and instant delivery backed by our team.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2 justify-center">
                <a href="#catalogue">
                  <Button className="bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Browse collection
                  </Button>
                </a>
                <Link href="/cart">
                  <Button variant="outline" className="border-muted-indigo/30 bg-light-beige text-midnight-blue hover:bg-royal-blue/10 hover:text-royal-purple px-8 py-6 text-lg font-bold transition-all">
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
                  <div key={stat.label} className="rounded-lg border border-muted-indigo/30 bg-light-beige px-4 py-3 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                    <div className="text-xs uppercase tracking-wide text-royal-purple font-semibold">{stat.label}</div>
                    <div className="text-sm font-semibold text-midnight-blue">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="catalogue" className="relative pb-24">
          <div className="container-custom">

            {/* Filters Bar */}
            <div className="sticky top-4 z-40 bg-white backdrop-blur-xl border border-gray-200 p-4 mb-10 shadow-[0_12px_0_0_rgba(30,58,138,0.3)] flex flex-col lg:flex-row gap-4 justify-between items-center transition-all rounded-lg">
              <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${categoryFilter === 'all'
                    ? 'bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/30'
                    : 'bg-white text-[#1E3A8A] hover:bg-gray-100'
                    }`}
                >
                  All products
                </button>
                {categories.filter(c => c !== 'all').map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap capitalize ${categoryFilter === c
                      ? 'bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/30'
                      : 'bg-white text-[#1E3A8A] hover:bg-gray-100'
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <div className="w-full sm:w-72 relative group">
                  <Search className="h-4 w-4 text-[#1E3A8A]/60 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-[#1E3A8A] transition-colors" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-[#1E3A8A] placeholder:text-[#1E3A8A]/60 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all rounded-lg"
                  />
                </div>
                <div className="w-full sm:w-52">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-white border border-gray-300 py-2.5 px-4 text-sm text-[#1E3A8A] focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 transition-all rounded-lg"
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
                  ? 'bg-white text-[#1E3A8A] border-gray-200'
                  : 'bg-red-50 text-red-800 border-red-200'
                  }`}
              >
                <div className={`h-2 w-2 rounded-full ${statusMessage.type === 'success' ? 'bg-[#1E3A8A]' : 'bg-red-500'}`} />
                {statusMessage.text}
              </div>
            )}

            {productsLoading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-96 rounded-lg bg-white animate-pulse border border-gray-200" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-white/80">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 flex flex-col h-full shadow-[0_12px_0_0_rgba(30,58,138,0.3)] hover:-translate-y-2"
                  >
                    <div className="relative w-full h-56 overflow-hidden bg-white">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#1E3A8A]/60 bg-white">
                          <span className="text-sm font-semibold">No Preview</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-white text-[#1E3A8A] uppercase tracking-wider shadow-sm">
                          {product.category || 'Product'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <div className="mb-4 flex-1">
                        <h3 className="text-lg font-bold text-[#1E3A8A] mb-2 line-clamp-2 leading-tight group-hover:text-[#1E3A8A]/80 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[#1E3A8A]/70 text-sm line-clamp-2 leading-relaxed mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-[#1E3A8A]">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="flex items-center gap-1.5 text-[#1E3A8A]/70">
                            <div className={`h-2 w-2 rounded-full ${product.availability && product.availability > 0 ? 'bg-green-500' : 'bg-orange-500'}`} />
                            {product.availability && product.availability > 0 ? 'In stock' : 'Made to order'}
                          </span>
                          <span className="text-[#1E3A8A] font-semibold">Instant delivery</span>
                        </div>

                        <AddToCartButton
                          productId={product.id}
                          className="w-full bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl"
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
