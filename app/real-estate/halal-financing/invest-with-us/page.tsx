'use client';

import Link from 'next/link';
import { ArrowRight, Mail, TrendingUp, Target, Users, Building, Leaf, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function InvestWithUsPage() {
  const investmentAreas = [
    {
      icon: Building,
      title: 'Real Estate',
      description: 'Diverse portfolio of residential, commercial, and mixed-use properties with Shariah-compliant financing.'
    },
    {
      icon: Leaf,
      title: 'Agricultural Ventures',
      description: 'Sustainable farming and agricultural investments that provide both returns and environmental benefits.'
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Professional advice from specialists in Islamic finance and real estate investment.'
    },
    {
      icon: Target,
      title: 'Flexible Plans',
      description: 'Investment options tailored to your financial goals and risk tolerance.'
    },
    {
      icon: TrendingUp,
      title: 'Ethical Transparency',
      description: 'Clear, honest investment processes that align with Islamic principles.'
    },
    {
      icon: DollarSign,
      title: 'Long-Term Growth Focus',
      description: 'Strategic investments designed for sustainable wealth creation and preservation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/halal-financing/invest-with-us" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">INVEST WITH US</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Partner with One Drive Realty to access diverse and ethical investment opportunities
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Partner with One Drive Realty to access diverse and ethical investment opportunities. Our platform connects investors with Shariah-compliant real estate and agricultural ventures that align with both financial goals and ethical principles.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT AREAS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Diverse Ethical Investment Portfolio
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {investmentAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{area.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{area.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY INVEST WITH US
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
              INVESTMENT APPROACH
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Ethical Investment Philosophy</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our investment approach combines financial returns with ethical principles. We carefully select opportunities that not only provide attractive returns but also contribute positively to communities and align with Islamic finance principles.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Consultation</h4>
                  <p className="text-sm text-muted-indigo">Understand your investment goals and preferences.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Opportunity Matching</h4>
                  <p className="text-sm text-muted-indigo">Find investments that align with your criteria.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Due Diligence</h4>
                  <p className="text-sm text-muted-indigo">Thorough analysis of investment opportunities.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Investment Execution</h4>
                  <p className="text-sm text-muted-indigo">Seamless investment process and ongoing support.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              RISK MANAGEMENT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Diversification Strategy</h4>
                  <p className="text-sm text-muted-indigo">Spread risk across different property types and locations.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Shariah Compliance</h4>
                  <p className="text-sm text-muted-indigo">All investments comply with Islamic finance principles.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Professional Management</h4>
                  <p className="text-sm text-muted-indigo">Expert oversight of all investment operations.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Regular Reporting</h4>
                  <p className="text-sm text-muted-indigo">Transparent performance updates and financial reporting.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              GET STARTED
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Begin Your Investment Journey</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Ready to invest ethically and profitably? Contact our investment team to explore opportunities that align with your financial goals and values. We're here to guide you every step of the way.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 text-midnight-blue" />
                  <span className="text-lg font-semibold text-midnight-blue">info@onedriverealty.com</span>
                </div>
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
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Invest Ethically, Grow Sustainably</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Investing
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
