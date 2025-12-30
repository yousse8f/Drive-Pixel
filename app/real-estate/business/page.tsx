import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  ShoppingBag,
  Boxes,
  ClipboardCheck,
  Scale,
  Wallet,
  Ban,
  Lock,
  Timer,
  Shield,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BusinessPage() {
  const services = [
    {
      icon: <ShoppingBag className="h-8 w-8 text-[#94a3b8]" />,
      title: 'Business Opportunity Sales',
      description:
        'Specializing in the sale of established businesses, including retail, service sectors, and franchises. We handle the valuation and marketing of business-only or business-with-real-estate assets.',
    },
    {
      icon: <Boxes className="h-8 w-8 text-[#f97316]" />,
      title: 'Real Estate Logistics',
      description:
        'Our niche expertise. We assist businesses in optimizing their physical footprint, focusing on distribution hubs and logistics centers that drive operational efficiency.',
      featured: true,
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-[#94a3b8]" />,
      title: 'Due Diligence & Valuation',
      description:
        'Comprehensive analysis of business financial records and lease agreements. We ensure that every business opportunity listed meets our List 2 Last standards of transparency.',
    },
  ];

  const financing = [
    {
      icon: <Scale className="h-10 w-10 text-[#f97316]" />,
      overline: 'Ethical Business Funding',
      title: 'Shariah-Compliant Business Capital',
      items: [
        '<strong>Equity Participation:</strong> Financing models based on profit and loss sharing rather than interest-bearing loans.',
        '<strong>Murabaha (Cost-Plus):</strong> Ethical financing for business equipment, inventory, and assets.',
        '<strong>No Riba:</strong> All contracts are free from interest, ensuring compliance with Islamic financial law.',
      ],
      highlight: true,
    },
    {
      icon: <Wallet className="h-10 w-10 text-[#f97316]" />,
      overline: 'Agent 100% Commission',
      title: '100% Commission for Business Brokers',
      items: [
        '<strong>Flat Transaction Fee:</strong> Retain 100% of your commission on business opportunity sales.',
        '<strong>Plan Flexibility:</strong> Choose between Plan 01 (Flat Fee per deal) or Plan 02 (Unlimited Monthly) as per the ODR manual.',
        '<strong>Commercial Bump-ups:</strong> Tiered fees apply for high-value business acquisitions over $1M to ensure premium corporate support.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#f97316]" />,
      title: 'Earnest Money Protocol',
      text: 'ODR Agents are strictly prohibited from holding client funds. All business deposits must be sent directly to the Closing Agent, Attorney, or Escrow Company.',
    },
    {
      icon: <Lock className="h-6 w-6 text-white" />,
      title: 'Confidentiality & NDA',
      text: 'All business listings require strict adherence to non-disclosure protocols to protect sensitive financial data as outlined in ODR Office Policy.',
    },
    {
      icon: <Timer className="h-6 w-6 text-white" />,
      title: '48-Hour Filing Rule',
      text: 'All Business Opportunity listing agreements and purchase contracts must be uploaded to the ODR system within 48 hours of signature.',
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Anti-Fraud Verification',
      text: 'Strict verification of wire instructions is mandatory for all business transfers to prevent cyber-fraud and protect client capital.',
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
              <Briefcase className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Business Opportunities &amp; Logistics</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Strategic Business Brokerage &amp; Logistics</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Facilitating the acquisition and sale of business opportunities with precision. We combine real estate logistics with Shariah-compliant financial modeling to ensure your business transition is seamless and ethical.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-[#0f1724] via-[#111927] to-[#0f1724]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-white/70 uppercase">Business Service Pillars</p>
            <h2 className="text-4xl font-bold text-white mt-3">Commerce, Logistics, Compliance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-2xl border ${
                  service.featured ? 'border-[#f97316] bg-gradient-to-b from-[#1f2933] to-[#111827]' : 'border-white/10 bg-[#0f1724]'
                } p-8 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/80 leading-relaxed text-sm">{service.description}</p>
                {service.featured && (
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-[#f97316]">
                    Highlight · Logistics
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0b0f19] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#f97316] bg-gradient-to-r from-[#1f2933] to-[#111827]' : 'border-white/10 bg-white/5'
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

      <section className="bg-[#0b0f19] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className={`flex-1 rounded-2xl border border-white/10 px-6 py-5 flex items-start gap-4 ${
                  item.title === 'Earnest Money Protocol' ? 'bg-[#f97316]/10' : 'bg-white/5'
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

      <section className="py-20 bg-gradient-to-r from-[#101828] to-[#1d2535] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Global Connection</p>
              <h2 className="text-3xl font-bold mb-4">APS-LEADS-DFLX Global Network</h2>
              <p className="text-white/80 leading-relaxed">
                We leverage our proprietary digital platform to connect local business opportunities with a global network of qualified buyers and institutional investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Business Properties?</h2>
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
