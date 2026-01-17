'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Globe, Home, Users, Search, MessageSquare, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function OwnREWebsitePage() {
  const websiteFeatures = [
    {
      icon: Globe,
      title: 'Custom Design',
      description: 'Professionally designed websites that reflect your unique brand and style.'
    },
    {
      icon: Home,
      title: 'Property Listings Integration',
      description: 'Seamless integration with your property listings and MLS data.'
    },
    {
      icon: Users,
      title: 'Lead Capture Forms',
      description: 'Optimized forms to capture and convert website visitors into leads.'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Search engine optimization to improve your online visibility and ranking.'
    }
  ];

  const additionalFeatures = [
    {
      icon: MessageSquare,
      title: 'Mobile-Friendly Layout',
      description: 'Responsive design that works perfectly on all devices and screen sizes.'
    },
    {
      icon: Share2,
      title: 'Blogging Platform',
      description: 'Integrated blog for sharing market insights and building authority.'
    },
    {
      icon: Star,
      title: 'Testimonials Section',
      description: 'Showcase client success stories and build trust with potential clients.'
    },
    {
      icon: Globe,
      title: 'Social Media Integration',
      description: 'Connect your website with social media platforms for maximum reach.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/own-real-estate-website" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">OWN R/E WEBSITE</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Create your fully integrated personal real estate website
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty assists agents in creating fully integrated personal real estate websites. A personal website enhances brand visibility, lead generation, and client engagement.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WEBSITE FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Real Estate Websites
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {websiteFeatures.map((feature) => {
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
              ADDITIONAL FEATURES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {additionalFeatures.map((feature) => {
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
              BUSINESS ADVANTAGES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Elevate Your Real Estate Business</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  A personal real estate website is more than just an online presence—it's a powerful business tool that works 24/7 to generate leads, showcase your expertise, and build your professional brand.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our websites are designed specifically for real estate professionals, with features that help you stand out in a competitive market and attract qualified leads consistently.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TECHNICAL SPECIFICATIONS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <h3 className="text-xl font-bold text-midnight-blue mb-4">Built for Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Technology Stack</h4>
                  <ul className="space-y-1 text-muted-indigo">
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      Modern, responsive frameworks
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      Fast loading speeds
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      Secure HTTPS protocol
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Integration Capabilities</h4>
                  <ul className="space-y-1 text-muted-indigo">
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      MLS data synchronization
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      CRM system integration
                    </li>
                    <li className="flex items-start">
                      <span className="text-sea-green mr-2">•</span>
                      Email marketing tools
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            GET YOUR PERSONAL WEBSITE
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Launch Your Online Presence Today</h2>
          
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
