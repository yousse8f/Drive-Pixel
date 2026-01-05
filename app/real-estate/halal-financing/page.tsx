'use client';

import Link from 'next/link';
import { ArrowRight, Shield, BookOpen, Handshake, CheckCircle, Users, FileCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HalalFundingPage() {
  const approaches = [
    {
      icon: Users,
      title: 'Referral to Halal-Compliant Financial Institutions',
      description: 'While One Drive Realty does not directly offer Halal financing, we collaborate with financial institutions that specialize in providing Halal-compliant mortgage and investment products. Our team can refer clients to these institutions, ensuring they have access to financing options that align with their values.'
    },
    {
      icon: BookOpen,
      title: 'Guidance on Halal Financing',
      description: 'We provide general guidance on what Halal funding entails and help clients understand the principles behind it. This helps them make informed decisions about their real estate investments.'
    },
    {
      icon: Handshake,
      title: 'Integration with Real Estate Transactions',
      description: 'For clients who choose Halal funding, One Drive Realty ensures that all aspects of the real estate transaction are aligned with Islamic finance principles. This includes working closely with financial partners to structure deals that are compliant with Halal guidelines.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Ethical and Compliant Transactions',
      description: 'Clients who choose Halal funding through One Drive Realty can be confident that their real estate investments are structured ethically and in accordance with Islamic principles.'
    },
    {
      icon: FileCheck,
      title: 'Access to Specialized Financial Products',
      description: 'By partnering with financial institutions that offer Halal-compliant products, One Drive Realty provides clients with access to specialized financing options that may not be readily available elsewhere.'
    },
    {
      icon: CheckCircle,
      title: 'Support Throughout the Process',
      description: 'One Drive Realty supports clients throughout the entire process, from understanding the basics of Halal funding to completing the transaction, ensuring a smooth and compliant experience.'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">HALAL FUNDING</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Shariah-compliant financing solutions for your real estate needs
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
                Diverse Financing Options for Your Needs
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty recognizes the importance of offering diverse financing options that cater to the needs of our clients. Halal funding is a significant consideration for those who seek to finance their real estate transactions in accordance with Islamic principles.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              WHAT IS HALAL FUNDING?
            </div>
          </div>

          <div className="rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-8 py-10 shadow-[0_12px_0_0_#d37377] mb-16">
            <div className="space-y-4">
              <p className="text-lg text-[#4f2c33] leading-relaxed">
                Halal Funding refers to financial products and services that comply with Islamic law, which prohibits interest-based transactions (Riba) and requires investments to be made in ethical and permissible (Halal) ventures. In real estate, this often means structuring transactions in a way that avoids traditional interest-bearing loans.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              ONE DRIVE REALTY'S APPROACH
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                To Halal Funding
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {approaches.map((approach) => {
              const Icon = approach.icon;
              return (
                <div key={approach.title} className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform min-h-[320px]">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#33202b] leading-tight">{approach.title}</h3>
                  <p className="text-sm text-[#4f2c33] leading-relaxed break-words flex-1">{approach.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              BENEFITS OF HALAL FUNDING
            </div>
            <div className="w-full rounded-none bg-[#a799e4] border border-[#7b6cc0] shadow-[0_2px_0_rgba(88,70,150,0.35)] py-1 text-center">
              <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                With One Drive Realty
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform min-h-[260px]">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#33202b] leading-tight">{benefit.title}</h3>
                  <p className="text-sm text-[#4f2c33] leading-relaxed break-words flex-1">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              OUR COMMITMENT
            </div>
          </div>

          <div className="rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-8 py-10 shadow-[0_12px_0_0_#d37377]">
            <div className="space-y-4">
              <p className="text-lg text-[#4f2c33] leading-relaxed text-center">
                One Drive Realty is committed to supporting clients who seek Halal funding for their real estate transactions. By offering referrals to Halal-compliant financial institutions and providing guidance on Islamic finance principles, we ensure that our clients can invest in real estate in a way that aligns with their values and beliefs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#080f24] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_2px_0_rgba(255,255,255,0.55)] py-1 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            CONTACT US
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Looking for Shariah-Compliant Financing?</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Looking for Shariah-compliant financing for your real estate needs? One Drive Realty can help! We understand the importance of ethical financial practices and offer a variety of options to suit your needs.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            Contact us to learn more about our services.
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
