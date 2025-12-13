'use client';

import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Code, Headphones, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites, responsive layouts, and e-commerce solutions.',
    link: '/services/web-development',
    icon: <Monitor className="h-12 w-12 text-primary-500 mb-4" />,
  },
  {
    title: 'Mobile App Development',
    description: 'iOS & Android apps with seamless UX.',
    link: '/services/mobile-app-development',
    icon: <Smartphone className="h-12 w-12 text-primary-500 mb-4" />,
  },
  {
    title: 'Software Solutions',
    description: 'Business management and automation applications.',
    link: '/services/software-solutions',
    icon: <Code className="h-12 w-12 text-primary-500 mb-4" />,
  },
  {
    title: 'IT Consulting & Support',
    description: 'Strategy, implementation, and ongoing support.',
    link: '/services/it-consulting',
    icon: <Headphones className="h-12 w-12 text-primary-500 mb-4" />,
  },
  {
    title: 'Cybersecurity Services',
    description: 'Protect your network and sensitive data.',
    link: '/services/cybersecurity',
    icon: <Shield className="h-12 w-12 text-primary-500 mb-4" />,
  },
  {
    title: 'Real Estate IT Solutions',
    description: 'Specialized solutions for real estate businesses.',
    link: '/services/real-estate',
    icon: <Home className="h-12 w-12 text-primary-500 mb-4" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">All IT Services – Explore Our Expertise</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            At Drive Pixel, we provide a wide range of IT services to meet the needs of businesses across different industries. Browse through our services and click on any to learn more.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              {service.icon}
              <h3 className="text-xl font-bold text-primary-900 mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <Link href={service.link}>
                <Button size="lg" className="bg-cta hover:bg-cta-600 text-white">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
