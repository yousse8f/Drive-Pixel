import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Factory,
  Store,
  Hammer,
  Scale,
  Wallet,
  Ban,
  ShieldAlert,
  ClipboardList,
  Equal,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CommercialPage() {
  const services = [
    {
      icon: <Factory className="h-8 w-8 text-[#10b981]" />,
      title: 'Industrial & Logistics',
      content:
        'Specialized services in Real Estate Logistics. We handle warehouses, distribution centers, and industrial hubs with a focus on supply chain efficiency.',
    },
    {
      icon: <Store className="h-8 w-8 text-[#10b981]" />,
      title: 'Retail & Office Spaces',
      content:
        'Strategic locations for retail brands and modern office environments. We assist in leasing, sales, and portfolio management for commercial assets.',
    },
    {
      icon: <Hammer className="h-8 w-8 text-[#10b981]" />,
      title: 'Build 2 Suit (B2S)',
      content:
        'Custom-built commercial projects. From land acquisition to final construction, we manage the entire lifecycle based on your business specifications.',
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#f97316]" />,
      title: 'No Cash Handling',
      text: 'ODR Agents are strictly prohibited from accepting Earnest Money. All funds must go directly to Title/Escrow companies.',
      emphasis: true,
    },
    {
      icon: <ShieldAlert className="h-6 w-6 text-[#10b981]" />,
      title: 'Anti-Fraud Protocols',
      text: 'Strict verification of wire instructions to prevent cyber-fraud in high-value commercial deals.',
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-[#10b981]" />,
      title: '48-Hour Rule',
      text: 'All commercial contracts and listing agreements must be uploaded to the ODR system within 48 hours of execution.',
    },
    {
      icon: <Equal className="h-6 w-6 text-[#10b981]" />,
      title: 'Fair Housing',
      text: 'Equal opportunity in all commercial leasing and sales, strictly adhering to Federal and State laws.',
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
              <Building2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Digital Boutique Commercial Firm</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Tailored Commercial Real Estate Solutions</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            We bridge the gap between institutional investment and Shariah-compliant ethical standards, covering commercial real estate and logistics with precision.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#0f1b36] uppercase">Commercial Focus</p>
            <h2 className="text-4xl font-bold text-[#0f1b36] mt-3">Service Grid</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-white/20 bg-gradient-to-b from-[#0f182c]/5 to-white shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 p-8"
              >
                <div className="h-14 w-14 rounded-xl bg-[#10b981]/10 flex items-center justify-center mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0f1b36] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d1424] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Scale className="h-10 w-10 text-[#10b981]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Ethical Funding</p>
                  <h3 className="text-2xl font-bold">Shariah-Compliant Commercial Funding</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/90 text-sm leading-relaxed">
                <li><strong>Murabaha:</strong> Cost-plus profit financing for commercial assets.</li>
                <li><strong>Ijarah:</strong> Lease-to-own models for businesses.</li>
                <li><strong>Zero Riba:</strong> All transactions are free from interest and unethical financial practices.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Wallet className="h-10 w-10 text-[#10b981]" />
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Agent Commission Structure</p>
                  <h3 className="text-2xl font-bold">100% Commission Commercial Plan</h3>
                </div>
              </div>
              <ul className="space-y-3 text-white/90 text-sm leading-relaxed">
                <li><strong>Flat Fee:</strong> Keep 100% of your commercial commission.</li>
                <li><strong>Transaction Fee:</strong> Fixed flat fee per deal (refer to state-specific pricing in the ODR manual).</li>
                <li><strong>Bump-up Fees:</strong> For transactions over $1M, a tiered fee structure applies to maintain high-level support.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#eef2ff]">
        <div className="container-custom space-y-6">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#0f1b36] uppercase">Mandatory Legal Compliance</p>
            <h2 className="text-3xl font-bold text-[#0f1b36] mt-2">Operational Guardrails</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl border ${
                  item.emphasis ? 'border-[#f97316]/30 bg-[#fff7ed]' : 'border-white/80 bg-white'
                } p-6 shadow-sm`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      item.emphasis ? 'bg-[#f97316]/10' : 'bg-[#10b981]/10'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#0f1b36]">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d1424] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#0f1b36] to-[#1c2f57] p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-3">Global Reach</p>
              <h2 className="text-3xl font-bold mb-4">APS-LEADS-DFLX Integration</h2>
              <p className="text-white/80 leading-relaxed">
                Our proprietary digital platform connects your commercial listings with international investors and institutional partners through a global network.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Commercial Properties?</h2>
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
