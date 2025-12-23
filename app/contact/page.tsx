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
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    service: '',
    message: '',
  });

  const addressLocations: { [key: string]: { coords: [number, number]; name: string } } = {
    'WA': { coords: [-120.2437, 47.7511], name: 'Washington' },
    'CA': { coords: [-119.4179, 36.7783], name: 'California' },
    'NY': { coords: [-74.0060, 40.7128], name: 'New York' },
    'TX': { coords: [-97.5631, 30.2672], name: 'Texas' },
  };

  useEffect(() => {
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
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

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
    document.head.appendChild(script);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/contact.png)',
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
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Info Cards */}
            <div className="flex flex-col items-center bg-gradient-to-br from-[#10b981]/10 to-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Mail className="h-12 w-12 text-[#10b981] mb-4" />
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">Email</h3>
              <p className="text-gray-700 hover:text-[#10b981] transition-colors">Contact@drivepixel.com</p>
            </div>
            <div className="flex flex-col items-center bg-gradient-to-br from-[#10b981]/10 to-gray-50 rounded-xl p-8">
              <MapPin className="h-12 w-12 text-[#10b981] mb-4" />
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">Address</h3>
              <p className="text-gray-700">WA</p>
            </div>
          </div>

          {/* Contact Form & Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-[#1a1f3a] mb-8 text-center">Send us a Message</h2>
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
                  <select 
                    name="service" 
                    value={formState.service} 
                    onChange={(e) => { 
                      handleInputChange(e); 
                      handleServiceChange(e.target.value); 
                    }} 
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20"
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
                  <label className="block text-sm font-semibold text-[#1a1f3a] mb-2">Message *</label>
                  <textarea name="message" value={formState.message} onChange={handleInputChange} rows={6} placeholder="Tell us about your project..." className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20"></textarea>
                </div>
                <Button size="lg" className="w-full bg-[#10b981] hover:bg-[#059669] text-white">
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Map Section */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-[#1a1f3a] mb-8 text-center">Find Us on the Map</h2>
              <div 
                ref={mapContainer} 
                className="w-full flex-1 rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                style={{ minHeight: '400px' }}
              />
            </div>
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
