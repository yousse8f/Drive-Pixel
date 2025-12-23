'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

export default function PortfolioPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const response = await publicApiClient.getPortfolio();
            if (response.success && response.data) {
                setProjects(response.data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    description: item.description,
                    techStack: item.tech_stack || [],
                    results: item.results,
                })));
            }
        } catch (error) {
            console.error('Failed to load portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'SaaS', 'Enterprise', 'Retail', 'Healthcare'];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 text-white">
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: 'url(/images/contact.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
                </div>
                <div className="container-custom relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
                    <p className="text-xl text-white/90 max-w-3xl">
                        Explore some of the digital solutions we've built for clients across different industries.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === 'All' ? 'default' : 'outline'}
                                className={category === 'All' ? 'bg-[#10b981] hover:bg-[#059669]' : ''}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-8">Loading portfolio...</div>
                    ) : projects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {projects.map((project) => (
                                <div 
                                    key={project.id} 
                                    className="group relative bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary-500/30"
                                >
                                    <div className="relative z-10 p-8 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#1a1f3a] mb-2 group-hover:text-primary-700 transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                                <span className="inline-block bg-[#10b981]/10 text-primary-700 group-hover:bg-primary-200 px-3 py-1 rounded-full text-sm font-semibold transition-colors duration-300">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                                            {project.description}
                                        </p>
                                        <div className="mt-auto">
                                            <div className="mb-4">
                                                <p className="text-sm font-semibold text-[#1a1f3a] mb-2">Tech Stack:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.techStack.map((tech: string) => (
                                                        <span 
                                                            key={tech} 
                                                            className="bg-white px-3 py-1 rounded text-sm text-gray-700 border border-gray-200 group-hover:border-primary-200 group-hover:bg-primary-50 group-hover:text-primary-700 transition-all duration-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-primary-50 group-hover:bg-[#10b981]/10 rounded-lg p-4 mb-4 transition-colors duration-300">
                                                <p className="text-sm text-primary-700">Key Result</p>
                                                <p className="text-lg font-bold text-[#10b981] group-hover:text-primary-700">
                                                    {project.results}
                                                </p>
                                            </div>
                                            <Link href="/contact">
                                                <Button 
                                                    variant="outline" 
                                                    className="w-full border-primary-500 text-[#10b981] hover:bg-primary-50 hover:border-primary-600 hover:text-primary-700 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5"
                                                >
                                                    View Details
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {/* Hover effect elements */}
                                    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400/10 via-primary-200/10 to-primary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">No portfolio items available</div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white text-[#1a1f3a]">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-6 text-[#1a1f3a]">Ready to Start Your Project?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can bring your vision to life with our proven expertise.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" variant="secondary">
                            Get a Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
