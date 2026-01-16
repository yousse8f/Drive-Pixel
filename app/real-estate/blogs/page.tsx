'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, FileText, Lightbulb, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function REBlogsPage() {
  const contentAreas = [
    {
      icon: TrendingUp,
      title: 'Market Updates',
      description: 'Stay informed with the latest real estate market trends, data, and analysis.'
    },
    {
      icon: Lightbulb,
      title: 'Investment Education',
      description: 'Learn strategies and best practices for real estate investment success.'
    },
    {
      icon: FileText,
      title: 'Regulatory Topics',
      description: 'Understand compliance requirements, legal updates, and industry regulations.'
    },
    {
      icon: BookOpen,
      title: 'General Real Estate Knowledge',
      description: 'Access educational resources for agents, investors, and property owners.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">R/E BLOGS</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Real estate insights, updates, and educational resources
          </p>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              REAL ESTATE BLOGS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Insights, Updates, and Educational Resources
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              R/E Blogs is an informational content section designed to provide insights, updates, and educational resources related to real estate markets, investment strategies, and industry trends.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CONTENT FOCUS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                For Agents, Investors, and Property Owners
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contentAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="flex flex-col gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] min-h-[180px]">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-midnight-blue mb-2 leading-tight">{area.title}</h3>
                      <p className="text-sm text-muted-indigo leading-relaxed break-words">{area.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KNOWLEDGE & INDUSTRY INSIGHT
            </div>
          </div>

          <div className="rounded-lg border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
            <div className="space-y-4">
              <p className="text-lg text-muted-indigo leading-relaxed text-center">
                One Drive Realty uses R/E Blogs as a knowledge-sharing platform to support informed decision-making and industry awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            STAY INFORMED
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Ready to Access Real Estate Insights?</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us Now
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Contact Us
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
