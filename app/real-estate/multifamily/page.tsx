import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Building,
  Ruler,
  BarChart2,
  Scale,
  Wallet,
  Ban,
  Scale as Balance,
  Timer,
  Shield,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MultifamilyPage() {
  const pillars = [
    {
      icon: <Building className="h-8 w-8 text-[#f97316]" />,
      title: 'Asset Acquisition & Sales',
      description:
        'Specializing in duplexes, triplexes, and large apartment complexes. We use our APS-LEADS-DFLX platform to match investors with high-performing multifamily assets.',
    },
    {
      icon: <Ruler className="h-8 w-8 text-[#f97316]" />,
      title: 'Build 2 Suit (B2S) Multifamily',
      description:
        'Custom development for investors. From land sourcing to final construction, we manage the creation of multifamily units designed for maximum occupancy and ROI.',
      featured: true,
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-[#f97316]" />,
      title: 'Real Estate Logistics',
      description:
        'Optimizing multifamily operations through strategic placement and logistics. We focus on high-demand corridors to ensure stable rental growth and long-term asset appreciation.',
    },
  ];

  const funding = [
    {
      icon: <Scale className="h-10 w-10 text-[#f97316]" />,
      overline: 'Ethical Investment Funding',
      title: 'Shariah-Compliant Multifamily Funding',
      items: [
        '<strong>Ijarah (Lease-to-Own):</strong> Structured leasing for multifamily investors.',
        '<strong>Equity Partnership:</strong> Joint venture models that avoid interest-based debt (Riba).',
        '<strong>Transparent Profits:</strong> All investment contracts are audited for ethical and Shariah compliance.',
      ],
      highlight: true,
    },
    {
      icon: <Wallet className="h-10 w-10 text-[#f97316]" />,
      overline: 'Agent 100% Commission',
      title: "100% Commission for Investors' Agents",
      items: [
        '<strong>Flat Transaction Fee:</strong> Keep 100% of your commission on high-value multifamily deals.',
        '<strong>Bump-up Fees:</strong> For transactions exceeding $1M or $2M, a tiered fee applies as per the ODR Independent Contractor Agreement (ICA).',
        '<strong>Dual Representation:</strong> If representing both sides, ODR collects a flat fee for each side of the transaction.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#f97316]" />,
      title: 'No Earnest Money Handling',
      text: 'ODR Agents are strictly prohibited from accepting Earnest Money or Security Deposits. All funds must be paid directly to the Closing Company or Property Management.',
    },
    {
      icon: <Balance className="h-6 w-6 text-white" />,
      title: 'Fair Housing Compliance',
      text: 'Zero tolerance for discrimination. All multifamily leasing and sales must strictly adhere to Federal and State Fair Housing laws.',
    },
    {
      icon: <Timer className="h-6 w-6 text-white" />,
      title: '48-Hour Document Rule',
      text: 'All multifamily listings and purchase agreements must be uploaded to the ODR digital portal within 48 hours of execution.',
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Anti-Fraud Verification',
      text: 'Strict verification of wire instructions is mandatory for all multifamily financial transfers to protect investor capital.',
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
          <div className="absolute inset-0 bg-[#0b1524]/80"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <div className="mx-auto mb-6 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Multifamily &amp; Explore Multifamily</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Multifamily Investment Excellence</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Scaling your portfolio through strategic multifamily acquisitions and developments. We provide the digital tools and ethical financial framework to manage high-yield residential complexes.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#edf1f7]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#101a2a] uppercase">Multifamily Service Pillars</p>
            <h2 className="text-4xl font-bold text-[#0f1724] mt-3">Acquisition · Development · Logistics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-2xl border ${
                  pillar.featured ? 'border-[#f97316] bg-gradient-to-b from-[#fff4ec] to-white' : 'border-white/80 bg-white'
                } shadow-xl p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-[#0f1724]/5 flex items-center justify-center mb-5">{pillar.icon}</div>
                <h3 className="text-xl font-semibold text-[#0f1724] mb-3">{pillar.title}</h3>
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

      <section className="py-20 bg-[#0b1524] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {funding.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#f97316] bg-gradient-to-r from-[#1c2a3b] to-[#0b1524]' : 'border-white/10 bg-white/5'
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

      <section className="bg-[#0a111c] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className={`flex-1 rounded-2xl border border-white/10 px-6 py-5 flex items-start gap-4 ${
                  item.title === 'No Earnest Money Handling' ? 'bg-[#f97316]/10' : 'bg-white/5'
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

      <section className="py-20 bg-gradient-to-r from-[#0f1724] to-[#1a2738] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Global Investor Reach</p>
              <h2 className="text-3xl font-bold mb-4">CYPS Global Marketing</h2>
              <p className="text-white/80 leading-relaxed">
                We expose your multifamily listings to an international network of institutional investors and ethical funds through our proprietary marketing system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Multifamily Properties?</h2>
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
