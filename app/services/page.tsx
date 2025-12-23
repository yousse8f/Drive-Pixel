'use client';

import Link from 'next/link';
import { ArrowRight, Monitor, Smartphone, Code, Headphones, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Water fill effect styles
const waterFillStyle = `
  .water-button {
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  
  .water-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0%;
    background: rgba(255, 255, 255, 0.2);
    transition: .5s;
    z-index: -1;
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    transform: scale(1.5);
  }
  
  .water-button:hover::before {
    height: 180%;
  }
  
  .water-button:active::before {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites, responsive layouts, and e-commerce solutions.',
    link: '/services/web-development',
    icon: <Monitor className="h-12 w-12 text-[#10b981] mb-4" />,
  },
  {
    title: 'Mobile App Development',
    description: 'iOS & Android apps with seamless UX.',
    link: '/services/mobile-app-development',
    icon: <Smartphone className="h-12 w-12 text-[#10b981] mb-4" />,
  },
  {
    title: 'Software Solutions',
    description: 'Business management and automation applications.',
    link: '/services/software-solutions',
    icon: <Code className="h-12 w-12 text-[#10b981] mb-4" />,
  },
  {
    title: 'IT Consulting & Support',
    description: 'Strategy, implementation, and ongoing support.',
    link: '/services/it-consulting',
    icon: <Headphones className="h-12 w-12 text-[#10b981] mb-4" />,
  },
  {
    title: 'Cybersecurity Services',
    description: 'Protect your network and sensitive data.',
    link: '/services/cybersecurity',
    icon: <Shield className="h-12 w-12 text-[#10b981] mb-4" />,
  },
  {
    title: 'Real Estate IT Solutions',
    description: 'Specialized solutions for real estate businesses.',
    link: '/services/real-estate',
    icon: <Home className="h-12 w-12 text-[#10b981] mb-4" />,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <style>{waterFillStyle}</style>
      <Navbar />
      <section className="relative py-32 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/Services.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f3a]/40 to-[#1a1f3a]/40"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">All IT Services – Explore Our Expertise</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            At Drive Pixel, we provide a wide range of IT services to meet the needs of businesses across different industries. Browse through our services and click on any to learn more.
          </p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center bg-gradient-to-br from-[#10b981]/10 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              {service.icon}
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <Link href={service.link}>
                <Button 
                  size="lg" 
                  className="water-button relative bg-[#10b981] hover:bg-[#059669] text-white overflow-hidden transition-all duration-500"
                >
                  <span className="relative z-10 flex items-center">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
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
