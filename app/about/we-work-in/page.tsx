import Link from 'next/link';
import { ArrowRight, Building, GraduationCap, HeartPulse, Paintbrush, Store, Truck, Package, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const industries = [
  {
    title: 'Real Estate',
    description: 'CRM, listings management, marketing automation',
    icon: Building,
  },
  {
    title: 'Retail & E-commerce',
    description: 'Online stores, payment gateways, inventory systems',
    icon: Store,
  },
  {
    title: 'Education',
    description: 'LMS integration, app development, IT support',
    icon: GraduationCap,
  },
  {
    title: 'Healthcare',
    description: 'Secure portals, data compliance, workflow automation',
    icon: HeartPulse,
  },
  {
    title: 'Creative & Design',
    description: 'Branding, graphics, embroidery, screen-print solutions',
    icon: Paintbrush,
  },
  {
    title: 'Transportation',
    description: 'Fleet management, route optimization, and telematics.',
    icon: Truck,
  },
  {
    title: 'Supply Chain',
    description: 'Warehouse management, inventory tracking, and logistics.',
    icon: Package,
  },
  {
    title: 'Freight Logistics',
    description: 'Freight management, shipping, and tracking solutions.',
    icon: Ship,
  },
];

export default function WeWorkInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Drive Pixel provides services to a wide array of industries, adapting our solutions to each sector's unique needs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-10 text-center">Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((i, idx) => {
              const Icon = i.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                    <Icon className="h-8 w-8 text-[#10b981]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">{i.title}</h3>
                  <p className="text-gray-600">{i.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Need a solution for your industry?</h2>
          <Link href="/contact">
            <Button size="lg" className="bg-[#10b981] hover:bg-[#059669] text-white">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
