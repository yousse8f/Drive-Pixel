'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, Building, Users, TrendingUp, Globe, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function OurListingsPage() {
  const propertyTypes = [
    {
      icon: Home,
      title: 'Residential Properties',
      description: 'Single-family homes, condos, townhouses, and apartments for every lifestyle.'
    },
    {
      icon: Building,
      title: 'Commercial Properties',
      description: 'Office spaces, retail locations, and industrial facilities for businesses.'
    },
    {
      icon: Users,
      title: 'Multifamily Properties',
      description: 'Duplexes, apartment buildings, and multi-unit investment properties.'
    },
    {
      icon: Globe,
      title: 'Land Listings',
      description: 'Vacant lots, acreage, and development opportunities for builders and investors.'
    }
  ];

  const advantages = [
    {
      title: 'Professionally Vetted Properties',
      description: 'Every listing undergoes thorough evaluation to ensure quality and accuracy.'
    },
    {
      title: 'Detailed Descriptions and Visuals',
      description: 'Comprehensive information with high-quality images and virtual tours.'
    },
    {
      title: 'Advanced Search Tools',
      description: 'Powerful filters and search capabilities to find your perfect property.'
    },
    {
      title: 'Global Reach',
      description: 'International exposure for properties and access to worldwide buyers.'
    }
  ];

  const differentiators = [
    {
      title: 'Client-Centered Approach',
      description: 'We prioritize your needs and provide personalized service throughout your property journey.'
    },
    {
      title: 'Innovative Technology',
      description: 'Cutting-edge tools and platforms that enhance the property search and transaction experience.'
    },
    {
      title: 'Experienced Agents',
      description: 'Knowledgeable professionals who understand local markets and industry trends.'
    },
    {
      title: 'Market Insights',
      description: 'Valuable data and analysis to help you make informed real estate decisions.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/why-onedrive/our-listings" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">OUR LISTINGS</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Wide range of residential, commercial, multifamily, and land properties
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty offers a wide range of residential, commercial, multifamily, and land listings. Our comprehensive portfolio ensures that clients find the perfect property to meet their needs and investment goals.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY TYPES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Diverse Property Portfolio
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{type.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{type.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY CHOOSE OUR LISTINGS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{advantage.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT SETS US APART
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {differentiators.map((differentiator) => (
              <div key={differentiator.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{differentiator.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{differentiator.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR COMMITMENT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Excellence in Real Estate</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our listings are curated with precision and care, ensuring that each property meets our high standards of quality and value. We strive to make the property search and purchase process as seamless and rewarding as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EXPLORE OUR LISTINGS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Find Your Perfect Property</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                View Listings
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
