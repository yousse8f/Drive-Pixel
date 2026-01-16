import Link from 'next/link';
import { ArrowRight, Headphones, ClipboardList, Lightbulb, Gauge, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ITConsultingSupportPage() {
  const services = [
    {
      icon: ClipboardList,
      title: 'System analysis & planning',
      description: 'Comprehensive analysis and strategic planning.'
    },
    {
      icon: Lightbulb,
      title: 'IT strategy & implementation',
      description: 'IT strategy and implementation tailored to your goals.'
    },
    {
      icon: Gauge,
      title: 'Performance optimization',
      description: 'Enhance the performance of your IT systems.'
    },
    {
      icon: Headphones,
      title: '24/7 support',
      description: 'Round-the-clock support for your IT needs.'
    },
    {
      icon: AlertTriangle,
      title: 'Risk assessment & audits',
      description: 'Identify, assess, and mitigate potential risks.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Image Background */}
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
              IT Consulting
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed max-w-3xl mx-auto">
              Expert guidance to improve your IT infrastructure, strategy, and ongoing operations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-16">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR IT CONSULTING SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                IT Consulting & Support Services
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative"
                >
                  <div className="flex flex-col items-center gap-4 flex-1">
                    <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-midnight-blue">{service.title}</h3>
                    <p className="text-sm text-muted-indigo leading-relaxed">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-midnight-blue">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-[#2f0f16] bg-opacity-90">
            CONTACT US
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-white">Contact us for expert IT consulting!</h2>
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
