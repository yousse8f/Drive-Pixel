'use client';

import Link from 'next/link';
import { ArrowRight, DollarSign, Calendar, FileX, Globe, FileText, Users, GraduationCap, Briefcase, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WhyOneDrivePage() {
  const uniqueFeatures = [
    {
      icon: DollarSign,
      title: 'Affordable',
      description: 'All of our services and courses are offered at prices that are designed to be highly accessible, ensuring you receive top-quality support without exceeding your budget.'
    },
    {
      icon: Calendar,
      title: 'Flexible Schedule',
      description: 'Work part-time or full-time; it is entirely up to you.'
    },
    {
      icon: FileX,
      title: 'No Lock-In Contract',
      description: 'You can leave whenever you want, with no strings attached.'
    }
  ];

  const betterWayFeatures = [
    {
      icon: Globe,
      title: 'Multi-state',
      description: 'Work from wherever you wish.'
    },
    {
      icon: FileText,
      title: 'Paperless and Mobile',
      description: 'Environmentally friendly and convenient.'
    },
    {
      icon: Users,
      title: 'Agent-Driven',
      description: 'You are in control.'
    },
    {
      icon: GraduationCap,
      title: 'New Agent Training',
      description: 'We assist you in launching your profession.'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">WHY ONE DRIVE REALTY?</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            A market-leading online real estate company strengthening agents with unparalleled support
          </p>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMPANY OVERVIEW
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Market-Leading Online Real Estate Company
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              The One Drive Realty, founded in ----, is a market-leading online real estate company. We provide a comprehensive range of services for residential, commercial, and broker-of-record needs, all virtually.
            </p>
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              Unlike other brokerages, we strengthen our agents. You'll receive unparalleled support, coaching, benefits, leads, and commission programs that are meant to propel your success. The One Drive Realty could be a great fit if you thrive with an entrepreneurial mentality.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT SETS US APART
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Direct Access, No Bureaucracy
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              Forget about corporate ladders and excessive bureaucracy. At One Drive Realty, you have direct contact with your managing broker; there is no need to deal with office managers or team leaders. We cut out time-consuming activities like previews and floor time. Our goal is to assist you in finding more buyers and sellers, not to put you under pressure to hire more brokers.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              HERE'S WHAT MAKES US UNIQUE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {uniqueFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[240px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WE'VE ELIMINATED THE FRUSTRATIONS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Of Traditional Workplaces
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              Do you need help find virtual real estate companies that will help you fulfil your dreams?
            </p>
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              We're a group of tech-savvy agents, brokers, and attorneys tired of large offices, unjust commissions, and limited independence.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WE CREATED A BETTER WAY
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {betterWayFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[220px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{feature.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              AGENT VIRTUAL BACK OFFICE
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Your All-in-One Command Centre
              </h2>
            </div>
          </div>

          <div className="rounded-lg border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-indigo leading-relaxed">
                Our Agent Virtual Back office is your all-in-one command centre, available from anywhere. It's like having a marketing department, a printing press, and a training centre. We have property brochures, agricultural cards, and business cards that are personalized and ready to go. In addition, you will receive outstanding listings and buyer presentations. Our paperless internet transaction coordinator keeps things running smoothly. Do you want training? We have videos to help you succeed.
              </p>
              <p className="text-lg text-muted-indigo leading-relaxed font-semibold">
                This is your real-estate independence. We replaced the restrictions of a physical office with the capabilities of the Agent Virtual Back office, which are entirely free-for-all agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN ONE DRIVE REALTY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Ready to Improve Your Real Estate Career?</h2>
          
          <p className="text-lg text-white/80 leading-relaxed">
            Contact us today to find out what thousands of others are saying.
          </p>
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
