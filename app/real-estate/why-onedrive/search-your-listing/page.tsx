'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Search, Map, Camera, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function SearchYourListingPage() {
  const features = [
    {
      icon: Search,
      title: 'Advanced Filters',
      description: 'Powerful search tools to narrow down properties by location, price, size, and specific criteria.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Instant notifications when new properties match your search criteria or when listings change.'
    },
    {
      icon: Map,
      title: 'Map Integration',
      description: 'Interactive maps with property locations, neighborhood information, and proximity to amenities.'
    },
    {
      icon: Camera,
      title: 'Virtual Tours',
      description: 'Immersive 360-degree tours and high-quality photo galleries for remote property viewing.'
    },
    {
      icon: Users,
      title: 'Direct Agent Contact',
      description: 'Connect directly with listing agents for questions, showings, and additional information.'
    }
  ];

  const benefits = [
    {
      title: 'Simplified Discovery',
      description: 'Find properties quickly and efficiently with our intuitive search interface.'
    },
    {
      title: 'Comprehensive Information',
      description: 'Access detailed property data, market insights, and neighborhood statistics.'
    },
    {
      title: 'Time-Saving Tools',
      description: 'Save searches, set alerts, and track favorite properties for streamlined house hunting.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/why-onedrive/search-your-listing" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SEARCH YOUR LISTING</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Simplify property discovery across multiple categories with advanced tools
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Search Four Listing simplifies property discovery across multiple categories. Our advanced platform provides powerful tools and features to help you find the perfect property efficiently and effectively.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SEARCH FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Advanced Property Search Tools
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
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
              SEARCH BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SEARCH CATEGORIES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Residential</h4>
                  <p className="text-sm text-muted-indigo">Homes, condos, apartments</p>
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
                  <p className="text-sm text-muted-indigo">Lots, acreage, development</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TECHNOLOGY ADVANTAGE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Search className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Smart Search Technology</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our search platform leverages cutting-edge technology to provide accurate, fast, and comprehensive property searches. Machine learning algorithms help refine results based on your preferences and behavior.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Whether you're a first-time homebuyer or an experienced investor, our search tools adapt to your needs and help you discover properties that match your exact requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            ACCESS SEARCH SERVICES
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Start Your Property Search Today</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Search Now
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
