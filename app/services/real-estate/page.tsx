'use client';

import Link from 'next/link';
import { ArrowRight, Users, Home, Megaphone, Code, BarChart3, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function RealEstateITSolutionsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState<{ [key: string]: 'monthly' | 'oneYear' | 'threeYear' | 'fiveYear' }>({
    'CRM Systems': 'monthly',
    'Property Management Automation': 'monthly',
    'Marketing & Lead Generation': 'monthly',
    'Custom Real Estate Software': 'monthly',
    'Data Analysis & Insights': 'monthly',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const services = [
    {
      icon: <Users className="h-12 w-12 text-primary-500 mb-4" />,
      title: 'CRM Systems for Real Estate',
      description: [
        'Centralized client and lead management',
        'Automated follow-up reminders and workflows',
        'Integration with email and communication tools'
      ]
    },
    {
      icon: <Home className="h-12 w-12 text-primary-500 mb-4" />,
      title: 'Property Management Automation',
      description: [
        'Track listings, rentals, and maintenance schedules',
        'Automated tenant communication and notifications',
        'Financial reporting and expense tracking'
      ]
    },
    {
      icon: <Megaphone className="h-12 w-12 text-primary-500 mb-4" />,
      title: 'Marketing & Lead Generation Tools',
      description: [
        'Email campaign management and automation',
        'Social media integration and scheduling',
        'Lead capture forms and analytics dashboards'
      ]
    },
    {
      icon: <Code className="h-12 w-12 text-primary-500 mb-4" />,
      title: 'Custom Real Estate Software',
      description: [
        'MLS integration and property database management',
        'E-signature and document management solutions',
        'Custom dashboards and reporting tools'
      ]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-primary-500 mb-4" />,
      title: 'Data Analysis & Insights',
      description: [
        'Market trend analysis and forecasting',
        'Investment opportunity identification',
        'Performance metrics and KPI tracking'
      ]
    }
  ];

  const pricingPlans = [
    {
      service: '100% Sponsorship',
      monthly: '$176',
      oneYear: '$149.60',
      threeYear: '$140.80',
      fiveYear: '$132'
    },
    {
      service: 'IDX-DLFX',
      monthly: '$90',
      oneYear: '$82',
      threeYear: '$76.50',
      fiveYear: '$72'
    },
    {
      service: 'Website + E-Mail',
      monthly: '$160',
      oneYear: '$144',
      threeYear: '$136',
      fiveYear: '$128'
    },
    {
      service: '1 Creative Yard Post Sign Unit',
      monthly: '$190',
      oneYear: '$171',
      threeYear: '$161.50',
      fiveYear: '$152'
    },
    {
      service: '5 Creative Yard Post Sign Units',
      monthly: '$950',
      oneYear: '$855',
      threeYear: '$807.50',
      fiveYear: '$760'
    }
  ];

  const serviceFeatures: { [key: string]: string[] } = {
    '100% Sponsorship': [
      'Full brand visibility and recognition',
      'Premium placement and exposure',
      'Exclusive partnership benefits',
      'Marketing support and promotion',
      'Priority customer support'
    ],
    'IDX-DLFX': [
      'Advanced property search functionality',
      'Real-time MLS data integration',
      'Customizable search filters',
      'Lead capture capabilities',
      'Mobile-responsive design'
    ],
    'Website + E-Mail': [
      'Professional website design',
      'Email hosting and management',
      'SSL security certificate',
      'Email templates and automation',
      'Technical support included'
    ],
    '1 Creative Yard Post Sign Unit': [
      'High-quality yard sign design',
      'Weather-resistant materials',
      'Professional installation support',
      'Customizable branding',
      'Durable construction'
    ],
    '5 Creative Yard Post Sign Units': [
      'Bulk pricing discount',
      'Consistent branding across units',
      'Professional installation support',
      'Weather-resistant materials',
      'Replacement guarantee'
    ]
  };

  const getFeaturesByService = (service: string): string[] => {
    return serviceFeatures[service] || [];
  };

  const getPriceByPeriod = (plan: typeof pricingPlans[0], period: 'monthly' | 'oneYear' | 'threeYear' | 'fiveYear'): string => {
    return plan[period as keyof typeof plan] as string;
  };

  const getPeriodLabel = (period: 'monthly' | 'oneYear' | 'threeYear' | 'fiveYear'): string => {
    const labels: { [key: string]: string } = {
      monthly: 'Monthly',
      oneYear: '1-Year',
      threeYear: '3-Year',
      fiveYear: '5-Year'
    };
    return labels[period];
  };

  const handlePeriodChange = (service: string, period: 'monthly' | 'oneYear' | 'threeYear' | 'fiveYear') => {
    setSelectedPeriods(prev => ({
      ...prev,
      [service]: period
    }));
  };

  const handlePurchase = async (service: string, price: string, period: string) => {
    if (price === 'Custom') {
      window.location.href = '/contact';
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          price: parseInt(price.replace('$', '')),
          billingPeriod: period,
          userEmail: formData.email || '',
          userName: formData.fullName || '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else if (data.sessionId) {
          window.location.href = `/checkout?sessionId=${data.sessionId}`;
        }
      } else {
        alert('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

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
    if (!formData.phone.trim()) {
      setFormError('Phone number is required');
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
          source: 'real-estate-page',
          type: 'real-estate-inquiry'
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
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
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Estate IT Solutions – Smart Tools for Property Professionals</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Our specialized IT solutions help real estate agencies and property managers streamline operations, improve client communication, and grow their business efficiently.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-primary-900 mb-16">Our Real Estate Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col bg-gradient-to-br from-primary-100 to-gray-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {service.icon}
                <h3 className="text-2xl font-bold text-primary-900 mb-4">{service.title}</h3>
                <ul className="space-y-3 flex-grow">
                  {service.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-6">Pricing Plans for Real Estate Professionals</h2>
            <p className="text-gray-600 mb-8">Choose the plan that fits your business needs. All plans include 24/7 support and regular updates.</p>
          </div>

          {/* Pricing Cards - 3 Top, 2 Bottom */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full px-2 sm:px-4">
            {/* Top Row - 3 Cards */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full">
              {pricingPlans.slice(0, 3).map((plan, index) => {
                const selectedPeriod = selectedPeriods[plan.service] || 'monthly';
                const displayPrice = getPriceByPeriod(plan, selectedPeriod);
                const isPopular = index === 1;

                return (
                  <div
                    key={index}
                    className={`w-full xs:w-80 sm:w-72 lg:w-80 flex flex-col rounded-xl border-2 transition-all duration-300 max-w-sm ${isPopular
                        ? 'border-primary-500 shadow-lg'
                        : 'border-gray-300 shadow-md hover:shadow-lg hover:border-primary-400'
                      } ${isPopular ? 'bg-gradient-to-br from-primary-50 to-white' : 'bg-white'}`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                          Popular
                        </span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-primary-900 mb-4 leading-tight line-clamp-2">{plan.service}</h3>

                      <div className="mb-5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {(['monthly', 'oneYear', 'threeYear', 'fiveYear'] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => handlePeriodChange(plan.service, period)}
                              className={`py-2 px-2 rounded text-xs font-semibold transition-all duration-200 ${selectedPeriod === period
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                              {getPeriodLabel(period)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {plan.monthly !== 'Custom' ? (
                        <div className="mb-5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary-700">{displayPrice}</span>
                            <span className="text-gray-600 font-semibold text-xs">
                              {selectedPeriod === 'monthly' ? '/mo' : '/yr'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-5">
                          <p className="text-2xl font-bold text-primary-700">Custom</p>
                        </div>
                      )}

                      <ul className="space-y-2 mb-5 flex-grow">
                        {getFeaturesByService(plan.service).slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePurchase(plan.service, displayPrice, selectedPeriod)}
                        disabled={isProcessing}
                        className={`w-full py-2 px-4 rounded font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-1 ${isPopular
                            ? 'bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50'
                            : 'bg-gray-100 text-primary-900 hover:bg-primary-100 disabled:opacity-50'
                          }`}
                      >
                        {isProcessing ? 'Processing...' : 'Get Started'}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Row - 2 Cards Centered */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full mt-4">
              {pricingPlans.slice(3, 5).map((plan, index) => {
                const actualIndex = index + 3;
                const selectedPeriod = selectedPeriods[plan.service] || 'monthly';
                const displayPrice = getPriceByPeriod(plan, selectedPeriod);
                const isPopular = actualIndex === 1;

                return (
                  <div
                    key={actualIndex}
                    className={`w-full xs:w-80 sm:w-72 lg:w-80 flex flex-col rounded-xl border-2 transition-all duration-300 max-w-sm ${isPopular
                        ? 'border-primary-500 shadow-lg'
                        : 'border-gray-300 shadow-md hover:shadow-lg hover:border-primary-400'
                      } ${isPopular ? 'bg-gradient-to-br from-primary-50 to-white' : 'bg-white'}`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                          Popular
                        </span>
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-primary-900 mb-4 leading-tight line-clamp-2">{plan.service}</h3>

                      <div className="mb-5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {(['monthly', 'oneYear', 'threeYear', 'fiveYear'] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => handlePeriodChange(plan.service, period)}
                              className={`py-2 px-2 rounded text-xs font-semibold transition-all duration-200 ${selectedPeriod === period
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                              {getPeriodLabel(period)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {plan.monthly !== 'Custom' ? (
                        <div className="mb-5">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-primary-700">{displayPrice}</span>
                            <span className="text-gray-600 font-semibold text-xs">
                              {selectedPeriod === 'monthly' ? '/mo' : '/yr'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-5">
                          <p className="text-2xl font-bold text-primary-700">Custom</p>
                        </div>
                      )}

                      <ul className="space-y-2 mb-5 flex-grow">
                        {getFeaturesByService(plan.service).slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePurchase(plan.service, displayPrice, selectedPeriod)}
                        disabled={isProcessing}
                        className={`w-full py-2 px-4 rounded font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-1 ${isPopular
                            ? 'bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50'
                            : 'bg-gray-100 text-primary-900 hover:bg-primary-100 disabled:opacity-50'
                          }`}
                      >
                        {isProcessing ? 'Processing...' : 'Get Started'}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-gray-600 mt-12 text-sm">
            *Custom solutions available. All plans include 24/7 support, regular updates, and a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-primary-900 mb-4">Get Started Today</h2>
          <p className="text-center text-gray-600 mb-12">Submit your inquiry and our team will contact you within 24 hours to discuss your real estate IT needs.</p>

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
                <label className="block text-sm font-semibold text-primary-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">Company/Agency</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-900 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                placeholder="Tell us about your real estate business and what solutions you're interested in..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all resize-none"
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
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary-900">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join hundreds of real estate professionals who are already using our solutions to streamline operations and increase productivity.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-primary-500 text-white hover:bg-primary-600 font-semibold flex items-center gap-2 px-8 py-3">
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
