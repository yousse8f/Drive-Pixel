'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MessageSquare, Target, TrendingUp, Smartphone, Zap, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function SMSMMSBlastPage() {
  const howItWorks = [
    {
      icon: Target,
      title: 'Targeted Outreach',
      description: 'Curated lists of buyers and agents specifically interested in your property type and location.'
    },
    {
      icon: TrendingUp,
      title: 'High Open Rates',
      description: 'More effective than email marketing with significantly higher engagement and response rates.'
    },
    {
      icon: Smartphone,
      title: 'Rich Media Integration',
      description: 'Photos, videos, and virtual tours delivered directly to mobile devices.'
    },
    {
      icon: BarChart,
      title: 'Real-Time Analytics',
      description: 'Track engagement metrics and campaign performance in real-time.'
    }
  ];

  const benefits = [
    {
      title: 'Immediate Engagement',
      description: 'Instant message delivery ensures immediate attention from recipients.'
    },
    {
      title: 'Higher Response Rates',
      description: 'SMS marketing achieves significantly better response rates than traditional methods.'
    },
    {
      title: 'Mobile Optimization',
      description: 'Messages are perfectly formatted for mobile device viewing and interaction.'
    },
    {
      title: 'Cost Effective',
      description: 'Lower cost per lead compared to traditional advertising methods.'
    }
  ];

  const campaignTypes = [
    {
      title: 'New Listing Alerts',
      description: 'Immediate notifications when your property hits the market.'
    },
    {
      title: 'Price Reduction Updates',
      description: 'Targeted alerts about price changes and special offers.'
    },
    {
      title: 'Open House Invitations',
      description: 'Personalized invitations for property viewings and events.'
    },
    {
      title: 'Market Updates',
      description: 'Regular market insights and property trend information.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/list-property/sms-mms-blast" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SMS MMS BLAST</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Direct communication marketing to maximize property exposure
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              Direct communication marketing to maximize property exposure. Our SMS-MMS Blast service delivers your property information directly to interested buyers and agents through targeted mobile messaging campaigns.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              HOW IT WORKS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Effective Mobile Marketing Strategy
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {howItWorks.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{step.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CAMPAIGN BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CAMPAIGN TYPES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {campaignTypes.map((type) => (
              <div key={type.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{type.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              RICH MEDIA FEATURES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Smartphone className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Multimedia Messaging</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our MMS capabilities allow you to send high-quality photos, video tours, and virtual walkthroughs directly to potential buyers' mobile devices, creating an immersive property viewing experience that drives engagement and accelerates decision-making.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ANALYTICS & TRACKING
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <BarChart className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Real-Time Performance Tracking</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Monitor campaign performance with detailed analytics including open rates, click-through rates, response rates, and conversion metrics. Real-time data allows you to optimize campaigns for maximum effectiveness.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TARGET AUDIENCE
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Qualified Buyers</h4>
                  <p className="text-sm text-muted-indigo">Active property seekers with verified interest.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Real Estate Agents</h4>
                  <p className="text-sm text-muted-indigo">Professional agents with active client portfolios.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Investors</h4>
                  <p className="text-sm text-muted-indigo">Real estate investors seeking new opportunities.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Previous Clients</h4>
                  <p className="text-sm text-muted-indigo">Warm leads from past transactions and inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            ACTIVATE SMS-MMS MARKETING
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Transform Your Property Marketing</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Campaign
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
