import Link from 'next/link';
import { ArrowRight, Building2, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const exampleClients = [
  { name: 'Real Estate Firms', description: 'CRM, listings management, and marketing automation.' },
  { name: 'Small & Medium Businesses', description: 'Web, mobile, and software solutions that scale with growth.' },
  { name: 'Creative Enterprises', description: 'Branding, graphics, and production-ready design solutions.' },
];

const testimonials = [
  {
    quote: 'Drive Pixel helped us streamline operations and launch faster than expected.',
    author: 'Operations Manager',
    industry: 'SMB',
  },
  {
    quote: 'A reliable team with strong delivery and clear communication.',
    author: 'Founder',
    industry: 'Real Estate',
  },
];

export default function ClientsPage() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Valued Clients</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Drive Pixel has worked with a diverse range of clients across industries, delivering tailored IT solutions that enhance operations and boost business growth. Our clients include real estate firms, small and medium businesses, and creative enterprises seeking a one-stop IT partner.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-10 text-center">Client Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {exampleClients.map((c, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                  <Building2 className="h-8 w-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">{c.name}</h3>
                <p className="text-gray-600">{c.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                  <Quote className="h-8 w-8 text-[#10b981]" />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">“{t.quote}”</p>
                <div className="text-gray-600">
                  <div className="font-semibold text-gray-900">{t.author}</div>
                  <div className="text-sm">{t.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Want results like our clients?</h2>
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
