'use client';

import Link from 'next/link';
import { ArrowRight, Mail, FileText, Home, Users, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function REContractFormsPage() {
  const availableForms = [
    {
      icon: Home,
      title: 'Purchase and Sale Agreements',
      description: 'Comprehensive contracts for buying and selling real estate properties with all necessary clauses and protections.'
    },
    {
      icon: FileText,
      title: 'Listing Agreements',
      description: 'Professional forms for property listing agreements between sellers and real estate agents.'
    },
    {
      icon: Shield,
      title: 'Disclosure Forms',
      description: 'Required disclosure documents for property condition, hazards, and material facts.'
    },
    {
      icon: DollarSign,
      title: 'Flat Fee Listing Contracts',
      description: 'Alternative listing agreements with flat fee structures for cost-conscious sellers.'
    }
  ];

  const complianceFeatures = [
    {
      title: 'State and Local Compliance',
      description: 'All forms are fully compliant with current state and local real estate laws and regulations.'
    },
    {
      title: 'Website Integration',
      description: 'Forms are seamlessly integrated into our website platform for easy access and completion.'
    },
    {
      title: 'Expert Guidance',
      description: 'Professional support and guidance available when you need assistance with form completion.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/why-onedrive/re-contract-forms" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">R/E CONTRACT FORMS</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Access NWMLS real estate contract forms with full compliance support
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty provides access to NWMLS real estate contract forms. Our comprehensive form library ensures you have all the necessary documentation for smooth and legally compliant real estate transactions.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              AVAILABLE FORMS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Form Library
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {availableForms.map((form) => {
              const Icon = form.icon;
              return (
                <div key={form.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{form.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{form.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMPLIANCE & SUPPORT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {complianceFeatures.map((feature) => (
              <div key={feature.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{feature.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              FORM ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <FileText className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Professional Documentation</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our NWMLS contract forms are designed to protect all parties involved in real estate transactions. Each form is carefully crafted to include essential legal protections while maintaining clarity and ease of use.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Whether you're a seasoned agent or new to real estate, our forms provide the foundation for successful and legally sound transactions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ACCESS PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Member Access</h4>
                  <p className="text-sm text-muted-indigo">Log in to access the complete form library</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Select Forms</h4>
                  <p className="text-sm text-muted-indigo">Choose the appropriate forms for your transaction</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Complete & Submit</h4>
                  <p className="text-sm text-muted-indigo">Fill out forms online or download for completion</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUPPORT SYSTEM
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">Expert Assistance Available</h3>
                <p className="text-muted-indigo leading-relaxed">
                  Our team provides guidance when needed to ensure proper form completion and compliance. We understand that real estate transactions can be complex, and we're here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            ACCESS CONTRACT FORMS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Get Professional Real Estate Forms</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Access Forms
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
