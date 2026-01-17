'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Users, Handshake, Award, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function BrokerMentorsPage() {
  const programHighlights = [
    {
      icon: Users,
      title: 'Personalized Mentorship',
      description: 'One-on-one guidance tailored to your specific career goals and challenges.'
    },
    {
      icon: Handshake,
      title: 'Hands-on Learning',
      description: 'Practical experience through real transactions and client interactions.'
    },
    {
      icon: Award,
      title: 'Advanced Skill Development',
      description: 'Master sophisticated techniques for negotiation, marketing, and client management.'
    },
    {
      icon: TrendingUp,
      title: 'Career Advancement Support',
      description: 'Strategic planning for long-term growth and professional success.'
    }
  ];

  const mentorBenefits = [
    {
      icon: Target,
      title: 'Continuous Growth',
      description: 'Mentorship continues throughout your career, fostering confidence, leadership, and strategic planning.'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Learn from experienced brokers who have successfully navigated various market conditions.'
    },
    {
      icon: Award,
      title: 'Leadership Development',
      description: 'Build the skills needed to become a leader in the real estate industry.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/agent-commission/broker-mentors" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">BROKER MENTORS</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Connect with experienced brokers for guidance and career growth
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              The Broker Mentorship Program connects agents with experienced brokers for guidance and growth. This comprehensive program is designed to accelerate your career development through personalized support and expert knowledge sharing.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROGRAM HIGHLIGHTS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Mentorship Experience
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {programHighlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{highlight.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{highlight.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MENTORSHIP BENEFITS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {mentorBenefits.map((benefit) => {
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
              LIFELONG SUPPORT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Continuous Career Development</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Mentorship continues throughout an agent's career, fostering confidence, leadership, and strategic planning. Our program adapts to your evolving needs, whether you're just starting out or looking to take your career to the next level.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  The relationship with your mentor grows as you grow, providing ongoing support through market changes, career transitions, and professional challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              BECOME A MENTOR
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <h3 className="text-xl font-bold text-midnight-blue mb-4">Share Your Expertise</h3>
              <p className="text-muted-indigo leading-relaxed">
                Experienced brokers are invited to join our mentorship program and help shape the next generation of real estate professionals. As a mentor, you'll have the opportunity to give back to the industry while refining your own leadership skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            JOIN THE MENTORSHIP PROGRAM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Accelerate Your Career Growth</h2>
          
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
