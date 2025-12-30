'use client';

import Link from 'next/link';
import { ArrowRight, Building2, DollarSign, HelpCircle, Landmark, Hammer, FileText, TrendingUp, BarChart3, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RealEstatePage() {
  const propertyTypes = [
    {
      icon: DollarSign,
      title: 'Agent Commission 100%',
      description: 'Keep 100% of your commission',
      href: '/real-estate/agent-commission'
    },
    {
      icon: HelpCircle,
      title: 'Why OneDrive Realty?',
      description: 'Discover what makes us different',
      href: '/real-estate/why-onedrive'
    },
    {
      icon: Landmark,
      title: 'Halal Financing',
      description: 'Sharia-compliant financing solutions',
      href: '/real-estate/halal-financing'
    },
    {
      icon: Hammer,
      title: 'Build Your Dream Home',
      description: 'Custom home building services',
      href: '/real-estate/build-dream-home'
    },
    {
      icon: FileText,
      title: 'List Your Property for Sale',
      description: 'Professional property listing services',
      href: '/real-estate/list-property'
    },
    {
      icon: TrendingUp,
      title: 'API-LEADS-DFLX',
      description: 'Advanced lead generation system',
      href: '/real-estate/api-leads'
    },
    {
      icon: BarChart3,
      title: 'Exchange 1031',
      description: 'Tax-deferred property exchanges',
      href: '/real-estate/exchange-1031'
    },
    {
      icon: Building2,
      title: 'CAP-ROR-REO',
      description: 'Investment analysis and opportunities',
      href: '/real-estate/cap-ror-reo'
    },
    {
      icon: BookOpen,
      title: 'R/E BLOGS',
      description: 'Real estate insights and articles',
      href: '/real-estate/blogs'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Estate Services</h1>
          <p className="text-sm md:text-base text-white font-medium whitespace-nowrap">
                Comprehensive real estate solutions across all property types
              </p>
        </div>
      </section>

      <section className="py-16 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              PROPERTY PROGRAMS
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_4px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                Tailored tracks for every real estate objective
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Link key={type.title} href={type.href}>
                  <div className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-[#33202b]">{type.title}</h3>
                    <p className="text-sm text-[#4f2c33] leading-relaxed">{type.description}</p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-none bg-[#1f4f78] text-white font-semibold py-2 px-6 border border-[#112a45] shadow-[0_6px_0_#0e2e46] text-xs tracking-[0.25em] uppercase">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#080f24] text-white">
        <div className="max-w-4xl mx-auto px-2 text-center space-y-4">
          <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            READY TO SCALE
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Ready to Explore Our Real Estate Services?</h2>
          <p className="text-lg text-white/80">
            Launch new brokerages, modernize operations, or power niche investments with DrivePixel’s concierge real estate delivery stack.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
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
