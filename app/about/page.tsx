'use client';

import Link from 'next/link';
import { ArrowRight, Users, Target, Lightbulb, Award, Zap, Globe, Users2, Rocket, CheckCircle2, Code2, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">About DrivePixel</h1>
                    <p className="text-xl text-white/90 max-w-3xl">
                        We're a team of innovators, developers, and strategists dedicated to transforming businesses through intelligent digital solutions.
                    </p>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-[#1a1f3a] mb-6">Who We Are</h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                DrivePixel is a forward-thinking technology company specializing in custom software development, cloud solutions, and digital transformation. With over 11 years of experience, we've helped hundreds of businesses achieve their digital goals.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Our team combines technical expertise with strategic thinking to deliver solutions that not only meet today's needs but anticipate tomorrow's challenges.
                            </p>
                            <Link href="/contact">
                                <Button className="bg-[#10b981] hover:bg-[#059669] text-white">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-[#10b981]/10 rounded-xl p-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="h-6 w-6 text-[#1a1f3a]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1f3a] mb-2">4000+ Projects</h3>
                                        <p className="text-gray-600">Successfully delivered across industries</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                                        <Globe className="h-6 w-6 text-[#1a1f3a]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1f3a] mb-2">23 Countries</h3>
                                        <p className="text-gray-600">Global presence with local expertise</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users2 className="h-6 w-6 text-[#1a1f3a]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1a1f3a] mb-2">500+ Clients</h3>
                                        <p className="text-gray-600">From startups to enterprises</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-[#10b981] rounded-full flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-[#1a1f3a]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1a1f3a] mb-4">Our Mission</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To empower businesses with innovative, scalable, and intelligent digital solutions that drive growth, efficiency, and competitive advantage in an ever-evolving technological landscape.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 bg-[#10b981] rounded-full flex items-center justify-center mb-6">
                                <Rocket className="h-8 w-8 text-[#1a1f3a]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1a1f3a] mb-4">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To be the trusted partner of choice for digital transformation, known for delivering exceptional solutions that combine cutting-edge technology with strategic business insight.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-[#1a1f3a] mb-12 text-center">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: CheckCircle2, title: 'Excellence', desc: 'We pursue excellence in everything we do' },
                            { icon: Shield, title: 'Integrity', desc: 'We build trust through transparency and honesty' },
                            { icon: Zap, title: 'Innovation', desc: 'We embrace new ideas and technologies' },
                            { icon: TrendingUp, title: 'Impact', desc: 'We create solutions that drive real business value' }
                        ].map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <div key={index} className="bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all hover:scale-105">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-14 h-14 bg-[#10b981] rounded-full flex items-center justify-center">
                                            <IconComponent className="h-7 w-7 text-[#1a1f3a]" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">{value.title}</h3>
                                    <p className="text-gray-700 text-sm">{value.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold mb-6 text-[#1a1f3a]">Ready to Work With Us?</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help transform your business with innovative digital solutions.
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold">
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
