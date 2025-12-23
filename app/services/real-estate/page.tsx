'use client';

import Link from 'next/link';
import { ArrowRight, Users, Home, Megaphone, Code, BarChart3, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { publicApiClient } from '@/lib/public-api-client';
import { useCart } from '@/lib/hooks/useCart';

export default function RealEstateITSolutionsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
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
  const [purchaseMessage, setPurchaseMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      try {
        const res = await publicApiClient.getProducts();
        if (res.success && res.data) {
          const parsed = (res.data as any[]).map((p) => ({
            id: p.id,
            name: p.name as string,
          }));
          setProducts(parsed);
        }
      } catch (error) {
        console.error('Failed to load products for plans', error);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productLookup = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => {
      map.set(p.name.toLowerCase(), p.id);
    });
    return map;
  }, [products]);

  const findProductIdForService = (service: string, period?: string) => {
    const normalized = service.toLowerCase();
    const candidates: string[] = [normalized];

    if (period) {
      const periodLabel = getPeriodLabel(period as any).toLowerCase();
      candidates.push(`${normalized} - ${periodLabel}`);
      candidates.push(`${normalized} (${periodLabel})`);
      candidates.push(`${normalized} ${periodLabel}`);
      candidates.push(`${normalized} ${period}`);
    }

    for (const key of candidates) {
      if (productLookup.has(key)) return productLookup.get(key)!;
    }

    const fuzzy = products.find((p) => candidates.some((cand) => p.name.toLowerCase().includes(cand)));
    return fuzzy?.id;
  };

  const services = [
    {
      icon: <Users className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'CRM Systems for Real Estate',
      description: [
        'Centralized client and lead management',
        'Automated follow-up reminders and workflows',
        'Integration with email and communication tools'
      ]
    },
    {
      icon: <Home className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Property Management Automation',
      description: [
        'Track listings, rentals, and maintenance schedules',
        'Automated tenant communication and notifications',
        'Financial reporting and expense tracking'
      ]
    },
    {
      icon: <Megaphone className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Marketing & Lead Generation Tools',
      description: [
        'Email campaign management and automation',
        'Social media integration and scheduling',
        'Lead capture forms and analytics dashboards'
      ]
    },
    {
      icon: <Code className="h-12 w-12 text-[#10b981] mb-4" />,
      title: 'Custom Real Estate Software',
      description: [
        'MLS integration and property database management',
        'E-signature and document management solutions',
        'Custom dashboards and reporting tools'
      ]
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-[#10b981] mb-4" />,
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
    setPurchaseMessage(null);
    if (price === 'Custom') {
      setPurchaseMessage({ type: 'error', text: 'Custom plans are handled via Contact. Redirecting you now.' });
      setTimeout(() => {
        window.location.href = '/contact';
      }, 2000);
      return;
    }

    const productId = findProductIdForService(service, period);
    console.log('Looking for product:', service, period);
    console.log('Found product ID:', productId);
    console.log('Available products:', products);
    
    if (!productId) {
      setPurchaseMessage({
        type: 'error',
        text: `Service "${service}" is not available as a product yet. Please contact us to set up this service.`,
      });
      return;
    }

    setIsProcessing(true);
    try {
      await addItem(productId, 1);
      setPurchaseMessage({
        type: 'success',
        text: `${service} (${getPeriodLabel(period as any)}) added to cart successfully!`,
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setPurchaseMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to add plan to cart', error);
      setPurchaseMessage({
        type: 'error',
        text: 'Could not add to cart. Please try again or contact support.',
      });
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
            backgroundImage: 'url(/images/Real%20Estate.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Estate IT Solutions – Smart Tools for Property Professionals</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our specialized IT solutions help real estate agencies and property managers streamline operations, improve client communication, and grow their business efficiently.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-[#1a1f3a] mb-16">Our Real Estate Services</h2>
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

      {/* Dynamic Pricing Section */}
      <section className="py-20 relative text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/70"></div>
          <img 
            src="/images/Real Estate.png" 
            alt="Real Estate Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Pricing Plans for Real Estate Professionals</h2>
            <p className="text-white/90 mb-6 text-lg font-medium drop-shadow-md">Choose the plan that fits your business — all plans include 24/7 support and continuous updates.</p>
            {purchaseMessage && (
              <div
                className={`mx-auto max-w-2xl rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border ${purchaseMessage.type === 'success'
                  ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300'
                  : 'bg-red-100/90 text-red-900 border-red-300'
                  } shadow-lg`}
              >
                {purchaseMessage.type === 'success' ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <BarChart3 className="h-4 w-4 text-red-500" />
                )}
                {purchaseMessage.text}
              </div>
            )}
            {productsLoading && (
              <div className="flex items-center justify-center gap-2 text-[#1a1f3a] text-sm mt-3">
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing products with catalogue...
              </div>
            )}
          </div>

          {/* Pricing Cards - 3 Top, 2 Bottom */}
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full px-2 sm:px-4">
            {/* Top Row - 3 Cards */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full">
              {pricingPlans.slice(0, 3).map((plan, index) => {
                const selectedPeriod = selectedPeriods[plan.service] || 'monthly';
                const displayPrice = getPriceByPeriod(plan, selectedPeriod);

                return (
                  <div
                    key={index}
                    className="relative w-full xs:w-80 sm:w-72 lg:w-80 flex flex-col rounded-2xl transition-all duration-300 max-w-sm bg-white/95 border border-white/20 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.55)] hover:-translate-y-1"
                  >
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-[#1a1f3a] mb-4 leading-tight line-clamp-2">{plan.service}</h3>

                      <div className="mb-5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {(['monthly', 'oneYear', 'threeYear', 'fiveYear'] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => handlePeriodChange(plan.service, period)}
                              className={`py-2 px-2 rounded text-xs font-semibold transition-all duration-200 border ${selectedPeriod === period
                                  ? 'bg-[#10b981] text-white border-[#10b981] shadow'
                                  : 'bg-gray-100/70 text-gray-800 border-gray-200 hover:bg-gray-200'
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
                            <span className="text-3xl font-extrabold text-[#1a1f3a]">{displayPrice}</span>
                            <span className="text-gray-700 font-semibold text-xs">
                              {selectedPeriod === 'monthly' ? '/mo' : '/yr'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-5">
                          <p className="text-2xl font-bold text-[#1a1f3a]">Custom</p>
                        </div>
                      )}

                      <ul className="space-y-2 mb-5 flex-grow">
                        {getFeaturesByService(plan.service).slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePurchase(plan.service, displayPrice, selectedPeriod)}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-[#10b981] text-white hover:bg-[#059669] shadow hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : 'Add to Cart'}
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
                const selectedPeriod = selectedPeriods[plan.service] || 'monthly';
                const displayPrice = getPriceByPeriod(plan, selectedPeriod);

                return (
                  <div
                    key={index}
                    className="relative w-full xs:w-80 sm:w-72 lg:w-80 flex flex-col rounded-2xl transition-all duration-300 max-w-sm bg-white/95 border border-white/20 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.55)] hover:-translate-y-1"
                  >
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-[#1a1f3a] mb-4 leading-tight line-clamp-2">{plan.service}</h3>

                      <div className="mb-5">
                        <div className="grid grid-cols-2 gap-1.5">
                          {(['monthly', 'oneYear', 'threeYear', 'fiveYear'] as const).map((period) => (
                            <button
                              key={period}
                              onClick={() => handlePeriodChange(plan.service, period)}
                              className={`py-2 px-2 rounded text-xs font-semibold transition-all duration-200 border ${selectedPeriod === period
                                  ? 'bg-[#10b981] text-white border-[#10b981] shadow'
                                  : 'bg-gray-100/70 text-gray-800 border-gray-200 hover:bg-gray-200'
                                }`}
                            >
                              {getPeriodLabel(period)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {plan.monthly !== 'Custom' ? (
                        <div className="text-center mb-5 mt-auto">
                          <span className="text-4xl font-extrabold text-[#1a1f3a]">{displayPrice}</span>
                          <span className="text-sm text-[#1a1f3a]">/{selectedPeriod === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                      ) : (
                        <div className="mb-5">
                          <p className="text-2xl font-bold text-[#1a1f3a]">Custom</p>
                        </div>
                      )}

                      <ul className="space-y-2 mb-5 flex-grow">
                        {getFeaturesByService(plan.service).slice(0, 3).map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-[#10b981] flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handlePurchase(plan.service, displayPrice, selectedPeriod)}
                        disabled={isProcessing}
                        className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-[#10b981] text-white hover:bg-[#059669] shadow hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : 'Add to Cart'}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-white/80 mt-12 text-sm">
            *Custom solutions available. All plans include 24/7 support, regular updates, and a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-2xl">
          <h2 className="text-4xl font-bold text-center text-[#1a1f3a] mb-4">Get Started Today</h2>
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
              <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Company/Agency</label>
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
                placeholder="Tell us about your real estate business and what solutions you're interested in..."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of real estate professionals who are already using our solutions to streamline operations and increase productivity.
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
