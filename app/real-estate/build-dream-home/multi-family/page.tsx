'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, Users, TrendingUp, Target, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function MultiFamilyPage() {
  const services = [
    {
      icon: Search,
      title: 'Property Sourcing',
      description: 'We identify and acquire high-potential multi-family properties in prime locations using market expertise and strong industry connections.'
    },
    {
      icon: TrendingUp,
      title: 'Investment Strategy',
      description: 'Our tailored guidance focuses on maximizing returns through renovation planning, tenant management strategies, and market positioning.'
    },
    {
      icon: Building,
      title: 'Development Support',
      description: 'Our Build to Suit program supports development from concept to completion with land acquisition assistance and project management.'
    }
  ];

  const strategies = [
    {
      title: 'Renovation Planning',
      description: 'Strategic improvements to increase property value and appeal.'
    },
    {
      title: 'Tenant Management',
      description: 'Effective strategies to reduce vacancies and maintain high occupancy.'
    },
    {
      title: 'Market Positioning',
      description: 'Competitive rental rate strategies for maximum returns.'
    }
  ];

  const developmentSupport = [
    {
      title: 'Land Acquisition Assistance',
      description: 'Expert guidance in identifying and securing optimal development sites.'
    },
    {
      title: 'Project Management',
      description: 'Comprehensive oversight from planning through construction completion.'
    },
    {
      title: 'Regulatory and Zoning Guidance',
      description: 'Expert navigation of complex zoning requirements and regulations.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/multi-family" fallbackContent={
        <section className="relative py-32 text-white">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">MULTI FAMILY</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Build to Suit multi-family properties with multiple income streams and expert development support
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty specializes in the acquisition, sale, and development of multi-family properties through our Build to Suit program. Multi-family units such as duplexes, townhomes, and apartment buildings offer multiple income streams from a single property.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT WE OFFER
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Multi-Family Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{service.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT STRATEGY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Maximizing Returns</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our tailored guidance focuses on maximizing returns through strategic planning and expert execution.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {strategies.map((strategy) => (
              <div key={strategy.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{strategy.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{strategy.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DEVELOPMENT SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Building className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Build to Suit Program</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our Build to Suit program supports development from concept to completion, providing comprehensive support throughout the entire process.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {developmentSupport.map((support) => (
              <div key={support.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{support.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{support.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MULTI-FAMILY ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Multiple Income Streams</h4>
                  <p className="text-sm text-muted-indigo">Diversified revenue from multiple units in a single property.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Economies of Scale</h4>
                  <p className="text-sm text-muted-indigo">Lower per-unit costs and operational efficiencies.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Risk Mitigation</h4>
                  <p className="text-sm text-muted-indigo">Reduced vacancy impact through multiple tenants.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Appreciation Potential</h4>
                  <p className="text-sm text-muted-indigo">Strong historical appreciation for multi-family properties.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY TYPES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Duplexes</h4>
                  <p className="text-sm text-muted-indigo">Two-family homes with separate living spaces.</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Townhomes</h4>
                  <p className="text-sm text-muted-indigo">Multi-level attached housing units.</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Apartment Buildings</h4>
                  <p className="text-sm text-muted-indigo">Large-scale residential rental properties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            PARTNERSHIP OPPORTUNITIES
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Multi-Family Success</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Partner With Us
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
