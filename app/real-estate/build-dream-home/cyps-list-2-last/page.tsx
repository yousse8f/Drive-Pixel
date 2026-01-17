'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Search, Target, Home, Building, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function CypsList2LastPage() {
  const propertyCategories = [
    {
      icon: Home,
      title: 'Residential',
      description: 'Single-family homes, condos, townhouses, and apartments for every lifestyle.'
    },
    {
      icon: Building,
      title: 'Commercial',
      description: 'Office spaces, retail locations, and industrial facilities for businesses.'
    },
    {
      icon: Users,
      title: 'Multifamily',
      description: 'Duplexes, apartment buildings, and multi-unit investment properties.'
    },
    {
      icon: Target,
      title: 'Vacant Land',
      description: 'Lots, acreage, and development opportunities for builders and investors.'
    }
  ];

  const benefits = [
    {
      title: 'Personalized Property Selection',
      description: 'Curated listings based on your exact requirements and preferences.'
    },
    {
      title: 'Time-Efficient Search Process',
      description: 'Save time with targeted property matches that meet your specific criteria.'
    },
    {
      title: 'Access to Diverse Property Types',
      description: 'Comprehensive coverage across all real estate categories and markets.'
    }
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Analyze Preferences',
      description: 'We evaluate your investment goals, budget, and specific requirements.'
    },
    {
      step: '2',
      title: 'Curate Listings',
      description: 'Our team selects properties that perfectly match your criteria.'
    },
    {
      step: '3',
      title: 'Present Relevant Options',
      description: 'Receive only the most suitable properties for your consideration.'
    },
    {
      step: '4',
      title: 'Facilitate Transactions',
      description: 'Expert support through negotiations and closing processes.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/cyps-list-2-last" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">CYPS LIST 2 LAST</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Simplified property searches with curated listings based on your exact requirements
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              CYPS LIST simplifies property searches by delivering curated listings based on your exact requirements. We analyze preferences, investment goals, and budgets to present only relevant properties across residential, commercial, multifamily, and vacant land categories.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              HOW CYPS LIST WORKS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Intelligent Property Matching
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {howItWorks.map((step) => (
              <div key={step.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sea-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-midnight-blue mb-4 mt-2">{step.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY CATEGORIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {propertyCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{category.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{category.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SMART SEARCH TECHNOLOGY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Advanced Matching Algorithm</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our proprietary CYPS technology analyzes multiple data points including location preferences, budget constraints, property features, and investment goals to deliver highly accurate property matches.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  This intelligent approach eliminates irrelevant listings and focuses your attention on properties that truly matter to your specific needs.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PERSONALIZED SERVICE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Expert Guidance</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Beyond technology, our team of real estate experts provides personalized consultation to refine your search criteria and ensure the best possible matches for your unique situation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT FOCUS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">ROI Analysis</h4>
                  <p className="text-sm text-muted-indigo">Detailed return on investment projections for each property.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Market Trends</h4>
                  <p className="text-sm text-muted-indigo">Current market analysis and future growth potential.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Risk Assessment</h4>
                  <p className="text-sm text-muted-indigo">Comprehensive evaluation of potential investment risks.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Portfolio Diversification</h4>
                  <p className="text-sm text-muted-indigo">Strategic recommendations for balanced property portfolios.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            START WITH CYPS LIST
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
                Get Started
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
