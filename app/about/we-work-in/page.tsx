import Link from 'next/link';
import { ArrowRight, Building, GraduationCap, HeartPulse, Paintbrush, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
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
];

export default function WeWorkInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Navbar />

      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Industries We Serve</h1>
          <p className="text-xl text-primary-100 max-w-4xl mx-auto">
            Drive Pixel provides services to a wide array of industries, adapting our solutions to each sector’s unique needs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">Examples</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((i, idx) => {
              const Icon = i.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{i.title}</h3>
                  <p className="text-gray-600">{i.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Need a solution for your industry?</h2>
          <Link href="/contact">
            <Button size="lg" className="bg-cta hover:bg-cta-600 text-white">
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
