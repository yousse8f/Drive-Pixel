'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Heart, DollarSign, Shield, BookOpen, MapPin, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CareersPage() {
    const positions = [
        {
            id: 1,
            title: 'Senior Full Stack Developer',
            type: 'Full-time',
            location: 'Remote',
            description: 'We\'re looking for an experienced Full Stack Developer to join our growing team.'
        },
        {
            id: 2,
            title: 'Cloud Architect',
            type: 'Full-time',
            location: 'Remote',
            description: 'Design and implement scalable cloud solutions for our enterprise clients.'
        },
        {
            id: 3,
            title: 'AI/ML Engineer',
            type: 'Full-time',
            location: 'Remote',
            description: 'Build intelligent systems and machine learning models that drive business value.'
        },
        {
            id: 4,
            title: 'UI/UX Designer',
            type: 'Full-time',
            location: 'Remote',
            description: 'Create beautiful and intuitive user experiences for our digital products.'
        },
        {
            id: 5,
            title: 'DevOps Engineer',
            type: 'Full-time',
            location: 'Remote',
            description: 'Manage and optimize our infrastructure and deployment pipelines.'
        },
        {
            id: 6,
            title: 'Internship - Web Development',
            type: 'Internship',
            location: 'Remote',
            description: 'Join our team as an intern and learn from experienced developers.'
        }
    ];

    const benefits = [
        { icon: DollarSign, title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
        { icon: Shield, title: 'Health Insurance', desc: 'Comprehensive health coverage for you and your family' },
        { icon: BookOpen, title: 'Learning & Development', desc: 'Continuous training and skill development' },
        { icon: MapPin, title: 'Flexible Work', desc: 'Remote and flexible working arrangements' },
        { icon: Users, title: 'Team Culture', desc: 'Collaborative and inclusive work environment' },
        { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Clear career progression paths' }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
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
                            Careers
                        </h1>
                        <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
                            Join our innovative team and help shape the future of digital solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-20 md:py-24 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            WHY JOIN US
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Why Join DrivePixel?
                            </h2>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <div key={index} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                                    <div className="flex flex-col items-center gap-4 flex-1">
                                        <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                            <IconComponent className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-xl font-bold text-midnight-blue">{benefit.title}</h3>
                                        <p className="text-sm text-muted-indigo leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-20 md:py-24 bg-off-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            OPEN POSITIONS
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Join Our Team
                            </h2>
                        </div>
                    </div>
                    
                    <div className="space-y-6">
                        {positions.map((position) => (
                            <div key={position.id} className="bg-light-beige rounded-xl p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform border border-muted-indigo/30">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 bg-sea-green rounded-full flex items-center justify-center flex-shrink-0">
                                                <Briefcase className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-midnight-blue mb-1">{position.title}</h3>
                                                <p className="text-sm text-muted-indigo">{position.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            <span className="inline-block bg-metallic-gold text-midnight-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {position.type}
                                            </span>
                                            <span className="inline-block bg-royal-purple text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {position.location}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="/contact">
                                        <Button size="lg" className="bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                                            Apply Now
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-24 bg-midnight-blue">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
                    <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
                        JOIN US
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">Don't See Your Role?</h2>
                    <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                        We're always looking for talented individuals. Send us your resume and let's explore opportunities together!
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                        <Link href="/contact">
                            <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                                Send Your Resume
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
