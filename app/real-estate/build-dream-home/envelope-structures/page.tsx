'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Home, Shield, Zap, Target, Building, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function EnvelopeStructuresPage() {
  const components = [
    {
      icon: Building,
      title: 'Walls',
      description: 'Exterior walls provide structural support and protect the interior from weather conditions. They also contribute significantly to insulation and overall energy efficiency.'
    },
    {
      icon: Home,
      title: 'Roof',
      description: 'The roof shields the building from rain, snow, and sunlight. A well-designed roof helps regulate indoor temperature and prevent energy loss.'
    },
    {
      icon: Shield,
      title: 'Windows and Doors',
      description: 'Windows and doors allow for ventilation, natural light, and access. If not properly designed and sealed, they can become points of energy loss.'
    },
    {
      icon: Thermometer,
      title: 'Insulation',
      description: 'Insulation within walls, roofs, and foundations helps maintain consistent indoor temperatures, reducing the need for heating and cooling.'
    },
    {
      icon: Zap,
      title: 'Air Barriers',
      description: 'Air barriers prevent air leakage, which greatly impacts energy efficiency. Proper sealing ensures comfort and performance.'
    }
  ];

  const benefits = [
    {
      title: 'Energy Efficiency',
      description: 'Reduced heat loss in winter and heat gain in summer.'
    },
    {
      title: 'Comfort',
      description: 'Stable indoor temperature and humidity control.'
    },
    {
      title: 'Durability',
      description: 'Protection from moisture, wind, and temperature fluctuations.'
    },
    {
      title: 'Sustainability',
      description: 'Lower environmental impact through reduced energy use.'
    },
    {
      title: 'Cost Savings',
      description: 'Long-term energy savings offset initial investment.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/envelope-structures" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">ENVELOPE STRUCTURES</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Innovative and sustainable building envelope solutions for energy-efficient properties
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              At One Drive Realty, we recognize the importance of innovative and sustainable building practices. For this reason, we offer specialized services related to envelope structures in real estate development. An envelope structure refers to the outer shell of a building, designed to protect the interior from external elements while maintaining energy efficiency and structural integrity.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT ARE ENVELOPE STRUCTURES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                The Building's Protective Shell
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue">Essential Building Protection</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  The building envelope consists of all elements that separate the interior of a structure from the exterior. These include walls, roofs, windows, doors, and foundations. The envelope plays a critical role in determining a building's energy efficiency, comfort, and durability.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              KEY COMPONENTS OF ENVELOPE STRUCTURES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {components.map((component) => {
              const Icon = component.icon;
              return (
                <div key={component.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{component.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{component.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              BENEFITS OF HIGH-QUALITY ENVELOPE STRUCTURES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{benefit.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              ENVELOPE STRUCTURES AND ONE DRIVE REALTY
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Excellence in Building Envelope Design</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our team ensures that every project incorporates advanced envelope designs that meet high standards of efficiency, comfort, and sustainability. We collaborate closely with architects, engineers, and contractors to exceed industry benchmarks.
                </p>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Whether developing a new property or retrofitting an existing one, One Drive Realty helps optimize envelope performance to meet your goals.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR APPROACH
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Design Integration</h4>
                  <p className="text-sm text-muted-indigo">Seamless integration of envelope systems with overall building design.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Material Selection</h4>
                  <p className="text-sm text-muted-indigo">Careful selection of high-performance materials and systems.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Quality Assurance</h4>
                  <p className="text-sm text-muted-indigo">Rigorous testing and quality control throughout construction.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            EXPLORE ENVELOPE STRUCTURES
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Energy-Efficient Properties</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Learn More
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
