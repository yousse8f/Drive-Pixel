import Link from 'next/link';
import {
  ArrowRight,
  HardHat,
  Ruler,
  Map,
  TrendingUp,
  Scale,
  Wallet,
  Ban,
  ClipboardList,
  ShieldAlert,
  Handshake,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DevelopmentPage() {
  const pillars = [
    {
      icon: <Ruler className="h-8 w-8 text-[#f97316]" />,
      title: 'Build 2 Suit (B2S) Program',
      description:
        'Our signature development model. We work with a network of architects and engineers to design and construct properties tailored to your exact operational or residential needs.',
      featured: true,
    },
    {
      icon: <Map className="h-8 w-8 text-[#f97316]" />,
      title: 'Real Estate Logistics',
      description:
        'Strategic development focused on supply chain efficiency. We develop distribution centers and warehouses positioned in high-access corridors to optimize business logistics.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#f97316]" />,
      title: 'Project Management',
      description:
        'Comprehensive oversight of the development lifecycle. We ensure all projects meet local building codes, environmental standards, and List 2 Last quality benchmarks.',
    },
  ];

  const financing = [
    {
      icon: <Scale className="h-10 w-10 text-[#f97316]" />,
      overline: 'Ethical Development Funding',
      title: 'Shariah-Compliant Capital',
      items: [
        '<strong>Participatory Financing:</strong> Equity-based models where risks and profits are shared, avoiding interest-based debt.',
        '<strong>Progressive Funding:</strong> Milestone-based payments aligned with Islamic finance principles.',
        '<strong>Zero Riba:</strong> All development contracts are strictly audited for Shariah compliance.',
      ],
      highlight: true,
    },
    {
      icon: <Wallet className="h-10 w-10 text-[#f97316]" />,
      overline: 'Agent 100% Commission',
      title: '100% Commission on Development Deals',
      items: [
        '<strong>Development Flat Fee:</strong> Retain your full commission on high-value development projects.',
        '<strong>Bump-up Fees:</strong> For projects exceeding $1M or $2M, a transparent tiered fee applies as per the ODR Independent Contractor Agreement.',
        '<strong>No Desk Fees:</strong> Full support for development agents without monthly office overhead.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#f97316]" />,
      title: 'Earnest Money Safety',
      text: 'ODR Agents are strictly prohibited from holding client funds. All development deposits must be wired directly to the designated Title/Escrow or Law Firm.',
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-white" />,
      title: '48-Hour Submission',
      text: 'All development contracts, letters of intent, and listing agreements must be uploaded to the ODR portal within 48 hours.',
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-white" />,
      title: 'Anti-Fraud Protocol',
      text: 'Verification of all wire instructions is mandatory for all development-related financial transfers to prevent cyber-fraud.',
    },
    {
      icon: <Handshake className="h-6 w-6 text-white" />,
      title: 'Fair Housing & Ethics',
      text: 'Strict adherence to Federal and State Fair Housing laws in all development marketing and sales phases.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
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
          <div className="mx-auto mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <HardHat className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Development &amp; Explore Development</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Visionary Real Estate Development</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            We don’t just find spaces; we create them. From initial feasibility studies to final construction, ODR provides a comprehensive Build 2 Suit ecosystem for residential, commercial, and industrial development.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#f4f7fb]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#1f2933] uppercase">Development Pillars</p>
            <h2 className="text-4xl font-bold text-[#101725] mt-3">Blueprints, Logistics, and Delivery</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-2xl border ${
                  pillar.featured
                    ? 'border-[#f97316] bg-gradient-to-b from-[#f97316]/10 to-white'
                    : 'border-white/80 bg-white'
                } shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center mb-5">{pillar.icon}</div>
                <h3 className="text-xl font-semibold text-[#101725] mb-3">{pillar.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{pillar.description}</p>
                {pillar.featured && (
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-[#f97316]">
                    Featured · Build 2 Suit
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f141d] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#f97316] bg-gradient-to-r from-[#1f2933] to-[#141b26]' : 'border-white/10 bg-white/5'
                } p-8 shadow-lg hover:bg-white/10 transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">{card.icon}</div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">{card.overline}</p>
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-white/90 text-sm leading-relaxed">
                  {card.items.map((item) => (
                    <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1118] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className={`flex-1 rounded-2xl border border-white/10 px-6 py-5 flex items-start gap-4 ${
                  item.title === 'Earnest Money Safety' ? 'bg-[#f97316]/10' : 'bg-white/5'
                }`}
              >
                <div className="h-12 w-12 rounded-xl bg-black/20 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-white/80 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#101725] to-[#1f2933] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Global Investor Network</p>
              <h2 className="text-3xl font-bold mb-4">APS-LEADS-DFLX Integration</h2>
              <p className="text-white/80 leading-relaxed">
                We leverage our proprietary digital platform to connect local development projects with a global network of institutional investors and ethical funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Development Opportunities?</h2>
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
