import Link from 'next/link';
import { ArrowRight, Flag, Layers, Lightbulb, Palette, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const milestones = [
  {
    title: 'Founded',
    description: 'Drive Pixel launched as a comprehensive IT services platform.',
    icon: Flag,
  },
  {
    title: 'Expansion',
    description: 'Added specialized real estate services and marketing automation.',
    icon: Layers,
  },
  {
    title: 'Innovation',
    description: 'Integrated e-commerce solutions with 75+ products/services.',
    icon: Lightbulb,
  },
  {
    title: 'Creative Services',
    description: 'Introduced pixel-perfect branding, embroidery, and screen print designs.',
    icon: Palette,
  },
  {
    title: 'Current',
    description: "Fully operational platform hosting clients’ IT services on secure VPS with modern web and mobile solutions.",
    icon: ShieldCheck,
  },
];

export default function OurHistoryPage() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Journey</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            A timeline of the key milestones that shaped Drive Pixel into a one-stop platform for IT, software, and creative services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-10 text-center">Timeline / Key Milestones</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                    <Icon className="h-8 w-8 text-[#10b981]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">{m.title}</h3>
                  <p className="text-gray-600">{m.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Want to be part of our next milestone?</h2>
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
