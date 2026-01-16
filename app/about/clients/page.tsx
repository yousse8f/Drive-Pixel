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

      <section
        className="relative text-white overflow-hidden pt-16 pb-12"
        style={{
          backgroundImage: 'url(/images/Services.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
        }}
      >
        <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        
        {/* Content */}
        <div className="container-custom relative z-10 flex justify-center items-center" style={{ minHeight: '40vh' }}>
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
              Our Clients
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
              Drive Pixel has worked with a diverse range of clients across industries, delivering tailored IT solutions that enhance operations and boost business growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-16">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CLIENT HIGHLIGHTS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Our Valued Partners
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {exampleClients.map((c, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                <div className="flex flex-col items-center gap-4 flex-1">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                    <Building2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue">{c.name}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6 mb-16">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              TESTIMONIALS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                What Our Clients Say
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative">
                <div className="flex flex-col items-center gap-4 flex-1">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                    <Quote className="h-10 w-10" />
                  </div>
                  <p className="text-lg text-muted-indigo leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="text-midnight-blue">
                    <div className="font-bold text-xl">{t.author}</div>
                    <div className="text-sm text-muted-indigo">{t.industry}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            GET RESULTS
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">Want results like our clients?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
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
