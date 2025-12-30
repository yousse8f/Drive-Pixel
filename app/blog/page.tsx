'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const response = await publicApiClient.getBlogPosts();
            if (response.success && response.data) {
                setPosts(response.data);
            }
        } catch (error) {
            console.error('Failed to load blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Featured Posts', 'Tutorials', 'Case Studies', 'Industry Insights'];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 text-white">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                style={{
                    backgroundImage: 'url(/images/our-blog.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute inset-0 bg-[#1a1f3a]/80"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/40 to-[#0f172a]/80"></div>
                        </div>
                <div className="container-custom relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Blog</h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        Insights, tutorials, and case studies from our team of experts.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-10 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => {
                            const isActive = category === 'All';
                            return (
                                <button
                                    key={category}
                                    className={[
                                        'px-4 py-2 rounded-none text-sm font-semibold transition-all duration-200 border',
                                        isActive
                                            ? 'bg-[#c45c4b] text-white border-[#c45c4b] shadow-lg shadow-[#c45c4b]/20'
                                            : 'bg-[#faeef2] text-[#1d1a3a] border-[#c3868b] hover:bg-[#ffe1e1] hover:text-[#c45c4b]'
                                    ].join(' ')}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 bg-[#faeef2]">
                <div className="max-w-6xl mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-8 text-[#4f2c33]">Loading blog posts...</div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_-20px_rgba(195,134,139,0.4)] hover:-translate-y-1 border border-[#c3868b] shadow-[0_8px_30px_-12px_rgba(195,134,139,0.3)]">
                                    <div className="bg-gradient-to-br from-[#faeef2] to-[#ffe1e1] p-8 flex items-center justify-center min-h-32">
                                        <div className="text-6xl">{post.image}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3">
                                            <span className="inline-block bg-[#c45c4b] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1d1a3a] mb-3 line-clamp-2 hover:text-[#c45c4b] transition-colors">{post.title}</h3>
                                        <p className="text-[#4f2c33] mb-5 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-xs text-[#4f2c33] mb-6 pb-6 border-b border-[#c3868b]">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-[#c45c4b]" />
                                                <span className="font-medium">{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4 text-[#c45c4b]" />
                                                <span className="font-medium">{post.author}</span>
                                            </div>
                                        </div>
                                        <Link href="/blog">
                                            <Button className="w-full bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-bold transition-all duration-300 hover:shadow-lg py-2.5">
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-[#4f2c33]">No blog posts available</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#080f24] text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="space-y-4 mb-10">
                        <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16]">
                            STAY UPDATED
                        </div>
                        <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-black text-white">
                            Subscribe to Our Newsletter
                        </h2>
                        <div className="w-full rounded-none bg-[#8c75b6] border-2 border-white shadow-[0_2px_0_rgba(255,255,255,0.25)] py-1 text-center px-1">
                            <p className="text-sm text-white font-medium">
                                Get the latest insights, tutorials, and case studies delivered to your inbox every week.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#c45c4b] font-medium border border-[#c3868b]"
                        />
                        <Button size="lg" className="bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-bold transition-all duration-300 hover:shadow-lg">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
