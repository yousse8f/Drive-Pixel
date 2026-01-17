'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, Target, Leaf, DollarSign, Shield, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function LogHomesKitPage() {
  const components = [
    {
      icon: Home,
      title: 'Pre-Cut Treated Logs',
      description: 'Precision-cut logs treated for durability and weather resistance, ready for assembly.'
    },
    {
      icon: Shield,
      title: 'Roofing Materials',
      description: 'Complete roofing system including shingles, underlayment, and necessary components.'
    },
    {
      icon: Target,
      title: 'Windows and Doors',
      description: 'High-quality windows and doors designed to complement log home construction.'
    },
    {
      icon: Settings,
      title: 'Hardware and Fasteners',
      description: 'All necessary hardware, fasteners, and specialized tools for log home assembly.'
    },
    {
      icon: Leaf,
      title: 'Flooring and Ceiling Materials',
      description: 'Premium flooring and ceiling materials designed for log home aesthetics and durability.'
    },
    {
      icon: DollarSign,
      title: 'Detailed Blueprints',
      description: 'Comprehensive construction plans and detailed assembly instructions.'
    }
  ];

  const benefits = [
    {
      title: 'Simplified Construction',
      description: 'Pre-cut materials and detailed plans streamline the building process.'
    },
    {
      title: 'Cost Efficiency',
      description: 'Reduced labor costs and material waste compared to traditional construction.'
    },
    {
      title: 'Natural Energy Insulation',
      description: 'Log construction provides excellent natural insulation properties.'
    },
    {
      title: 'Sustainability',
      description: 'Environmentally friendly building materials and construction methods.'
    },
    {
      title: 'Customization Options',
      description: 'Flexible designs that can be tailored to your specific preferences.'
    },
    {
      title: 'Long-Term Durability',
      description: 'Properly constructed log homes can last for generations.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/log-homes-kit" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">LOG HOME KITS</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Sustainable housing solutions through high-quality log home kits
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              We connect clients with sustainable housing solutions through high-quality log home kits. Our comprehensive packages provide everything needed to construct beautiful, durable, and energy-efficient log homes.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT ARE LOG HOME KITS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Complete Building Solutions
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Prefabricated Building Packages</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Prefabricated packages containing logs, doors, windows, roofing, hardware, and detailed construction plans. Everything you need to build your dream log home is included in one comprehensive kit.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY COMPONENTS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {components.map((component) => {
              const Icon = component.icon;
              return (
                <div key={component.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{component.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{component.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY CHOOSE ONE DRIVE REALTY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Log Home Expertise</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Expert guidance from trusted suppliers with full project coordination and commitment to sustainable building practices.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR SUPPORT SERVICES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Expert Guidance</h4>
                  <p className="text-sm text-muted-indigo">Professional consultation throughout the planning and construction process.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Trusted Suppliers</h4>
                  <p className="text-sm text-muted-indigo">Partnerships with reputable log home kit manufacturers and suppliers.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Full Project Coordination</h4>
                  <p className="text-sm text-muted-indigo">Comprehensive project management from planning to completion.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Sustainable Building</h4>
                  <p className="text-sm text-muted-indigo">Commitment to environmentally friendly construction practices.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CONSTRUCTION PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Site Preparation</h4>
                  <p className="text-sm text-muted-indigo">Foundation and site work preparation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Log Assembly</h4>
                  <p className="text-sm text-muted-indigo">Following detailed blueprints for precise construction.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Installation</h4>
                  <p className="text-sm text-muted-indigo">Windows, doors, and roofing system installation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Finishing</h4>
                  <p className="text-sm text-muted-indigo">Interior and exterior finishing touches.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUSTAINABLE ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Leaf className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Environmental Benefits</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Log homes offer superior energy efficiency, reduced carbon footprint, and use renewable resources. Our kits prioritize sustainable materials and construction methods that minimize environmental impact while maximizing comfort and durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            BEGIN YOUR LOG HOME PROJECT
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Your Sustainable Dream Home</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Get Started
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
