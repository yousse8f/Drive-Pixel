'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, Users, TrendingUp, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function MultiFamilyPage() {
  const investmentModels = [
    {
      icon: Users,
      title: 'Ijarah (Rent-Based Agreements)',
      description: 'Lease structures that provide rental income while maintaining Shariah compliance.'
    },
    {
      icon: TrendingUp,
      title: 'Diminishing Musharakah (Shared Ownership)',
      description: 'Gradual ownership transfer through partnership structures compliant with Islamic finance.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Islamic Finance Expertise',
      description: 'Specialized knowledge in Shariah-compliant multifamily investments.'
    },
    {
      icon: Target,
      title: 'End-to-End Investment Support',
      description: 'Comprehensive guidance from property selection to management.'
    },
    {
      icon: Building,
      title: 'Interest-Free Ownership Structures',
      description: 'Ethical financing solutions that eliminate riba and ensure compliance.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/halal-financing/multi-family" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">MULTIFAMILY</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Shariah-compliant multifamily investments for stable income and wealth building
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Multifamily properties provide stable rental income and long-term wealth-building opportunities through Shariah-compliant investment structures. These investments offer consistent returns while maintaining ethical and religious compliance.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SHARIAH-COMPLIANT INVESTMENT MODELS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ethical Investment Structures
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {investmentModels.map((model) => {
              const Icon = model.icon;
              return (
                <div key={model.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{model.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{model.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CONSISTENT REVENUE STREAMS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Stable Income Generation</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Multiple tenants ensure steady income while maintaining ethical compliance. Multifamily properties offer diversification of rental income and reduced vacancy risk compared to single-family investments.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY CHOOSE ONE DRIVE REALTY
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
              INVESTMENT ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Economies of Scale</h4>
                  <p className="text-sm text-muted-indigo">Lower per-unit costs and higher operational efficiency.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Risk Diversification</h4>
                  <p className="text-sm text-muted-indigo">Multiple tenants reduce vacancy impact on cash flow.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Professional Management</h4>
                  <p className="text-sm text-muted-indigo">Efficient property management systems and processes.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Long-Term Appreciation</h4>
                  <p className="text-sm text-muted-indigo">Historically strong appreciation potential for multifamily assets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EXPLORE MULTIFAMILY INVESTMENTS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Wealth Ethically</h2>
          
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
