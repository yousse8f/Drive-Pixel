'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function BlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState('');
    const [subscribeError, setSubscribeError] = useState('');

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

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setSubscribeError('Please enter a valid email address');
            return;
        }
        
        setSubscribing(true);
        setSubscribeError('');
        setSubscribeMessage('');
        
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    source: 'blog-page'
                }),
            });
            
            if (response.ok) {
                setSubscribeMessage('Thank you for subscribing! Check your email for confirmation.');
                setEmail('');
                setTimeout(() => setSubscribeMessage(''), 5000);
            } else {
                setSubscribeError('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setSubscribeError('An error occurred. Please try again later.');
        } finally {
            setSubscribing(false);
        }
    };

    const categories = ['All', 'Featured Posts', 'Tutorials', 'Case Studies', 'Industry Insights'];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section - CMS Controlled */}
            <DynamicPageContent pagePath="/blog" fallbackContent={
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
            } />

            {/* Filter Section */}
            <section className="py-16 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category: string) => {
                            const isActive = category === 'All';
                            return (
                                <button
                                    key={category}
                                    className={[
                                        'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border',
                                        isActive
                                            ? 'bg-royal-purple text-white border-royal-purple shadow-lg shadow-royal-purple/20'
                                            : 'bg-white text-midnight-blue border-muted-indigo/30 hover:bg-royal-blue/10 hover:text-royal-purple'
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
            <section className="py-16 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-8 text-muted-indigo">Loading blog posts...</div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-light-beige rounded-lg overflow-hidden transition-all duration-300 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2">
                                    <div className="bg-gradient-to-br from-off-white to-light-beige p-8 flex items-center justify-center min-h-32">
                                        <div className="text-6xl">{post.image}</div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-3">
                                            <span className="inline-block bg-royal-purple text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {post.category}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-midnight-blue mb-3 line-clamp-2 hover:text-royal-purple transition-colors">{post.title}</h3>
                                        <p className="text-muted-indigo mb-5 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center gap-4 text-xs text-muted-indigo mb-6 pb-6 border-b border-muted-indigo/30">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-royal-purple" />
                                                <span className="font-medium">{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4 text-royal-purple" />
                                                <span className="font-medium">{post.author}</span>
                                            </div>
                                        </div>
                                        <Link href="/blog">
                                            <Button className="w-full bg-metallic-gold hover:bg-amber text-midnight-blue font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 py-2.5">
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-indigo">No blog posts available</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-midnight-blue text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="space-y-4 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            STAY UPDATED
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-0 text-center">
                            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-black text-white">
                                Subscribe to Our Newsletter
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-blue border-2 border-light-beige shadow-[0_2px_0_rgba(255,255,255,0.35)] py-0 text-center px-2">
                            <p className="text-sm text-white font-medium">
                                Get the latest insights, tutorials, and case studies delivered to your inbox every week.
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                        {subscribeError && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                                {subscribeError}
                            </div>
                        )}
                        
                        {subscribeMessage && (
                            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                                {subscribeMessage}
                            </div>
                        )}
                        
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com" 
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-royal-purple font-medium border border-muted-indigo/30"
                                required
                            />
                            <Button 
                                type="submit"
                                disabled={subscribing}
                                size="lg" 
                                className="bg-metallic-gold hover:bg-amber text-midnight-blue font-bold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {subscribing ? 'Subscribing...' : 'Subscribe'}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}
