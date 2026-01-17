'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, Globe, Camera, Users, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function ListYourPropertyPage() {
  const benefits = [
    {
      icon: Globe,
      title: 'Exposure Across Major Platforms',
      description: 'Your property will be listed on all major real estate websites and platforms for maximum visibility.'
    },
    {
      icon: Camera,
      title: 'Professional Photography & Virtual Tours',
      description: 'High-quality images and immersive virtual tours to showcase your property\'s best features.'
    },
    {
      icon: TrendingUp,
      title: 'Comprehensive Marketing Strategy',
      description: 'Strategic marketing plans including digital advertising, social media promotion, and targeted outreach.'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Professional support from experienced agents throughout the entire listing and selling process.'
    }
  ];

  const processSteps = [
    {
      title: 'Property Consultation',
      description: 'Meet with our experts to discuss your property and determine optimal listing strategy.'
    },
    {
      title: 'Professional Preparation',
      description: 'Photography, virtual tours, and marketing materials are created to showcase your property.'
    },
    {
      title: 'Strategic Listing',
      description: 'Your property is listed across multiple platforms with targeted marketing campaigns.'
    },
    {
      title: 'Showings & Negotiations',
      description: 'We coordinate showings and handle negotiations to secure the best possible outcome.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/why-onedrive/list-your-property" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">LIST YOUR PROPERTY</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Maximum exposure and professional support for your property sale
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              List your property with One Drive Realty for maximum exposure and professional support. Our comprehensive listing services ensure your property reaches the right buyers and sells for the best possible price.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY LIST WITH US
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Premium Listing Services
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
              LISTING PROCESS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {processSteps.map((step, index) => (
              <div key={step.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sea-green text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-midnight-blue mb-4 mt-2">{step.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKETING EXCELLENCE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Strategic Property Marketing</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our marketing approach combines traditional methods with cutting-edge digital strategies to ensure your property stands out in a competitive market. We understand that each property is unique and deserves a tailored marketing plan.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  From professional staging to targeted advertising campaigns, we invest in the right tools and strategies to attract qualified buyers and achieve optimal results.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY TYPES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Residential</h4>
                  <p className="text-sm text-muted-indigo">Homes, condos, townhouses</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Commercial</h4>
                  <p className="text-sm text-muted-indigo">Office, retail, industrial</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Multifamily</h4>
                  <p className="text-sm text-muted-indigo">Duplexes, apartment buildings</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Land</h4>
                  <p className="text-sm text-muted-indigo">Lots, acreage, development sites</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR COMMITMENT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">Dedicated to Your Success</h3>
                <p className="text-muted-indigo leading-relaxed">
                  At One Drive Realty, we are committed to achieving the best possible outcome for your property sale. Our team works tirelessly to ensure your property receives the attention it deserves and sells for the right price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            LIST YOUR PROPERTY TODAY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Start Your Property Sale Journey</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                List Property
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
