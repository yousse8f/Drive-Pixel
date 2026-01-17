'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Users, DollarSign, Target, TrendingUp, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function AgriculturalLandPage() {
  const financingSolutions = [
    {
      icon: Users,
      title: 'Musharakah (Equity Sharing)',
      description: 'Partnership arrangement where both parties contribute capital and share profits and losses according to agreed-upon ratios.'
    },
    {
      icon: DollarSign,
      title: 'Murabaha (Cost-Plus Purchase)',
      description: 'The financial institution purchases agricultural land and sells it to you at a transparent profit margin with installment payments.'
    }
  ];

  const landUses = [
    {
      title: 'Crop Farming',
      description: 'Cultivation of various crops for food production and commercial sale.'
    },
    {
      title: 'Livestock Operations',
      description: 'Raising animals for meat, dairy, and other agricultural products.'
    },
    {
      title: 'Agro-Industries',
      description: 'Processing facilities and value-added agricultural production.'
    }
  ];

  const benefits = [
    {
      title: 'Tangible Asset Value',
      description: 'Physical land with inherent value and multiple use possibilities.'
    },
    {
      title: 'Long-Term Appreciation',
      description: 'Historical trend of land value increase over time.'
    },
    {
      title: 'Food Security',
      description: 'Contribution to national and global food security.'
    },
    {
      title: 'Diversified Income',
      description: 'Multiple revenue streams from various agricultural activities.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/halal-financing/agriculture-land" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">AGRICULTURAL LAND</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Acquire farmland through ethical, Shariah-compliant financing solutions
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Acquire farmland through ethical, Shariah-compliant financing. Our agricultural land investments provide opportunities for sustainable farming while maintaining strict adherence to Islamic finance principles.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              FINANCING SOLUTIONS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ethical Agricultural Financing
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {financingSolutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <div key={solution.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{solution.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{solution.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              GROWTH OPPORTUNITIES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Versatile Agricultural Applications</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Agricultural land supports crop farming, livestock, and agro-industries. This versatility provides multiple revenue streams and reduces dependency on single agricultural activities.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              LAND USE APPLICATIONS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {landUses.map((use) => (
              <div key={use.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{use.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{use.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT ADVANTAGES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUSTAINABLE FARMING PRACTICES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Leaf className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Environmental Responsibility</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our agricultural land investments prioritize sustainable farming practices that protect soil health, conserve water resources, and promote biodiversity. We work with farmers who share our commitment to environmental stewardship.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OPERATIONAL SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Farm Management</h4>
                  <p className="text-sm text-muted-indigo">Expert guidance on crop selection and farming techniques.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Market Access</h4>
                  <p className="text-sm text-muted-indigo">Connections to buyers and distribution channels.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Technical Support</h4>
                  <p className="text-sm text-muted-indigo">Agricultural expertise and best practices implementation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Regulatory Compliance</h4>
                  <p className="text-sm text-muted-indigo">Assistance with agricultural regulations and certifications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EXPLORE AGRICULTURAL INVESTMENTS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Invest in Sustainable Agriculture</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Learn More
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
