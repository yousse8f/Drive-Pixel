'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, TrendingUp, Target, Users, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function MultiFamilyPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Investor Network',
      description: 'Targeted Connections: We connect you with a robust network of local and international investors actively seeking multifamily assets. Our extensive reach increases your chances of finding the right buyer quickly.'
    },
    {
      icon: DollarSign,
      title: 'Property Valuation Services',
      description: 'Competitive Pricing: Our team conducts thorough market analyses to help you set a competitive and accurate listing price. This strategic approach ensures that your property attracts serious offers while maximizing its value.'
    },
    {
      icon: Target,
      title: 'Marketing and Advertising Support',
      description: 'Advanced Techniques: We utilize innovative property marketing strategies, including virtual tours, 3D walkthroughs, and high-visibility online listings. This ensures that your property effectively reaches its target audience and stands out in a competitive market.'
    },
    {
      icon: Shield,
      title: 'Tenant Information Inclusion',
      description: 'Comprehensive Listings: Our listing services include detailed tenant data, potential rental income, and maintenance history. Providing this information helps potential buyers make informed decisions and enhances the attractiveness of your property.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Duplexes',
      description: 'Two-family homes with separate entrances.'
    },
    {
      title: 'Triplexes',
      description: 'Three-family homes with multiple rental units.'
    },
    {
      title: 'Apartment Buildings',
      description: 'Multi-unit residential complexes.'
    },
    {
      'title': 'Townhouse Complexes',
      description: 'Multiple connected townhouse units.'
    }
  ];

  const advantages = [
    {
      title: 'Long-Term Income',
      description: 'Stable rental income from multiple units.'
    },
    {
      'title': 'Economies of Scale',
      description: 'Lower per-unit costs and management efficiency.'
    },
    {
      title: 'Diversified Risk',
      description: 'Multiple tenants reduce vacancy impact.'
    },
    {
      title: 'Appreciation Potential',
      description: 'Strong historical value growth.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <div className="relative py-32 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/Real%20Estate.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">MULTIFAMILY</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Specialized multifamily property listings for maximum returns and investor exposure
          </p>
        </div>
      </div>

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty specializes in listing multifamily properties, providing comprehensive solutions for property owners looking to maximize their returns. Whether you own duplexes, triplexes, or apartment buildings, multifamily properties offer excellent opportunities for long-term rental income.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY BENEFITS OF LISTING MULTIFAMILY PROPERTIES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Maximizing Investment Returns
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{benefit.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {propertyTypes.map((type) => (
              <div key={type.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{type.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-gendrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT ADVANTAGES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{advantage.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKETING STRATEGIES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Innovative Property Marketing</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  We utilize innovative property marketing strategies, including virtual tours, 3D walkthroughs, and high-visibility online listings. This ensures that your property effectively reaches its target audience and stands out in a competitive market.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TRANSACTION SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Building className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Expert Transaction Management</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our experienced team handles negotiations, paperwork, and coordination with all parties involved in the transaction process. We ensure compliance with all legal requirements and facilitate smooth closings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            LIST YOUR MULTIFAMILY PROPERTY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Maximize Your Investment Returns</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                List Property
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
