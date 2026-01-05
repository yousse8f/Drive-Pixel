'use client';

import Link from 'next/link';
import { ArrowRight, DollarSign, Shield, Headphones, GraduationCap, Home, TrendingUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AgentCommissionPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: '100% Commission',
      description: 'Receive 100% of your commission on every transaction, minus a simple flat fee.'
    },
    {
      icon: Shield,
      title: 'No Hidden Costs',
      description: 'We\'re transparent—there are no hidden fees or surprise costs.'
    },
    {
      icon: Headphones,
      title: 'Comprehensive Support',
      description: 'Benefit from E&O insurance, paperless transaction management, and an agent website with home search features.'
    },
    {
      icon: GraduationCap,
      title: 'Training and Tools',
      description: 'Whether you\'re a new or experienced agent, we provide the training, tools, and resources you need to succeed. Our virtual back-office is accessible 24/7, giving you flexibility and support wherever you are.'
    }
  ];

  const agentBenefits = [
    {
      icon: TrendingUp,
      title: 'More Income Retained',
      description: 'With our 100% commission plan, you can afford to invest in your business and create the work environment that suits you—whether it\'s a home office, shared executive suite, or private space.'
    },
    {
      icon: Shield,
      title: 'Top-Notch Resources',
      description: 'Our industry-leading technology, marketing support, and business development coaching are all designed to help you succeed.'
    },
    {
      icon: Home,
      title: 'Flexibility',
      description: 'Work from anywhere with our online tools and resources available at your fingertips.'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">AGENT 100% COMMISSION</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Maximize your earnings while receiving top-notch support and resources
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              At One Drive Realty, we offer a 100% commission model designed to empower real estate agents by maximizing their earnings while providing top-notch support and resources. Unlike traditional brokerages that often take a significant portion of your commission, we ensure that you keep more of what you earn.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              WHAT WE OFFER
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                Everything You Need to Succeed
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit) => {
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

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              WHY CHOOSE US
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                A Better Alternative to Traditional Real Estate
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty was created to provide a better alternative to the traditional real estate model. We understand the challenges of working independently and the drawbacks of conventional offices, so we've tailored our approach to meet the needs of modern agents.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              BENEFITS FOR AGENTS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agentBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#33202b] leading-tight">{benefit.title}</h3>
                  <p className="text-sm text-[#4f2c33] leading-relaxed break-words flex-1">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#080f24] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            JOIN ONE DRIVE REALTY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Take Control of Your Real Estate Career</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Why work harder for less? Join One Drive Realty today and take control of your real estate career. With us, you'll have the freedom to grow your business on your terms, backed by the best support in the industry.
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
