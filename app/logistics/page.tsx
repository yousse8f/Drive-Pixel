'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Package, BarChart3, MapPin, Clock, Shield, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

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
      icon: <Truck className="h-8 w-8 text-white" />,
      title: 'Fleet Management System',
      description: [
        'Real-time vehicle tracking and monitoring',
        'Fuel consumption and maintenance tracking',
        'Driver performance and safety analytics'
      ]
    },
    {
      icon: <Package className="h-8 w-8 text-white" />,
      title: 'Warehouse Management',
      description: [
        'Inventory tracking and management',
        'Automated picking and packing systems',
        'Real-time stock level monitoring'
      ]
    },
    {
      icon: <MapPin className="h-8 w-8 text-white" />,
      title: 'Route Optimization',
      description: [
        'AI-powered route planning',
        'Traffic and weather integration',
        'Multi-stop delivery optimization'
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: 'Supply Chain Analytics',
      description: [
        'End-to-end supply chain visibility',
        'Predictive analytics and forecasting',
        'Performance KPI dashboards'
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: 'Transportation Management',
      description: [
        'Load planning and optimization',
        'Carrier management and selection',
        'Shipment tracking and notifications'
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
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

      {/* Hero Section */}
      <section className="relative py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/Services.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Freight & Logistics Solutions</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transform your logistics operations with our cutting-edge technology solutions. From fleet management to warehouse optimization, we help you deliver faster, smarter, and more efficiently.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-6">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              OUR SERVICES
            </div>
            <h2 className="text-center text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
              Freight & Logistics Solutions
            </h2>
            <div className="w-full rounded-none bg-[#8c75b6] border-2 border-white shadow-[0_6px_0_rgba(255,255,255,0.35)] py-1 text-center px-2">
              <p className="text-sm text-white font-medium">
                Streamline your supply chain with our comprehensive logistics technology solutions.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform relative"
              >
                <div className="flex flex-col items-center gap-4 flex-1">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#33202b]">{service.title}</h3>
                  <ul className="space-y-2 text-sm text-[#4f2c33] leading-relaxed">
                    {service.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#17b58f] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-4 inline-flex items-center gap-2 rounded-none bg-[#1f4f78] text-white font-semibold py-2 px-6 border border-[#112a45] shadow-[0_6px_0_#0e2e46] text-xs tracking-[0.25em] uppercase">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-10 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-6">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              GET IN TOUCH
            </div>
            <h2 className="text-center text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
              Get Started Today
            </h2>
            <div className="w-full rounded-none bg-[#8c75b6] border-2 border-white shadow-[0_4px_0_rgba(255,255,255,0.35)] py-1 text-center px-1">
              <p className="text-sm text-white font-medium">
                Submit your inquiry and our team will contact you within 24 hours to discuss your freight and logistics needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info Stack */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform">
                <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#33202b]">Logistics Solutions</h3>
                <p className="text-sm text-[#4f2c33] leading-relaxed">Comprehensive freight and logistics management</p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform">
                <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#33202b]">Email</h3>
                <p className="text-sm text-[#4f2c33] leading-relaxed hover:text-[#1f4f78] transition-colors cursor-pointer">logistics@drivepixel.com</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-8 py-10 shadow-[0_12px_0_0_#d37377]">
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
                      <label className="block text-sm font-semibold text-[#33202b] mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#33202b] mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#33202b] mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Name"
                      className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#33202b] mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Tell us about your logistics needs and what solutions you're interested in..."
                      className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-none bg-gradient-to-b from-[#8c6fca] to-[#7a5cb4] text-white font-bold tracking-wide px-2 py-1 border-[4px] border-white hover:from-[#9b7cd9] hover:to-[#8a6bc4] transition-all duration-300 text-lg transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <section className="py-16 bg-[#080f24]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12 text-center">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#c76d6f] shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#2f0f16]">
              READY TO TRANSFORM
            </div>
            <h2 className="text-[clamp(1.9rem,4vw,2.9rem)] font-black text-white">
              Ready to Transform Your Logistics Operations?
            </h2>
            
          </div>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg">
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
