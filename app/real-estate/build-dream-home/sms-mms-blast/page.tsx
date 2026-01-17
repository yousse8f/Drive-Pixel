'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MessageSquare, Target, Users, TrendingUp, Smartphone, Zap, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function SMSMMSBlastPage() {
  const usage = [
    {
      icon: MessageSquare,
      title: 'Property Listings and Updates',
      description: 'Instant notifications about new properties, price changes, and market updates to keep clients informed.'
    },
    {
      icon: Target,
      title: 'Event Invitations',
      description: 'Personalized invitations for open houses, property tours, and real estate events with RSVP tracking.'
    },
    {
      icon: Users,
      title: 'Personalized Client Follow-ups',
      description: 'Automated yet personalized follow-up messages to nurture leads and maintain client relationships.'
    }
  ];

  const targetAudience = [
    {
      icon: Home,
      title: 'Home Buyers',
      description: 'First-time and experienced buyers seeking timely property information and market updates.'
    },
    {
      icon: TrendingUp,
      title: 'Real Estate Investors',
      description: 'Investors looking for immediate alerts on investment opportunities and market trends.'
    },
    {
      icon: Users,
      title: 'Existing Clients',
      description: 'Current clients receiving updates on their property searches and market conditions.'
    }
  ];

  const keyBenefits = [
    {
      icon: Zap,
      title: 'Immediate Engagement',
      description: 'Instant message delivery ensures immediate attention and response from recipients.'
    },
    {
      icon: TrendingUp,
      title: 'High Open Rates',
      description: 'SMS messages achieve significantly higher open rates compared to traditional email marketing.'
    },
    {
      icon: Smartphone,
      title: 'Personalized Communication',
      description: 'Tailored messages that resonate with individual client needs and preferences.'
    },
    {
      icon: Target,
      title: 'Data-Driven Campaign Optimization',
      description: 'Analytics and insights to continuously improve campaign performance and ROI.'
    }
  ];

  const clientAdvantages = [
    {
      title: 'Instant Notifications',
      description: 'Receive real-time alerts about properties matching your criteria.'
    },
    {
      title: 'Mobile-Friendly Access',
      description: 'Access property information directly on your mobile device anytime, anywhere.'
    },
    {
      title: 'Faster Response Times',
      description: 'Quick communication enables faster decision-making and property viewing scheduling.'
    },
    {
      title: 'Early Access to Listings',
      description: 'Be among the first to know about new properties and market opportunities.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/sms-mms-blast" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">SMS-MMS BLAST</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Direct and effective marketing tool to generate leads and drive sales
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              SMS-MMS blasts are a direct and effective marketing tool used by One Drive Realty to generate leads and drive sales. This powerful communication strategy enables immediate engagement with clients and prospects through personalized mobile messaging.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              USAGE
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Versatile Marketing Applications
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {usage.map((use) => {
              const Icon = use.icon;
              return (
                <div key={use.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{use.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{use.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TARGET AUDIENCE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {targetAudience.map((audience) => {
              const Icon = audience.icon;
              return (
                <div key={audience.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{audience.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{audience.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {keyBenefits.map((benefit) => {
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
              CLIENT ADVANTAGES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {clientAdvantages.map((advantage) => (
              <div key={advantage.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{advantage.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CAMPAIGN STRATEGY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Strategic Message Delivery</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our SMS-MMS campaigns are strategically designed to deliver the right message at the right time. We analyze client behavior, preferences, and engagement patterns to optimize message timing and content for maximum impact.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              COMPLIANCE & BEST PRACTICES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">TCPA Compliance</h4>
                  <p className="text-sm text-muted-indigo">Full compliance with Telephone Consumer Protection Act regulations.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Opt-In Management</h4>
                  <p className="text-sm text-muted-indigo">Respect for client preferences and easy opt-out options.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Message Timing</h4>
                  <p className="text-sm text-muted-indigo">Appropriate scheduling to respect client time zones and preferences.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Content Guidelines</h4>
                  <p className="text-sm text-muted-indigo">Professional, relevant, and valuable content for every message.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PERFORMANCE METRICS
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Open Rate Tracking</h4>
                  <p className="text-sm text-muted-indigo">Monitor message engagement and effectiveness.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Response Rate Analysis</h4>
                  <p className="text-sm text-muted-indigo">Track client responses and conversion metrics.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">ROI Measurement</h4>
                  <p className="text-sm text-muted-indigo">Calculate return on investment for SMS marketing campaigns.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">A/B Testing</h4>
                  <p className="text-sm text-muted-indigo">Test different message formats and content for optimization.</p>
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
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Transform Your Marketing Strategy</h2>
          
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
