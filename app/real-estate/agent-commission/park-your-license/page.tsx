'use client';

import Link from 'next/link';
import { ArrowRight, Mail, DollarSign, Shield, Home, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function ParkYourLicensePage() {
  const advantages = [
    {
      icon: DollarSign,
      title: 'Cost Savings',
      description: 'Save on Board, Association, and MLS dues while keeping your license active.'
    },
    {
      icon: TrendingUp,
      title: 'Continued Income',
      description: 'Generate income through referrals, leads, and new home sales.'
    },
    {
      icon: Home,
      title: 'Property Transactions',
      description: 'Ability to transact commercial, farming, and ranch properties.'
    },
    {
      icon: Shield,
      title: 'Active License',
      description: 'Maintain active license titles without full membership costs.'
    }
  ];

  const disadvantages = [
    {
      title: 'Realtor® Title Restrictions',
      description: 'Realtor® title cannot be used without full Board membership.'
    },
    {
      title: 'Limited Access',
      description: 'No personal access to Board, Association, or MLS services.'
    },
    {
      title: 'MLS Listing Fees',
      description: 'MLS listings can be uploaded for an additional fee.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/park-your-license" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">PARK YOUR LICENSE</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Keep your license active while avoiding costly membership fees
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              The Park Your License Program at One Drive Realty is designed for agents who want to avoid Board, Association, and MLS fees while keeping their license active.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ADVANTAGES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Benefits of Parking Your License
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <div key={advantage.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{advantage.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{advantage.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CONSIDERATIONS
            </div>
          </div>

          <div className="space-y-4 mb-16">
            {disadvantages.map((item) => (
              <div key={item.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                <h3 className="text-xl font-bold text-midnight-blue mb-2">{item.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMMISSION & FEES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-midnight-blue mb-2">Commission Structure</h3>
                  <p className="text-muted-indigo leading-relaxed">
                    Agents earn 85% commission per deal (not applicable to brand-new licensees).
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-midnight-blue mb-2">Yearly Fee</h3>
                  <p className="text-muted-indigo leading-relaxed">
                    A yearly fee (state-based) provides access to all tools, training, and the Agent Virtual Back Office.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN PARK YOUR LICENSE PROGRAM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Keep Your License Active Today</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
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
