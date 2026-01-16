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

            {/* Hero Section with Image Background */}
            <section
                className="relative text-white overflow-hidden pt-16 pb-12"
                style={{
                    backgroundImage: 'url(/images/Services.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '50vh',
                }}
            >
                <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
                
                {/* Content */}
                <div className="container-custom relative z-10 flex justify-center items-center" style={{ minHeight: '40vh' }}>
                    <div className="max-w-4xl w-full text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                            About Us
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
                            We're a team of innovators, developers, and strategists dedicated to transforming businesses through intelligent digital solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Overview */}
            <section className="py-20 md:py-24 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            WHO WE ARE
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                About DrivePixel
                            </h2>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-muted-indigo mb-6 leading-relaxed">
                                DrivePixel is a forward-thinking technology company specializing in custom software development, cloud solutions, and digital transformation. With over 11 years of experience, we've helped hundreds of businesses achieve their digital goals.
                            </p>
                            <p className="text-lg text-muted-indigo mb-8 leading-relaxed">
                                Our team combines technical expertise with strategic thinking to deliver solutions that not only meet today's needs but anticipate tomorrow's challenges.
                            </p>
                            <Link href="/contact">
                                <Button size="lg" className="bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                                    Get in Touch
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-light-beige rounded-xl p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sea-green rounded-full flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-midnight-blue mb-2">4000+ Projects</h3>
                                        <p className="text-sm text-muted-indigo">Successfully delivered across industries</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sea-green rounded-full flex items-center justify-center flex-shrink-0">
                                        <Globe className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-midnight-blue mb-2">23 Countries</h3>
                                        <p className="text-sm text-muted-indigo">Global presence with local expertise</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-sea-green rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users2 className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-midnight-blue mb-2">500+ Clients</h3>
                                        <p className="text-sm text-muted-indigo">From startups to enterprises</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 md:py-24 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            MISSION & VISION
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Our Purpose
                            </h2>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                            <div className="flex flex-col items-center gap-4 flex-1">
                                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                    <Target className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-midnight-blue">Our Mission</h3>
                                <p className="text-sm text-muted-indigo leading-relaxed">
                                    To empower businesses with innovative, scalable, and intelligent digital solutions that drive growth, efficiency, and competitive advantage in an ever-evolving technological landscape.
                                </p>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                            <div className="flex flex-col items-center gap-4 flex-1">
                                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                    <Rocket className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-midnight-blue">Our Vision</h3>
                                <p className="text-sm text-muted-indigo leading-relaxed">
                                    To be the trusted partner of choice for digital transformation, known for delivering exceptional solutions that combine cutting-edge technology with strategic business insight.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 md:py-24 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            OUR VALUES
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Core Values
                            </h2>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: CheckCircle2, title: 'Excellence', desc: 'We pursue excellence in everything we do' },
                            { icon: Shield, title: 'Integrity', desc: 'We build trust through transparency and honesty' },
                            { icon: Zap, title: 'Innovation', desc: 'We embrace new ideas and technologies' },
                            { icon: TrendingUp, title: 'Impact', desc: 'We create solutions that drive real business value' }
                        ].map((value, index) => {
                            const IconComponent = value.icon;
                            return (
                                <div key={index} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                                    <div className="flex flex-col items-center gap-4 flex-1">
                                        <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                            <IconComponent className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-xl font-bold text-midnight-blue">{value.title}</h3>
                                        <p className="text-sm text-muted-indigo leading-relaxed">{value.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-24 bg-midnight-blue">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
                        LET'S WORK TOGETHER
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">Ready to Work With Us?</h2>
                    <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                        Let's discuss how we can help transform your business with innovative digital solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                                Get a Free Consultation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
