'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Package, BarChart3, MapPin, Clock, Shield, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function FreightLogisticsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const services = [
    {
      icon: Truck,
      title: 'Fleet Management System',
      description: [
        'Real-time vehicle tracking and monitoring',
        'Fuel consumption and maintenance tracking',
        'Driver performance and safety analytics'
      ]
    },
    {
      icon: Package,
      title: 'Warehouse Management',
      description: [
        'Inventory tracking and management',
        'Automated picking and packing systems',
        'Real-time stock level monitoring'
      ]
    },
    {
      icon: MapPin,
      title: 'Route Optimization',
      description: [
        'AI-powered route planning',
        'Traffic and weather integration',
        'Multi-stop delivery optimization'
      ]
    },
    {
      icon: BarChart3,
      title: 'Supply Chain Analytics',
      description: [
        'End-to-end supply chain visibility',
        'Predictive analytics and forecasting',
        'Performance KPI dashboards'
      ]
    },
    {
      icon: Clock,
      title: 'Transportation Management',
      description: [
        'Load planning and optimization',
        'Carrier management and selection',
        'Shipment tracking and notifications'
      ]
    },
    {
      icon: Shield,
      title: 'Compliance & Safety',
      description: [
        'Regulatory compliance monitoring',
        'Safety incident tracking',
        'Automated reporting and documentation'
      ]
    }
  ];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setFormError('Full name is required');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Valid email is required');
      return false;
    }
    if (!formData.message.trim()) {
      setFormError('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'freight-logistics-page',
          type: 'freight-logistics-inquiry'
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          company: '',
          message: '',
        });
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormError('Failed to submit form. Please try again.');
      }
    } catch (error) {
      setFormError('An error occurred. Please try again later.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/logistics" fallbackContent={
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
                Freight-Logistics
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
                Transform your logistics operations with our cutting-edge technology solutions. From fleet management to warehouse optimization, we help you deliver faster, smarter, and more efficiently.
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
              OUR LOGISTICS SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Freight & Logistics Solutions
              </h2>
            </div>
            <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
              <p className="text-sm text-white font-medium">
                Streamline your supply chain with our comprehensive logistics technology solutions.
              </p>
            </div>
          </div>
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
                    <ul className="space-y-2 text-sm text-muted-indigo leading-relaxed">
                      {service.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-sea-green flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="mt-4 w-full rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-16">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              GET IN TOUCH
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Get Started Today
              </h2>
            </div>
            <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
              <p className="text-sm text-white font-medium">
                Submit your inquiry and our team will contact you within 24 hours to discuss your freight and logistics needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info Stack */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <Truck className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-midnight-blue">Logistics Solutions</h3>
                <p className="text-sm text-muted-indigo leading-relaxed">Comprehensive freight and logistics management</p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <Mail className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-midnight-blue">Email</h3>
                <p className="text-sm text-muted-indigo leading-relaxed hover:text-royal-blue transition-colors cursor-pointer">logistics@drivepixel.com</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      {formError}
                    </div>
                  )}

                  {formSuccess && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      Thank you! Your inquiry has been submitted successfully. We'll contact you soon.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-midnight-blue mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 bg-white border border-muted-indigo/30 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-midnight-blue mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 bg-white border border-muted-indigo/30 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-midnight-blue mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                      className="w-full px-4 py-2 bg-white border border-muted-indigo/30 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-midnight-blue mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell us about your logistics needs and what solutions you're interested in..."
                      className="w-full px-4 py-2 bg-white border border-muted-indigo/30 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-none bg-metallic-gold hover:bg-amber text-midnight-blue font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
                  >
                    {isSubmitting ? 'Submitting...' : 'Contact Us Today'}
                    {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            READY TO TRANSFORM
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">
            Ready to Transform Your Logistics Operations?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
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
