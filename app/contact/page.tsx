'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/ui/modal'; // corrected import path

// List of all available services
const services = [
  { 
    id: 'real-estate', 
    title: 'Real Estate', 
    email: 'realestate@drivepixel.com', 
    description: 'Complete real estate IT solutions and property management systems' 
  },
  { 
    id: 'freight-logistics', 
    title: 'Freight-Logistics', 
    email: 'logistics@drivepixel.com', 
    description: 'Advanced freight and logistics management solutions' 
  },
  { 
    id: 'property-operations', 
    title: 'Property Operations', 
    email: 'operations@drivepixel.com', 
    description: 'Streamline property operations and management' 
  },
  { 
    id: 'investor-portals', 
    title: 'Investor Portals', 
    email: 'investors@drivepixel.com', 
    description: 'Custom investor portals and reporting systems' 
  },
  { 
    id: 'growth-leads', 
    title: 'Growth & Leads', 
    email: 'growth@drivepixel.com', 
    description: 'Lead generation and business growth strategies' 
  },
  { 
    id: 'crm-lead-systems', 
    title: 'CRM & Lead Systems', 
    email: 'crm@drivepixel.com', 
    description: 'Customer relationship management and lead tracking systems' 
  },
  { 
    id: 'marketing-automation', 
    title: 'Marketing Automation', 
    email: 'automation@drivepixel.com', 
    description: 'Automated marketing campaigns and workflows' 
  },
  { 
    id: 'market-analytics', 
    title: 'Market Analytics', 
    email: 'analytics@drivepixel.com', 
    description: 'Data-driven market analysis and insights' 
  },
  { 
    id: 'market-snapshot', 
    title: 'Monthly Market Snapshot', 
    email: 'snapshot@drivepixel.com', 
    description: 'Regular market reports and trend analysis' 
  },
  { 
    id: 'web-development', 
    title: 'Web Development', 
    email: 'web@drivepixel.com', 
    description: 'Responsive and integrated websites using the latest technologies' 
  },
  { 
    id: 'mobile-apps', 
    title: 'Mobile App Development', 
    email: 'mobile@drivepixel.com', 
    description: 'Mobile applications for iOS and Android platforms' 
  },
  { 
    id: 'custom-software', 
    title: 'Custom Software Solutions', 
    email: 'software@drivepixel.com', 
    description: 'Tailored software solutions for your business needs' 
  },
  { 
    id: 'it-consulting', 
    title: 'IT Consulting', 
    email: 'consulting@drivepixel.com', 
    description: 'Expert IT consulting and technology advisory services' 
  },
  { 
    id: 'cybersecurity', 
    title: 'Cybersecurity', 
    email: 'security@drivepixel.com', 
    description: 'Comprehensive cybersecurity solutions and protection' 
  },
];

export default function ContactPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [address, setAddress] = useState('WA');
  const [mapCoordinates, setMapCoordinates] = useState<[number, number]>([-120.2437, 47.7511]);
  const [mapError, setMapError] = useState<string>('');
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const addressLocations: { [key: string]: { coords: [number, number]; name: string } } = {
    'WA': { coords: [-120.2437, 47.7511], name: 'Washington' },
    'CA': { coords: [-119.4179, 36.7783], name: 'California' },
    'NY': { coords: [-74.0060, 40.7128], name: 'New York' },
    'TX': { coords: [-97.5631, 30.2672], name: 'Texas' },
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapboxToken) {
      setMapError('Live interactive map is temporarily unavailable. Showing fallback location instead.');
      return;
    }

    if (!mapContainer.current) return;

    // Load Mapbox GL JS
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.async = true;
    script.onload = () => {
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Initialize map after Mapbox GL is loaded
      const mapboxgl = (window as any).mapboxgl;
      mapboxgl.accessToken = mapboxToken || '';

      if (mapContainer.current && !map.current) {
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: mapCoordinates,
          zoom: 12,
        });

        // Add marker
        new mapboxgl.Marker({ color: '#3a4b73' })
          .setLngLat(mapCoordinates)
          .addTo(map.current);
      }
    };
    script.onerror = () => {
      setMapError('Unable to load the live map right now.');
    };
    document.head.appendChild(script);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      document.head.removeChild(script);
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: mapCoordinates,
        zoom: 12,
        duration: 1000,
      });

      // Update marker
      const markers = document.querySelectorAll('.mapboxgl-marker');
      markers.forEach(marker => marker.remove());

      const mapboxgl = (window as any).mapboxgl;
      new mapboxgl.Marker({ color: '#3a4b73' })
        .setLngLat(mapCoordinates)
        .addTo(map.current);
    }
  }, [mapCoordinates]);

  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    const location = addressLocations[newAddress];
    if (location) {
      setMapCoordinates(location.coords);
    }
  };

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleServiceChange = async (serviceId: string) => {
    const selectedService = services.find(service => service.id === serviceId);
    if (selectedService) {
      setFormState({
        ...formState,
        service: selectedService.id,
        message: selectedService.description
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.fullName || !formState.email || !formState.service || !formState.message) {
      setSubmitError('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormState({
          fullName: '',
          email: '',
          service: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again later.');
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-10 bg-[#faeef2]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-6">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-[#3c1d26]">
              GET IN TOUCH
            </div>
            <h2 className="text-center text-[clamp(1.7rem,3.4vw,2.4rem)] font-black text-[#1d1a3a] tracking-wide">
                Send us a Message
              </h2>
            <div className="w-full rounded-none bg-[#8c75b6] border-2 border-white shadow-[0_6px_0_rgba(255,255,255,0.35)] py-1 text-center px-2">
              <p className="text-sm text-white font-medium">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Info Stack */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform">
                <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#33202b]">Address</h3>
                <p className="text-sm text-[#4f2c33] leading-relaxed">WA</p>
              </div>
              <div className="flex flex-col items-center gap-4 rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-6 py-8 text-center shadow-[0_12px_0_0_#d37377] hover:-translate-y-2 transition-transform">
                <div className="h-16 w-16 rounded-full bg-gradient-to-b from-[#17b58f] to-[#0e8f6a] shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#33202b]">Email</h3>
                <p className="text-sm text-[#4f2c33] leading-relaxed hover:text-[#1f4f78] transition-colors cursor-pointer">Contact@drivepixel.com</p>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-[#c3868b] bg-gradient-to-b from-[#ffe1e1] to-[#ffc5c9] px-8 py-10 shadow-[0_12px_0_0_#d37377]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      {submitError}
                    </div>
                  )}
                  
                  {submitSuccess && (
                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#33202b] mb-2">Full Name *</label>
                      <input type="text" name="fullName" value={formState.fullName} onChange={handleInputChange} placeholder="Your Name" className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#33202b] mb-2">Email *</label>
                      <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#33202b] mb-2">Service *</label>
                    <select 
                      name="service" 
                      value={formState.service} 
                      onChange={(e) => { 
                        handleInputChange(e); 
                        handleServiceChange(e.target.value); 
                      }} 
                      className="w-full px-4 py-3 bg-white border border-[#c3868b] text-gray-900 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#33202b] mb-2">Message *</label>
                    <textarea name="message" value={formState.message} onChange={handleInputChange} rows={6} placeholder="Tell us about your project..." className="w-full px-4 py-2 bg-white border border-[#c3868b] text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#1f4f78] focus:ring-2 focus:ring-[#1f4f78]/20"></textarea>
                  </div>
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    size="lg" 
                    className="w-full bg-[#c45c4b] hover:bg-[#b04a3a] text-white font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed Section */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-6 text-center">
            <div className="w-full rounded-none bg-[#f3b0b0] border border-[#d27a7c] shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16]">
              FIND US
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
            {mapError ? (
              <div className="p-8 text-center text-gray-600">
                <p className="text-xl font-semibold mb-2">Map temporarily unavailable</p>
                <p className="text-sm mb-4">{mapError}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                  <MapPin className="h-4 w-4 text-[#10b981]" />
                  Washington, United States
                </div>
              </div>
            ) : (
              <div className="relative w-full h-[480px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.422373166962!2d-122.3351670235129!3d47.608013971189996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54901545e1c7f461%3A0x77f8f7b9d7761d30!2sSeattle%20Downtown!5e0!3m2!1sen!2sus!4v1703012345678!5m2!1sen!2sus"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-none"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Full Name *</label>
              <input type="text" name="fullName" value={formState.fullName} onChange={handleInputChange} placeholder="Your Name" className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Email *</label>
              <input type="email" name="email" value={formState.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Service *</label>
            <select name="service" value={formState.service} onChange={handleInputChange} className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20">
              <option value="">Select a service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Message *</label>
            <textarea name="message" value={formState.message} onChange={handleInputChange} rows={6} placeholder="Tell us about your project..." className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20"></textarea>
          </div>
          <Button size="lg" className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
            Send Message
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Modal>

      <Footer />
    </div>
  );
}
