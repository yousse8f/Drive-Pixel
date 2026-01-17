'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Tractor, TrendingUp, Target, Shield, DollarSign, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function FarmingPage() {
  const keyAspects = [
    {
      icon: Tractor,
      title: 'Agricultural Investment Flexibility',
      description: 'Exchange for similar or other property types.'
    },
    {
      icon: DollarSign,
      title: 'Deferring Large Capital Gains Taxes',
      description: 'Reinvest full proceeds into new opportunities.'
    },
    {
      icon: Shield,
      title: 'Expert Guidance',
      description: 'Navigate federal tax codes and compliance efficiently.'
    }
  ];

  const benefits = [
    {
      title: 'Tax Deferral',
      description: 'Defer substantial capital gains on agricultural land sales.'
    },
    {
      title: 'Portfolio Diversification',
      description: 'Expand into different agricultural property types.'
    },
    {
      title: 'Expert Support',
      description: 'Professional guidance through complex exchanges.'
    },
    {
      title: 'Market Access',
      description: 'Access to exclusive agricultural opportunities.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Crop Farms',
      description: 'Land for growing crops and agricultural production.'
    },
    {
      title: 'Ranches',
      description: 'Large-scale livestock and grazing properties.'
    },
    {
      title: 'Orchards',
      description: 'Fruit and vegetable growing operations.'
    },
    {
      title: 'Timberland',
      description: 'Forest land for logging and wood production.'
    }
  ];

  const exchangeProcess = [
    {
      title: 'Property Valuation',
      description: 'Professional assessment of agricultural land value.'
    },
    {
      title: 'Like-Kind Identification',
      description: 'Find suitable replacement agricultural properties.'
    },
    {
      title: 'Exchange Execution',
      description: 'Complete the 1031 Exchange transaction.'
    },
    {
      title: 'Tax Deferral',
      description: 'Successfully defer capital gains taxes.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/exchange-1031/farming" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">FARMING</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Agricultural 1031 Exchanges for tax-deferred investment growth
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Agricultural properties can leverage 1031 Exchanges to defer taxes and reinvest in farmland or other income-generating real estate. This strategy allows farmers and agricultural investors to preserve capital while upgrading to better agricultural opportunities.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY ASPECTS OF FARMING 1031 EXCHANGES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Agricultural Investment Strategy
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {keyAspects.map((aspect) => {
              const Icon = aspect.icon;
              return (
                <div key={aspect.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{aspect.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{aspect.description}</p>
                </div>
              );
            })}
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
              EXCHANGE PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Strategic Agricultural Upgrading</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our agricultural 1031 Exchange experts help you identify strategic opportunities to upgrade your farming operations. Exchange smaller parcels for larger agricultural properties or diversify into different agricultural types to maximize your investment returns.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TAX ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <DollarSign className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Capital Preservation</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Defer large capital gains taxes on your agricultural land sale and reinvest the full proceeds into a like-kind replacement property. This strategy preserves your investment capital while positioning you for future growth in the agricultural sector.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              EXPERT GUIDANCE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Professional Compliance Support</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Navigate complex federal tax codes and compliance requirements with expert guidance. Our team ensures all agricultural 1031 Exchange transactions are handled correctly to protect your tax-deferral benefits.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              EXCHANGE PROCESS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {exchangeProcess.map((step) => (
              <div key={step.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{step.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            AGRICULTURAL 1031 EXCHANGE SUPPORT
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Maximize Your Agricultural Investment</h2>
          
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
