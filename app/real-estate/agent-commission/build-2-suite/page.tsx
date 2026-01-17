'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, DollarSign, Users, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function Build2SuitPage() {
  const benefits = [
    {
      icon: Home,
      title: 'Custom Solutions',
      description: 'Provide clients with tailored solutions for custom-built residential, commercial, and multi-use properties.'
    },
    {
      icon: DollarSign,
      title: 'Higher Commission Potential',
      description: 'Maximize earnings with premium commission structures on custom build projects.'
    },
    {
      icon: Users,
      title: 'Streamlined Process',
      description: 'Work efficiently with builders and professionals through our established network.'
    },
    {
      icon: Settings,
      title: 'Full Transaction Support',
      description: 'Complete support throughout the entire building and transaction process.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Residential Properties',
      description: 'Custom homes, luxury residences, and specialized housing solutions.'
    },
    {
      title: 'Commercial Properties',
      description: 'Office buildings, retail spaces, and mixed-use developments.'
    },
    {
      title: 'Multi-Use Properties',
      description: 'Combined residential-commercial properties and versatile developments.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/build-2-suite" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">BUILD 2 SUIT</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Support agents working with custom-built properties for maximum success
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              The Build 2 Suit Program supports agents working with custom-built residential, commercial, and multi-use properties. This specialized program allows agents to deliver high-value projects while maximizing earnings.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROGRAM BENEFITS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Advantages for Custom Build Specialists
              </h2>
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
              PROPERTY TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {propertyTypes.map((type) => (
              <div key={type.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{type.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMPREHENSIVE SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Full Transaction & Marketing Support</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our Build 2 Suit Program provides comprehensive support throughout the entire custom build process. From initial client consultation to final closing, we ensure agents have the resources, expertise, and backing needed to successfully manage complex custom build projects.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  This program is designed for agents who want to specialize in the lucrative custom build market while providing exceptional value to their clients.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              NETWORK ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <h3 className="text-xl font-bold text-midnight-blue mb-4">Builder & Professional Network</h3>
              <p className="text-muted-indigo leading-relaxed mb-4">
                Gain access to our established network of trusted builders, architects, contractors, and other professionals essential for successful custom build projects.
              </p>
              <ul className="space-y-2 text-muted-indigo">
                <li className="flex items-start">
                  <span className="text-sea-green mr-2">•</span>
                  Pre-vetted building partners
                </li>
                <li className="flex items-start">
                  <span className="text-sea-green mr-2">•</span>
                  Streamlined communication channels
                </li>
                <li className="flex items-start">
                  <span className="text-sea-green mr-2">•</span>
                  Quality assurance standards
                </li>
                <li className="flex items-start">
                  <span className="text-sea-green mr-2">•</span>
                  Competitive pricing structures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN BUILD 2 SUIT PROGRAM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Elevate Your Custom Build Business</h2>
          
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
