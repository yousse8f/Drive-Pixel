'use client';

import Link from 'next/link';
import { ArrowRight, Mail, Building, Target, TrendingUp, Map, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DynamicPageContent from '@/components/DynamicPageContent';

export default function DevelopmentPage() {
  const services = [
    {
      icon: Map,
      title: 'Site Selection',
      description: 'Market-driven location analysis for maximum profitability and long-term success.'
    },
    {
      icon: Settings,
      title: 'Project Planning',
      description: 'Comprehensive design and permitting services with expert regulatory navigation.'
    },
    {
      icon: Building,
      title: 'Construction Management',
      description: 'Professional oversight ensuring quality construction and timely project completion.'
    },
    {
      icon: Users,
      title: 'Marketing & Sales',
      description: 'Targeted marketing campaigns combined with expert transaction and negotiation support.'
    }
  ];

  const siteSelectionFeatures = [
    {
      title: 'Market Analysis',
      description: 'In-depth research of local market conditions and growth potential.'
    },
    {
      title: 'Demographic Studies',
      description: 'Analysis of population trends and target market characteristics.'
    },
    {
      title: 'Accessibility Assessment',
      description: 'Evaluation of transportation links and infrastructure availability.'
    },
    {
      title: 'Zoning Compatibility',
      description: 'Verification of zoning regulations and development restrictions.'
    }
  ];

  const projectPlanningServices = [
    {
      title: 'Architectural Design',
      description: 'Custom design solutions tailored to project requirements and market demands.'
    },
    {
      title: 'Permitting Assistance',
      description: 'Expert navigation of complex permitting processes and regulatory requirements.'
    },
    {
      title: 'Engineering Coordination',
      description: 'Integration of structural, mechanical, and electrical engineering systems.'
    },
    {
      title: 'Budget Development',
      description: 'Comprehensive cost estimation and financial planning for project execution.'
    }
  ];

  const constructionManagementFeatures = [
    {
      title: 'Quality Control',
      description: 'Rigorous quality assurance throughout all construction phases.'
    },
    {
      title: 'Schedule Management',
      description: 'Efficient timeline management to ensure timely project completion.'
    },
    {
      title: 'Cost Monitoring',
      description: 'Continuous budget tracking and cost optimization strategies.'
    },
    {
      title: 'Safety Compliance',
      description: 'Strict adherence to safety regulations and best practices.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - CMS Controlled */}
      <DynamicPageContent pagePath="/real-estate/build-dream-home/development" fallbackContent={
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">DEVELOPMENT</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Built to Suit development services for residential and commercial projects
            </p>
          </div>
        </section>
      } />

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#4f2c33] leading-relaxed text-center max-w-4xl mx-auto">
              One Drive Realty provides Built to Suit development services for residential and commercial projects. Our comprehensive approach ensures successful project delivery from initial concept through final completion and marketing.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OUR SERVICES
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Development Solutions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform min-h-[280px]">
                  <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-midnight-blue leading-tight">{service.title}</h3>
                  <p className="text-sm text-muted-indigo leading-relaxed break-words flex-1">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              SITE SELECTION
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Market-Driven Location Analysis</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our site selection process combines comprehensive market research with strategic analysis to identify locations with maximum profitability potential and long-term growth prospects.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {siteSelectionFeatures.map((feature) => (
              <div key={feature.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{feature.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROJECT PLANNING
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Settings className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Design and Permitting Excellence</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Our project planning services encompass comprehensive design development and expert permitting assistance, ensuring smooth regulatory approval and optimized project execution.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {projectPlanningServices.map((service) => (
              <div key={service.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{service.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              CONSTRUCTION MANAGEMENT
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <Building className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Quality Construction Oversight</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Professional construction management ensures quality building, timely completion, and budget adherence throughout the entire development process.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {constructionManagementFeatures.map((feature) => (
              <div key={feature.title} className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] text-center">
                <h3 className="text-xl font-bold text-midnight-blue mb-4">{feature.title}</h3>
                <p className="text-muted-indigo leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              MARKETING & SALES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white mx-auto">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-midnight-blue">Strategic Marketing and Sales Support</h3>
                <p className="text-lg text-muted-indigo leading-relaxed max-w-3xl mx-auto">
                  Targeted marketing campaigns combined with expert transaction and negotiation support ensure optimal market penetration and successful property sales or leasing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              PROJECT TYPES
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <div className="bg-light-beige border border-muted-indigo/30 rounded-lg p-6 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Residential Developments</h4>
                  <p className="text-sm text-muted-indigo">Single-family homes, apartments, and mixed-use residential communities.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Commercial Projects</h4>
                  <p className="text-sm text-muted-indigo">Office buildings, retail centers, and industrial facilities.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Mixed-Use Properties</h4>
                  <p className="text-sm text-muted-indigo">Integrated developments combining residential and commercial spaces.</p>
                </div>
                <div>
                  <h4 className="font-bold text-midnight-blue mb-2">Specialized Facilities</h4>
                  <p className="text-sm text-muted-indigo">Custom developments for specific industries and purposes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            DISCUSS YOUR DEVELOPMENT PROJECT
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Build Your Development Vision</h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Get Started
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
