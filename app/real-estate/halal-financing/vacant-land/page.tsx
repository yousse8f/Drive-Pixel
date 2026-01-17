'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Globe, DollarSign, Target, TrendingUp, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function VacantLandPage() {
  const financingOptions = [
    {
      icon: DollarSign,
      title: 'Murabaha: Transparent Cost-Plus Financing',
      description: 'Purchase land through transparent cost-plus arrangements where the financial institution buys the land and sells it to you at an agreed-upon profit margin.'
    },
    {
      icon: Target,
      title: 'Istisna: Construction-Focused Installment Financing',
      description: 'Financing specifically designed for construction projects where payments are made in installments as development progresses.'
    }
  ];

  const developmentServices = [
    {
      title: 'Market Analysis',
      description: 'Comprehensive research on market trends, zoning regulations, and development potential.'
    },
    {
      title: 'Sustainable Development Planning',
      description: 'Environmentally responsible development strategies that align with modern standards.'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Expert guidance through zoning laws, building codes, and permit requirements.'
    },
    {
      title: 'Project Management',
      description: 'End-to-end coordination of development projects from planning to completion.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/halal-financing/vacant-land" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VACANT LAND</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Invest in vacant land ethically through Halal funding structures
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Invest in vacant land ethically through Halal funding structures. Our Shariah-compliant financing solutions enable you to acquire and develop land while maintaining strict adherence to Islamic finance principles.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              HALAL FINANCING OPTIONS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ethical Land Investment Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {financingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{option.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{option.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              STRATEGIC & ETHICAL DEVELOPMENT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Map className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Responsible Land Development</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  We assist with market analysis and sustainable development planning. Our approach ensures that land investments are not only financially sound but also environmentally and socially responsible.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DEVELOPMENT SUPPORT SERVICES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {developmentServices.map((service) => (
              <div key={service.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{service.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{service.description}</p>
              </div>
            ))}
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
                  <h4 className="font-bold text-midnight-blue mb-2">Appreciation Potential</h4>
                  <p className="text-sm text-muted-indigo">Land typically appreciates over time, building long-term wealth.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Development Flexibility</h4>
                  <p className="text-sm text-muted-indigo">Multiple development options from residential to commercial use.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Lower Initial Investment</h4>
                  <p className="text-sm text-muted-indigo">Often requires less capital than developed properties.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Tax Benefits</h4>
                  <p className="text-sm text-muted-indigo">Potential tax advantages for land investment and development.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              LAND TYPES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Residential Land</h4>
                  <p className="text-sm text-muted-indigo">Lots for housing development</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Commercial Land</h4>
                  <p className="text-sm text-muted-indigo">Properties for business development</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Agricultural Land</h4>
                  <p className="text-sm text-muted-indigo">Farms and rural development opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EXPLORE LAND INVESTMENTS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Invest in Land Ethically</h2>
          
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
