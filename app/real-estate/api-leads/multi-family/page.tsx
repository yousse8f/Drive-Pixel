'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, TrendingUp, Target, Users, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function MultiFamilyPage() {
  const keyFeatures = [
    {
      icon: Target,
      title: 'Targeted Marketing for Investors',
      description: 'APS-LEADS-DFLX connects owners with investors specifically interested in multifamily units.'
    },
    {
      icon: Users,
      title: 'Comprehensive Property Management Solutions',
      description: 'Covers tenant sourcing, leasing, maintenance, and financial tracking.'
    },
    {
      icon: DollarSign,
      title: 'Profit Optimization Through Strategic Planning',
      description: 'Rent analysis and financial strategies to maximize revenue.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Duplex Properties',
      description: 'Two-family homes with separate entrances.'
    },
    {
      title: 'Apartment Buildings',
      description: 'Multi-unit residential complexes.'
    },
    {
      title: 'Townhouse Communities',
      description: 'Connected housing units with shared amenities.'
    },
    {
      title: 'Mixed-Use Buildings',
      description: 'Properties combining residential and commercial spaces.'
    }
  ];

  const benefits = [
    {
      title: 'Higher Returns',
      description: 'Multifamily properties offer superior investment returns.'
    },
    {
      title: 'Long-Term Stability',
      description: 'Consistent rental income and tenant retention.'
    },
    {
      title: 'Economies of Scale',
      description: 'Lower per-unit management and maintenance costs.'
    },
    {
      title: 'Risk Diversification',
      description: 'Multiple tenants reduce vacancy impact.'
    }
  ];

  const managementServices = [
    {
      title: 'Tenant Screening',
      description: 'Thorough background checks and qualification processes.'
    },
    {
      title: 'Lease Management',
      description: 'Professional lease agreements and renewal strategies.'
    },
    {
      title: 'Maintenance Coordination',
      description: 'Efficient handling of repairs and property upkeep.'
    },
    {
      title: 'Financial Reporting',
      description: 'Detailed income and expense tracking for owners.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/api-leads/multi-family" fallbackContent={
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
              Multifamily properties offer opportunities for higher returns and long-term stability
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Multifamily properties offer opportunities for higher returns and long-term stability. One Drive Realty provides services from targeted marketing to full property management, ensuring your multifamily investment achieves its maximum potential.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Multifamily Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {keyFeatures.map((feature) => {
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
              INVESTMENT BENEFITS
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
              APS-LEADS-DFLX INTEGRATION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Targeted Investor Connections</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our APS-LEADS-DFLX platform connects multifamily property owners with investors specifically interested in multifamily units. This targeted approach ensures higher conversion rates and more efficient transactions, saving you time and maximizing your investment returns.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MANAGEMENT SERVICES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {managementServices.map((service) => (
              <div key={service.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{service.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROFIT OPTIMIZATION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <DollarSign className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Strategic Financial Planning</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our profit optimization services include comprehensive rent analysis, expense management, and strategic financial planning. We help you maximize revenue while maintaining tenant satisfaction and property value appreciation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              LONG-TERM STABILITY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Sustainable Investment Growth</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Multifamily properties provide long-term stability through consistent rental income and tenant retention. Our comprehensive management approach ensures your investment remains profitable and continues to appreciate over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            PARTNER WITH US
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Maximize Your Multifamily Investment</h2>
          
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
