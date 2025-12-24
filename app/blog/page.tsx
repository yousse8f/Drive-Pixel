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
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => {
                            const isActive = category === 'All';
                            return (
                                <button
                                    key={category}
                                    className={[
                                        'px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 border',
                                        isActive
                                            ? 'bg-[#10b981] text-[#041028] border-[#10b981] shadow-lg'
                                            : 'bg-[#050b1d] text-[#10b981] border-[#10b981]/40 hover:border-[#10b981] hover:text-white hover:shadow-md'
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
            <section className="py-16 bg-white">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-8">Loading blog posts...</div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200">
                                    <div className="bg-gradient-to-br from-[#10b981]/10 to-gray-50 p-8 flex items-center justify-center min-h-32">
                                        <div className="text-6xl">{post.image}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3">
                                            <span className="inline-block bg-[#10b981] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1a1f3a] mb-3 line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 pb-6 border-b border-gray-200">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-[#10b981]" />
                                                <span className="font-medium">{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4 text-[#10b981]" />
                                                <span className="font-medium">{post.author}</span>
                                            </div>
                                        </div>
                                        <Link href="/blog">
                                            <Button className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold transition-all duration-300 hover:shadow-lg py-2.5">
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No blog posts available</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-[#1a1f3a] to-[#1a1f3a] text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                    <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                        Get the latest insights, tutorials, and case studies delivered to your inbox every week.
                    </p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#10b981] font-medium"
                        />
                        <Button size="lg" className="bg-[#10b981] hover:bg-[#059669] text-[#041028] font-bold transition-all duration-300 hover:shadow-lg">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
