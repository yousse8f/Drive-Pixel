'use client';

import Link from 'next/link';
import { ArrowRight, Mail, TrendingUp, Target, Award, Users, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function List2LastAgentsPage() {
  const programFeatures = [
    {
      icon: Target,
      title: 'Advanced Listing Techniques',
      description: 'Master cutting-edge strategies for securing and managing property listings effectively.'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Support & Tools',
      description: 'Access comprehensive marketing resources and cutting-edge tools to enhance property visibility.'
    },
    {
      icon: Users,
      title: 'Mentorship & Coaching',
      description: 'Receive personalized guidance from experienced listing specialists and top performers.'
    },
    {
      icon: BarChart,
      title: 'Lead Generation & Tracking',
      description: 'Utilize advanced lead generation systems and performance tracking for optimal results.'
    }
  ];

  const opportunities = [
    {
      title: 'Exclusive Opportunities',
      description: 'Access to premium listing opportunities and high-value properties.'
    },
    {
      title: 'Enhanced Visibility',
      description: 'Increased market presence and brand recognition through our platform.'
    },
    {
      title: 'Consistent Growth',
      description: 'Sustainable business growth with predictable listing acquisition.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/list-2-last-agents" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">LIST 2 LAST AGENTS</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Secure more listings and sustain long-term success with specialized training
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              The List 2 Last Agent Program helps agents secure more listings and sustain long-term success. This comprehensive program provides the tools, training, and support needed to become a top-performing listing agent.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROGRAM FEATURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Listing Success System
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {programFeatures.map((feature) => {
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
              AGENT ADVANTAGES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {opportunities.map((opportunity) => (
              <div key={opportunity.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{opportunity.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{opportunity.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SUCCESS STRATEGIES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Proven Methods for Listing Success</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our List 2 Last Agent Program combines proven strategies with modern technology to help agents consistently secure quality listings. We focus on building sustainable listing pipelines that ensure long-term business success.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  From prospecting techniques to closing strategies, our program covers every aspect of the listing process to transform agents into listing specialists.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PERFORMANCE TRACKING
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <h3 className="text-xl font-bold text-midnight-blue mb-4">Data-Driven Results</h3>
              <p className="text-muted-indigo leading-relaxed mb-4">
                Monitor your progress with comprehensive performance tracking and analytics. Our system provides detailed insights into your listing activities, conversion rates, and areas for improvement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Listing Metrics</h4>
                  <p className="text-sm text-muted-indigo">Track acquisition rates and listing quality</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Conversion Analytics</h4>
                  <p className="text-sm text-muted-indigo">Monitor prospect-to-listing conversion rates</p>
                </div>
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-bold text-midnight-blue mb-2">Growth Tracking</h4>
                  <p className="text-sm text-muted-indigo">Measure month-over-month listing growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN LIST 2 LAST PROGRAM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Transform Your Listing Business</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
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
