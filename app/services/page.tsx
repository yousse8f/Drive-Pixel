'use client';

import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Code, Headphones, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites, responsive layouts, and e-commerce solutions.',
    link: '/services/web-development',
    icon: Monitor,
  },
  {
    title: 'Mobile App Development',
    description: 'iOS & Android apps with seamless UX.',
    link: '/services/mobile-app-development',
    icon: Smartphone,
  },
  {
    title: 'Custom Software Solutions',
    description: 'Business management and automation applications.',
    link: '/services/software-solutions',
    icon: Code,
  },
  {
    title: 'IT Consulting',
    description: 'Strategy, implementation, and ongoing support.',
    link: '/services/it-consulting',
    icon: Headphones,
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your network and sensitive data.',
    link: '/services/cybersecurity',
    icon: Shield,
  },
  {
    title: 'Real Estate IT Solutions',
    description: 'Specialized solutions for real estate businesses.',
    link: '/services/real-estate',
    icon: Home,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/services" fallbackContent={
        <section
          className="relative text-white overflow-hidden pt-16 pb-12"
          style={{
            backgroundImage: 'url(/images/Services.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '50vh',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
          
          {/* Content */}
          <div className="container-custom relative z-10 flex justify-center items-center" style={{ minHeight: '40vh' }}>
            <div className="max-w-4xl w-full text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                All IT Services – Explore Our Expertise
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
                At Drive Pixel, we provide a wide range of IT services to meet the needs of businesses across different industries. Browse through our services and click on any to learn more.
              </p>
            </div>
          </div>
        </section>
      } />

      {/* Services Section */}
      <section className="py-20 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-16">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive IT Solutions for Your Business
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative"
                >
                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-midnight-blue">{service.title}</h3>
                    <p className="text-sm text-muted-indigo leading-relaxed">{service.description}</p>
                  </div>
                  
                  <Link href={service.link} className="w-full">
                    <button className="w-full rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
                      <span>Learn More</span>
                      <span aria-hidden>→</span>
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
