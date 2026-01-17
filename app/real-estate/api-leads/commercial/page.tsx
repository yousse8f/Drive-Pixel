'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, TrendingUp, Target, Users, BarChart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function CommercialPage() {
  const coreFeatures = [
    {
      icon: Target,
      title: 'APS-LEADS-DFLX for Business Inquiries',
      description: 'Connect with qualified buyers or lessees through our advanced lead generation platform.'
    },
    {
      icon: Globe,
      title: 'Business-Centric Marketing Strategies',
      description: 'Leverage networks and marketing techniques for maximum visibility.'
    },
    {
      icon: BarChart,
      title: 'In-Depth Market Knowledge',
      description: 'Local and regional market insights for competitive pricing and opportunities.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Office Buildings',
      description: 'Professional office spaces for businesses and corporations.'
    },
    {
      title: 'Retail Spaces',
      description: 'Commercial properties for retail businesses and shops.'
    },
    {
      title: 'Industrial Facilities',
      description: 'Warehouses, manufacturing plants, and distribution centers.'
    },
    {
      title: 'Mixed-Use Properties',
      description: 'Buildings combining commercial and residential spaces.'
    }
  ];

  const services = [
    {
      title: 'Market Analysis',
      description: 'Comprehensive commercial market research and insights.'
    },
    {
      title: 'Lead Generation',
      description: 'Targeted business leads through APS-LEADS-DFLX platform.'
    },
    {
      title: 'Property Valuation',
      description: 'Professional commercial property assessment and pricing.'
    },
    {
      title: 'Marketing Campaigns',
      description: 'Strategic business-focused marketing initiatives.'
    }
  ];

  const benefits = [
    {
      title: 'Qualified Business Leads',
      description: 'Pre-screened commercial buyers and tenants.'
    },
    {
      title: 'Market Expertise',
      description: 'Deep understanding of commercial real estate trends.'
    },
    {
      title: 'Strategic Marketing',
      description: 'Business-focused promotional strategies.'
    },
    {
      title: 'Optimal Pricing',
      description: 'Data-driven pricing for maximum returns.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/api-leads/commercial" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">COMMERCIAL</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Expert services for selling, leasing, or attracting tenants to commercial properties
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Expert services for selling, leasing, or attracting tenants to commercial properties, using targeted strategies for optimal exposure. Our specialized commercial real estate services ensure your property reaches the right business audience.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CORE FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Advanced Commercial Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{feature.description}</p>
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
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SPECIALIZED SERVICES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <div key={service.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{service.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              APS-LEADS-DFLX INTEGRATION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Business Lead Generation</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our APS-LEADS-DFLX platform connects commercial property owners with qualified buyers and lessees. This advanced system targets business inquiries specifically, ensuring you receive leads from serious commercial real estate prospects.
                </p>
              </div>
            </div>
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
                  <Globe className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Business-Centric Marketing</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  We leverage extensive networks and specialized marketing techniques to maximize your commercial property's visibility. Our business-focused approach ensures your property reaches the right audience of business owners, investors, and corporate tenants.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKET INTELLIGENCE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <BarChart className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">In-Depth Market Knowledge</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our team provides local and regional market insights for competitive pricing and opportunities. This comprehensive market intelligence helps you make informed decisions and position your commercial property for optimal results.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CLIENT ADVANTAGES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
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
                  Our team provides comprehensive support throughout the commercial real estate transaction process. From initial lead generation through closing, we ensure smooth, professional handling of all aspects of your commercial property sale or lease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            COMMERCIAL PROPERTY SUPPORT
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Optimize Your Commercial Investment</h2>
          
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
