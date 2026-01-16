'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, TrendingUp, Building2, Headphones, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CapRorReoPage() {
  const investmentFocus = [
    {
      icon: BarChart3,
      title: 'CAP Rate Analysis',
      description: 'Evaluation of income-producing properties based on capitalization rates.'
    },
    {
      icon: TrendingUp,
      title: 'Rate of Return (ROR)',
      description: 'Assessment of projected and historical returns to support informed investment decisions.'
    },
    {
      icon: Building2,
      title: 'REO Properties',
      description: 'Bank-owned and distressed real estate assets available for acquisition.'
    },
    {
      icon: Headphones,
      title: 'Investor Support & Access',
      description: 'One Drive Realty provides access, analysis support, and transaction coordination for CAP, ROR, and REO investment opportunities through its virtual brokerage platform.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">CAP-ROR-REO</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Investment-focused real estate opportunities and data-driven strategies
          </p>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OVERVIEW
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Investment-Focused Real Estate Opportunities
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              CAP-ROR-REO represents investment-focused real estate opportunities related to capitalization rates (CAP), rate of return (ROR), and real estate owned (REO) assets.
            </p>
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              These opportunities are primarily designed for investors seeking data-driven acquisition strategies and distressed or performance-based assets.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT FOCUS AREAS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Data-Driven Acquisition Strategies
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentFocus.map((focus) => {
              const Icon = focus.icon;
              return (
                <div key={focus.title} className="flex flex-col gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] min-h-[180px]">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-midnight-blue mb-2 leading-tight">{focus.title}</h3>
                      <p className="text-sm text-muted-indigo leading-relaxed break-words">{focus.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            GET STARTED
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Ready to Explore Investment Opportunities?</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us Now
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Contact Us
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
