'use client';

import Link from 'next/link';
import { ArrowRight, Mail, DollarSign, Shield, FileText, Globe, Home, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function Plan1Page() {
  const optionalServices = [
    {
      icon: Shield,
      title: 'Errors and Omissions Insurance (E&O)',
      description: 'Optional coverage to protect against legal claims related to transactions.'
    },
    {
      icon: FileText,
      title: 'Professional Transaction Management System',
      description: 'A paperless system to manage deals efficiently and stay organized.'
    },
    {
      icon: Globe,
      title: 'Custom Marketing Materials',
      description: 'Personalized business cards, brochures, yard signs, and more.'
    },
    {
      icon: Home,
      title: 'Agent Website',
      description: 'Professionally designed personal website available at an additional cost.'
    },
    {
      icon: Camera,
      title: 'Property Websites & Virtual Tours',
      description: 'Optional tools to enhance property exposure and buyer engagement.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/why-onedrive/plan-1" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">PLAN 01</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Independence and simplicity with 100% commission retention
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Plan 1 is designed for real estate agents who prefer independence and simplicity. This plan allows agents to retain 100% of their commission on every transaction, giving full control over earnings and business operations.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MAXIMIZE YOUR EARNINGS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Keep Every Dollar You Earn
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <DollarSign className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">100% Commission Retention</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  With Plan 1, agents keep every dollar earned. There are no commission splits or hidden fees. The focus remains on closing deals while maintaining full financial ownership.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OPTIONAL SERVICES AVAILABLE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <p className="text-muted-indigo leading-relaxed text-center mb-8">
                Plan 1 does not include complimentary services. All additional services are optional and available at competitive rates:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {optionalServices.map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/20 bg-white/50 p-6 text-center">
                      <div className="h-16 w-16 rounded-full bg-sea-green shadow-[inset_0_-4px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-midnight-blue leading-tight">{service.title}</h3>
                      <p className="text-sm text-muted-indigo leading-relaxed">{service.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              FLEXIBILITY WITHOUT COMPROMISE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Choose Only What You Need</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Agents choose only the services they need. Nothing is included by default, ensuring full control over expenses and investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN PLAN 1
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Start Your Independent Career Today</h2>
          
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
