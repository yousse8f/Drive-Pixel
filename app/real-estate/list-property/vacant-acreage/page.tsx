'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Map, Target, TrendingUp, Camera, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function VacantAcreagePage() {
  const specializedServices = [
    {
      icon: Target,
      title: 'Market Segmentation',
      description: 'Identify buyer personas and target markets for optimal exposure.'
    },
    {
      icon: Building,
      title: 'Development Potential',
      description: 'Data on infrastructure, zoning, and environmental considerations.'
    },
    {
      icon: Camera,
      title: 'Presentation and Marketing',
      description: 'GIS maps, drone footage, and high-quality images.'
    },
    {
      icon: Users,
      title: 'Local and National Exposure',
      description: 'Access to a broad network of investors and developers.'
    }
  ];

  const acreageTypes = [
    {
      title: 'Agricultural Land',
      description: 'Farms and ranches for agricultural development.'
    },
    {
      title: 'Recreational Land',
      description: 'Properties for outdoor activities and recreation.'
    },
    {
      title: 'Development Land',
      description: 'Large parcels suitable for subdivision and development.'
    },
    {
      title: 'Investment Land',
      description: 'Strategic land holdings for long-term appreciation.'
    }
  ];

  const buyerProfiles = [
    {
      title: 'Developers',
      description: 'Real estate development companies seeking large parcels.'
    },
    {
      title: 'Investors',
      description: 'Individual and institutional land investors.'
    },
    {
      title: 'Farmers',
      description: 'Agricultural producers seeking expansion opportunities.'
    },
    {
      title: 'Conservation Groups',
      description: 'Organizations focused on land preservation.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/list-property/vacant-acreage" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VACANT ACREAGE</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Large-scale land listings for developers, investors, and agricultural buyers
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Vacant acreage appeals to developers, investors, or agricultural buyers. One Drive Realty ensures maximum visibility for your property through specialized marketing strategies and extensive industry networks.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SPECIALIZED SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Acreage Marketing
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {specializedServices.map((service) => {
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
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ACREAGE TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {acreageTypes.map((type) => (
              <div key={type.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{type.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TARGET BUYERS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {buyerProfiles.map((profile) => (
              <div key={profile.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{profile.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{profile.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKETING TECHNOLOGY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Camera className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Advanced Presentation Tools</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  We utilize GIS mapping technology, professional drone footage, and high-resolution imagery to showcase your acreage's full potential. Our comprehensive marketing materials help buyers visualize development opportunities and land features.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              DEVELOPMENT ANALYSIS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Building className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Comprehensive Development Assessment</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our team provides detailed analysis of infrastructure availability, zoning regulations, environmental considerations, and development potential. This comprehensive approach helps buyers make informed decisions and maximizes your property's market appeal.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              NETWORK ADVANTAGE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Extensive Industry Connections</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our broad network of local and national investors, developers, and agricultural buyers ensures your vacant acreage receives maximum exposure to qualified prospects actively seeking large land opportunities.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TRANSACTION SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Due Diligence Support</h4>
                  <p className="text-sm text-muted-indigo">Assistance with property inspections and documentation.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Environmental Assessments</h4>
                  <p className="text-sm text-muted-indigo">Coordination of environmental studies and reports.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Zoning Research</h4>
                  <p className="text-sm text-muted-indigo">Comprehensive zoning and land use analysis.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Market Valuation</h4>
                  <p className="text-sm text-muted-indigo">Professional acreage valuation and appraisal support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            LIST YOUR VACANT ACREAGE
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Maximize Your Land Investment</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                List Your Acreage
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
