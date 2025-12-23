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
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
                    <p className="text-xl text-white/90 max-w-3xl">
                        We're hiring talented individuals who are passionate about technology and innovation.
                    </p>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-[#1a1f3a] mb-12 text-center">Why Join DrivePixel?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <div key={index} className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 bg-[#10b981] rounded-full flex items-center justify-center">
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-4xl font-bold text-[#1a1f3a] mb-12 text-center">Open Positions</h2>
                    <div className="space-y-4">
                        {positions.map((position) => (
                            <div key={position.id} className="bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4 mb-3">
                                            <div className="w-12 h-12 bg-[#10b981] rounded-full flex items-center justify-center flex-shrink-0">
                                                <Briefcase className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-[#1a1f3a] mb-1">{position.title}</h3>
                                                <p className="text-gray-600 text-sm">{position.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            <span className="inline-block bg-[#10b981] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {position.type}
                                            </span>
                                            <span className="inline-block bg-[#10b981]/10 text-[#1a1f3a] px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                                                <MapPin className="h-3 w-3" /> {position.location}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="/contact">
                                        <Button className="bg-[#10b981] hover:bg-[#059669] text-white font-bold transition-all duration-300 hover:shadow-lg px-8 py-2.5 whitespace-nowrap">
                                            Apply Now
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#1a1f3a] text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Don't See Your Role?</h2>
                    <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        We're always looking for talented individuals. Send us your resume and let's explore opportunities together!
                    </p>
                    <Link href="/contact">
                        <Button size="lg" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold transition-all duration-300 hover:shadow-lg">
                            Send Your Resume
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
