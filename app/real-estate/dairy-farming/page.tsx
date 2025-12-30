import Link from 'next/link';
import {
  ArrowRight,
  Milk,
  Hammer,
  Tractor,
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

export default function DairyFarmingPage() {
  const services = [
    {
      icon: <Hammer className="h-8 w-8 text-[#1f7a8c]" />,
      title: 'Build 2 Suit Dairy Facilities',
      description:
        'Custom construction of modern milking parlors, loafing sheds, and waste management systems. We manage the development from raw land to a fully operational dairy plant.',
    },
    {
      icon: <Tractor className="h-8 w-8 text-[#1f7a8c]" />,
      title: 'Agri-Logistics Integration',
      description:
        'Specialized Real Estate Logistics for dairy operations. We ensure your farm location optimizes supply chain routes for milk distribution and feed procurement.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#1f7a8c]" />,
      title: 'Operational Expansion',
      description:
        'Assisting existing dairy owners in scaling their operations through land consolidation and the acquisition of neighboring arable plots for grazing.',
    },
  ];

  const financing = [
    {
      icon: <Scale className="h-10 w-10 text-[#1f7a8c]" />,
      overline: 'Ethical Ag-Finance',
      title: 'Shariah-Compliant Dairy Funding',
      items: [
        '<strong>Murabaha:</strong> Interest-free financing for land and dairy equipment (milking tech, cooling tanks).',
        '<strong>Ijarah (Lease-to-Own):</strong> Flexible leasing models for specialized livestock facilities.',
        '<strong>No Riba Policy:</strong> All financial contracts are audited for compliance with Islamic ethical standards.',
      ],
      highlight: true,
    },
    {
      icon: <Wallet className="h-10 w-10 text-[#1f7a8c]" />,
      overline: 'Agent 100% Commission',
      title: '100% Commission for Ag-Specialists',
      items: [
        '<strong>Flat Transaction Fee:</strong> Keep your full commission on multi-million dollar dairy acquisitions.',
        '<strong>State-Specific Plans:</strong> Flat fees of $495 (FL) or $695 (WA/NY) per transaction.',
        '<strong>Referral System:</strong> 10% referral fee for active agents connecting dairy investors.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#d97706]" />,
      title: 'Earnest Money Safety',
      text: 'Agents must NEVER accept cash or checks. All dairy farm deposits must be wired directly to the designated Title or Escrow company.',
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-[#1f7a8c]" />,
      title: '48-Hour Compliance',
      text: 'All dairy listing agreements and purchase contracts must be uploaded to the ODR portal within 48 hours to ensure legal oversight.',
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-[#1f7a8c]" />,
      title: 'Anti-Fraud Protocol',
      text: 'Verification of all wire instructions is mandatory to protect against cyber-fraud during large-scale agricultural transfers.',
    },
    {
      icon: <Handshake className="h-6 w-6 text-[#1f7a8c]" />,
      title: 'Fair Housing & Land Use',
      text: 'ODR strictly follows all Federal and State laws regarding non-discrimination in agricultural land sales and leasing.',
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
              <Milk className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Dairy Farming &amp; Livestock Operations</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Specialized Dairy Farm Brokerage</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Empowering the dairy industry with strategic real estate logistics. We provide the expertise to acquire, develop, and manage high-performance dairy facilities under a Shariah-compliant framework.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white via-[#f4fbff] to-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#1f7a8c] uppercase">Dairy Infrastructure &amp; Services</p>
            <h2 className="text-4xl font-bold text-[#142533] mt-3">Modernize Every Component of Your Dairy Operation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/80 bg-white shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-14 w-14 rounded-xl bg-[#1f7a8c]/10 flex items-center justify-center mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#142533] mb-3">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d1f2d] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#1f7a8c] bg-gradient-to-r from-[#1f7a8c]/20 to-transparent' : 'border-white/10 bg-white/5'
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

      <section className="bg-[#142533] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div key={item.title} className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 flex items-start gap-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    item.title === 'Earnest Money Safety' ? 'bg-[#d97706]/15' : 'bg-white/10'
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-white/80 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1f7a8c] to-[#69c0ff] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-10 flex flex-col md:flex-row items-center gap-8 backdrop-blur">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/20 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-3">Global Investor Network</p>
              <h2 className="text-3xl font-bold mb-4">APS-LEADS-DFLX Connectivity</h2>
              <p className="text-white/90 leading-relaxed">
                We expose your dairy listings to a global audience of institutional investors and ethical funds through our proprietary digital marketing platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Dairy Farming?</h2>
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
