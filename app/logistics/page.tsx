'use client';

import Link from 'next/link';
import { ArrowRight, Truck, Package, BarChart3, MapPin, Clock, Shield, Check } from 'lucide-react';
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
      icon: <Truck className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Fleet Management System',
      description: [
        'Real-time vehicle tracking and monitoring',
        'Fuel consumption and maintenance tracking',
        'Driver performance and safety analytics'
      ]
    },
    {
      icon: <Package className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Warehouse Management',
      description: [
        'Inventory tracking and management',
        'Automated picking and packing systems',
        'Real-time stock level monitoring'
      ]
    },
    {
      icon: <MapPin className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Route Optimization',
      description: [
        'AI-powered route planning',
        'Traffic and weather integration',
        'Multi-stop delivery optimization'
      ]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Supply Chain Analytics',
      description: [
        'End-to-end supply chain visibility',
        'Predictive analytics and forecasting',
        'Performance KPI dashboards'
      ]
    },
    {
      icon: <Clock className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Transportation Management',
      description: [
        'Load planning and optimization',
        'Carrier management and selection',
        'Shipment tracking and notifications'
      ]
    },
    {
      icon: <Shield className="h-12 w-12 text-[#10b981] mb-4" />,
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
      <section className="relative py-32 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/Screenshot.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/95"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Freight & Logistics Solutions – Streamline Your Supply Chain</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Transform your logistics operations with our cutting-edge technology solutions. From fleet management to warehouse optimization, we help you deliver faster, smarter, and more efficiently.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-[#1a1f3a] mb-16">Our Freight & Logistics Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col bg-gradient-to-br from-[#10b981]/10 to-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-[#10b981]/20"
              >
                {service.icon}
                <h3 className="text-2xl font-bold text-[#1a1f3a] mb-4">{service.title}</h3>
                <ul className="space-y-3 flex-grow">
                  {service.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-[#1a1f3a] mb-4">Get Started Today</h2>
          <p className="text-center text-gray-600 mb-12">Submit your inquiry and our team will contact you within 24 hours to discuss your freight and logistics needs.</p>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-xl">
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
                <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Tell us about your logistics needs and what solutions you're interested in..."
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cta hover:bg-cta-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Contact Us Today'}
              {!isSubmitting && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1d3b66] to-[#0f172a]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #ffffff33, transparent 45%)' }} />
        </div>
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Logistics Operations?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of logistics companies who are already using our solutions to streamline operations and increase efficiency.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold flex items-center gap-2 px-10 py-4 shadow-xl shadow-[#10b981]/30">
                Schedule a Demo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
