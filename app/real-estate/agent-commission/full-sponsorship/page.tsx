'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Users, GraduationCap, Award, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function FullSponsorshipPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Comprehensive Support',
      description: 'Access to valuable resources, tools, and guidance essential for building a successful real estate career.'
    },
    {
      icon: GraduationCap,
      title: 'Education & Training',
      description: 'Carefully vetted third-party courses covering fundamental principles and advanced strategies.'
    },
    {
      icon: Award,
      title: 'Affiliate Marketing Program',
      description: 'Leverage our Affiliate Marketing Real Estate Referral Program to expand networks and close more deals.'
    },
    {
      icon: Handshake,
      title: 'Full Backing',
      description: 'Strong backing from our firm with ongoing support, education, and growth opportunities.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/full-sponsorship" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">FULL SPONSORSHIP</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Empowering real estate agents through comprehensive support and sponsorship
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              At One Drive Realty, our primary focus is on sponsoring real estate agents and empowering them to succeed through our comprehensive support systems. We take pride in offering full sponsorship exclusively to real estate agents, enabling them to leverage our Affiliate Marketing Real Estate Referral Program.
            </p>
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              This program is designed to help agents expand their networks, generate leads, and close more deals, all while benefiting from the strong backing of our firm.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR COMMITMENT
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Beyond Financial Backing
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              Our sponsorship goes beyond financial backing and includes access to valuable resources, tools, and guidance that are essential for building a successful real estate career. We understand that agents need more than just a commission split—they need ongoing support, education, and opportunities to grow.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SPONSORSHIP BENEFITS
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
              EDUCATION & TRAINING
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              While we are in the process of re-establishing our own Real Estate School, which will offer tailored training programs, we currently provide access to carefully vetted third-party courses. These courses cover fundamental real estate principles as well as advanced strategies for closing deals and growing a real estate business.
            </p>
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              Whether you are a seasoned professional or just starting your career, these courses are designed to bridge the gap between theory and practical application.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR PROMISE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto font-medium">
              At One Drive Realty, our full sponsorship program reflects our commitment to agent success through support, training, and opportunity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN OUR SPONSORSHIP PROGRAM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Take Your Real Estate Career to the Next Level</h2>
          
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
