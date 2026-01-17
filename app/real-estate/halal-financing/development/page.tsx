'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, Home, Users, Target, Settings, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function DevelopmentPage() {
  const financingPrograms = [
    {
      title: 'Halal Financing',
      description: 'Shariah-compliant financing solutions that eliminate interest (riba) and ensure full compliance with Islamic principles.'
    },
    {
      title: 'Kosher Financing',
      description: 'Financing structures that adhere to Jewish religious laws and ethical business practices.'
    },
    {
      title: 'Usury-Free Financing',
      description: 'Interest-free financing options that align with various ethical and religious principles.'
    }
  ];

  const developmentTypes = [
    {
      icon: Home,
      title: 'Residential',
      description: 'Housing developments including single-family homes, apartments, and mixed-use residential communities.'
    },
    {
      icon: Building,
      title: 'Commercial',
      description: 'Office buildings, retail centers, and business parks designed for commercial enterprises.'
    },
    {
      icon: Users,
      title: 'Mixed-Use',
      description: 'Integrated developments combining residential, commercial, and community spaces.'
    }
  ];

  const supportServices = [
    {
      title: 'Project Management',
      description: 'End-to-end coordination from planning to completion.'
    },
    {
      title: 'Regulatory Compliance',
      description: 'Expert navigation of zoning laws and building codes.'
    },
    {
      title: 'Sustainability Consulting',
      description: 'Environmental impact assessment and green building solutions.'
    },
    {
      title: 'Financial Structuring',
      description: 'Custom financing solutions for development projects.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/halal-financing/development" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">DEVELOPMENT</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Ethical real estate development through inclusive financing models
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty supports ethical real estate development through inclusive financing models. Our development projects combine innovative financing with sustainable building practices to create properties that serve communities while respecting diverse religious and ethical principles.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ETHICAL FINANCING PROGRAMS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Inclusive Development Financing
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {financingPrograms.map((program) => (
              <div key={program.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{program.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DEVELOPMENT TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {developmentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{type.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{type.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMPREHENSIVE SUPPORT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {supportServices.map((service) => (
              <div key={service.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{service.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUSTAINABLE DEVELOPMENT APPROACH
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Leaf className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Environmental Responsibility</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our development projects prioritize sustainability, energy efficiency, and environmental stewardship. We integrate green building practices and renewable energy solutions to minimize environmental impact while maximizing long-term value.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DEVELOPMENT PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Feasibility Study</h4>
                  <p className="text-sm text-muted-indigo">Market analysis and viability assessment.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Design & Planning</h4>
                  <p className="text-sm text-muted-indigo">Architectural design and development planning.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Construction</h4>
                  <p className="text-sm text-muted-indigo">Quality building and project execution.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Delivery</h4>
                  <p className="text-sm text-muted-indigo">Project completion and handover.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              INVESTMENT OPPORTUNITIES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Joint Ventures</h4>
                  <p className="text-sm text-muted-indigo">Partnership opportunities for ethical development projects.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Pre-Development Investment</h4>
                  <p className="text-sm text-muted-indigo">Early-stage investment in promising development sites.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Build-to-Suit</h4>
                  <p className="text-sm text-muted-indigo">Custom development for specific tenants or purposes.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Community Projects</h4>
                  <p className="text-sm text-muted-indigo">Development of community-serving facilities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            START YOUR DEVELOPMENT PROJECT
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Ethically with Us</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Project
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
