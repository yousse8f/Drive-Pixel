'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Database, Search, Target, Globe, TrendingUp, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function VacantLandAPIPage() {
  const features = [
    {
      icon: Database,
      title: 'Up-to-Date Land Availability Data',
      description: 'Real-time access to current vacant land listings with comprehensive property information and availability status.'
    },
    {
      icon: Search,
      title: 'Custom Search Filters',
      description: 'Advanced filtering options allowing users to search by location, size, zoning, price, and specific development requirements.'
    },
    {
      icon: Map,
      title: 'Zoning and Development Insights',
      description: 'Detailed zoning information and development potential analysis for each listed property.'
    },
    {
      icon: Globe,
      title: 'Integration with CYPS Marketing Technology',
      description: 'Seamless integration with our CYPS marketing platform for enhanced property promotion and exposure.'
    }
  ];

  const capabilities = [
    {
      title: 'Real-Time Data Updates',
      description: 'Instant updates on new listings, price changes, and property availability.'
    },
    {
      title: 'Comprehensive Property Details',
      description: 'Complete information including parcel data, utilities access, topography, and restrictions.'
    },
    {
      title: 'Geographic Information Systems',
      description: 'Advanced mapping capabilities with satellite imagery and parcel boundary visualization.'
    },
    {
      title: 'Market Analysis Tools',
      description: 'Built-in analytics for property valuation and market trend analysis.'
    }
  ];

  const benefits = [
    {
      title: 'Competitive Advantage',
      description: 'Early access to prime land opportunities before they hit the open market.'
    },
    {
      title: 'Informed Decision Making',
      description: 'Data-driven insights for strategic land acquisition and development planning.'
    },
    {
      title: 'Time Efficiency',
      description: 'Streamlined property search process saving valuable research time.'
    }
  ];

  const useCases = [
    {
      title: 'Real Estate Developers',
      description: 'Identify development opportunities and assess project feasibility.'
    },
    {
      title: 'Investment Firms',
      description: 'Analyze land investment potential and portfolio diversification opportunities.'
    },
    {
      title: 'Construction Companies',
      description: 'Find suitable land for upcoming projects and expansion plans.'
    },
    {
      title: 'Individual Buyers',
      description: 'Search for residential or commercial land for personal development.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/vacant-land-api" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VACANT LAND API</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Real-time access to vacant land listings for development and investment
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Our Vacant Land API provides real-time access to vacant land listings for development and investment. This powerful tool empowers your land acquisition strategy with comprehensive data and advanced search capabilities.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Advanced Land Search Technology
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
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
              TECHNICAL CAPABILITIES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {capabilities.map((capability) => (
              <div key={capability.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{capability.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              STRATEGIC BENEFITS
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
              USE CASES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{useCase.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              API INTEGRATION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Seamless Integration</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our API is designed for easy integration with existing systems and platforms. Comprehensive documentation and developer support ensure smooth implementation and rapid deployment.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DATA SECURITY & RELIABILITY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Secure Data Transmission</h4>
                  <p className="text-sm text-muted-indigo">Encrypted API endpoints and secure authentication protocols.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">High Availability</h4>
                  <p className="text-sm text-muted-indigo">99.9% uptime guarantee with redundant infrastructure.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Rate Limiting</h4>
                  <p className="text-sm text-muted-indigo">Fair usage policies to ensure optimal performance for all users.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Regular Updates</h4>
                  <p className="text-sm text-muted-indigo">Continuous improvements and feature enhancements.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUPPORT & DOCUMENTATION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Comprehensive Developer Support</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Detailed API documentation, code examples, and dedicated technical support ensure successful integration and optimal utilization of our land data platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EMPOWER YOUR LAND ACQUISITION STRATEGY
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Transform Your Land Search Process</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Get API Access
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
