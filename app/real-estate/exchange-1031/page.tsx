'use client';

import Link from 'next/link';
import { ArrowRight, DollarSign, TrendingUp, Briefcase, Headphones, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Exchange1031Page() {
  const keyBenefits = [
    {
      icon: DollarSign,
      title: 'Tax Deferral',
      description: 'Capital gains taxes are deferred when proceeds are reinvested into qualifying properties.'
    },
    {
      icon: TrendingUp,
      title: 'Portfolio Growth',
      description: 'Investors can upgrade or diversify their real estate portfolio without immediate tax liability.'
    },
    {
      icon: Briefcase,
      title: 'Flexible Investment Options',
      description: 'Exchanges may include residential, commercial, or investment-grade properties that qualify under like-kind rules.'
    },
    {
      icon: Headphones,
      title: 'Investor Support',
      description: 'One Drive Realty assists investors throughout the process by coordinating with professionals involved in the exchange to ensure proper execution and compliance.'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">1031 EXCHANGE</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Defer capital gains taxes and grow your real estate portfolio
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              OVERVIEW
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                Tax-Deferred Real Estate Investment
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              A 1031 Exchange allows real estate investors to defer capital gains taxes by reinvesting proceeds from the sale of an investment property into another like-kind property.
            </p>
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty works with investors and qualified intermediaries to facilitate 1031 Exchange transactions in compliance with IRS regulations.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              KEY BENEFITS OF A 1031 EXCHANGE
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                Strategic Tax Planning for Investors
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 shadow-[0_12px_0_0_#d37377] min-h-[180px]">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#33202b] mb-2 leading-tight">{benefit.title}</h3>
                      <p className="text-sm text-[#4f2c33] leading-relaxed break-words">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#080f24] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            GET STARTED
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Ready to Explore 1031 Exchange Options?</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Contact One Drive Realty today to learn more about how a 1031 Exchange can help you defer taxes and grow your investment portfolio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Mail className="mr-2 h-5 w-5" />
                Email Us Now
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-[#17b58f] hover:bg-[#0e8f6a] text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
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
