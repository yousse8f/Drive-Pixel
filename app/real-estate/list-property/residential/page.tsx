'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, Camera, TrendingUp, Users, Target, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function ResidentialPage() {
  const keyServices = [
    {
      icon: Camera,
      title: 'Detailed Property Marketing',
      description: 'High-Quality Presentation: We utilize professional photography, engaging virtual tours, and expert staging recommendations to showcase your home in the best possible light. Our goal is to create an emotional connection with potential buyers from the very first glance.'
    },
    {
      icon: TrendingUp,
      title: 'Market Expertise',
      description: 'In-Depth Insights: Our experienced agents provide valuable insights into neighbourhood trends, pricing strategies, and buyer preferences. This knowledge helps you set the right price for your home, maximizing its appeal and potential return.'
    },
    {
      icon: Users,
      title: 'Wide Network Exposure',
      description: 'Maximum Visibility: Your property will gain extensive exposure through our multiple listing platforms, targeted social media marketing, and proactive local outreach efforts. We leverage our network to ensure your listing reaches the right audience.'
    },
    {
      icon: Target,
      title: 'Personalized Support',
      description: 'Comprehensive Guidance: We partner with you every step of the way—from preparing your home for sale to closing the deal. Our dedicated team is committed to ensuring a smooth and efficient transaction process, addressing any questions or concerns you may have along the way.'
    }
  ];

  const propertyTypes = [
    {
      title: 'Single-Family Homes',
      description: 'Detached houses perfect for families and individuals.'
    },
    {
      title: 'Townhouses',
      description: 'Multi-level attached homes with shared walls.'
    },
    {
      title: 'Condominiums',
      description: 'Individual units in multi-owner buildings.'
    },
    {
      title: 'Apartments',
      description: 'Rental units in apartment buildings.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/list-property/residential" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">RESIDENTIAL</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Professional residential property listing services for maximum market exposure
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              When you list your residential property with One Drive Realty, you ensure that your home reaches potential buyers quickly and efficiently. Whether you have a single-family home, townhouse, or condo, we provide comprehensive support to help your listing stand out in a competitive market.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Residential Listing Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {keyServices.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{service.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-gendrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROPERTY TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {propertyTypes.map((type) => (
              <div key={type.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{type.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              LISTING PROCESS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Home className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Streamlined Listing Experience</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our comprehensive listing process ensures your residential property receives maximum exposure while providing you with expert guidance throughout the entire transaction journey.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKETING ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Professional Photography</h4>
                  <p className="text-sm text-muted-indigo">High-quality images that showcase your home's best features.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Virtual Tours</h4>
                  <p className="text-sm text-muted-indigo">Immersive 360-degree tours for remote viewing.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Expert Staging</h4>
                  <p className="text-sm text-muted-indigo">Professional staging to enhance property appeal.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Digital Marketing</h4>
                  <p className="text-sm text-muted-indigo">Targeted online advertising and social media promotion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SELLER SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Dedicated Transaction Management</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  From preparing your home for sale to closing the deal, our dedicated team ensures a smooth and efficient transaction process. We handle negotiations, paperwork, and coordination with all parties involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            LIST YOUR RESIDENTIAL PROPERTY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Maximize Your Property's Potential</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                List Your Property
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
