import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  PenSquare,
  Handshake,
  CreditCard,
  DollarSign,
  Ban,
  Scale,
  Timer,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function VacantLandPage() {
  const services = [
    {
      icon: <MapPin className="h-8 w-8 text-[#0b6b3a]" />,
      title: 'Land Acquisition',
      description:
        'Expert guidance on purchasing vacant land for residential, commercial, or agricultural use. We analyze zoning, utilities, and development potential.',
    },
    {
      icon: <PenSquare className="h-8 w-8 text-[#0b6b3a]" />,
      title: 'Build 2 Suit (B2S) Program',
      description:
        'Don’t just buy land—build your vision. We connect land buyers with architects and builders to create custom projects tailored to specific needs.',
      featured: true,
    },
    {
      icon: <Handshake className="h-8 w-8 text-[#0b6b3a]" />,
      title: 'Development Partnerships',
      description:
        'Leveraging our global network and the APS-LEADS-DFLX platform to connect land owners with international investors and developers.',
    },
  ];

  const financing = [
    {
      icon: <CreditCard className="h-10 w-10 text-[#0b6b3a]" />,
      overline: 'Financing Options',
      title: 'Shariah-Compliant Land Funding',
      items: [
        '<strong>Murabaha:</strong> Transparent, interest-free land financing.',
        '<strong>Installment Plans:</strong> Structured payments aligned with ethical financial laws.',
        '<strong>Joint Venture:</strong> Shared equity models for large-scale land development.',
      ],
    },
    {
      icon: <DollarSign className="h-10 w-10 text-[#0b6b3a]" />,
      overline: 'Agent Compensation',
      title: '100% Commission on Land Deals',
      items: [
        '<strong>Transaction Fee:</strong> Fixed flat fee (refer to your specific state plan).',
        '<strong>Referral Structure:</strong> 10% referral fee for active agents; 15% for "Park Your License" or "Brand New" agents.',
        '<strong>Transparency:</strong> No hidden costs or desk fees.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#cd5c08]" />,
      title: 'No Direct Deposits',
      text: 'ODR policy strictly forbids agents from receiving Earnest Money. All deposits for land must be sent directly to the Escrow or Title company.',
    },
    {
      icon: <Scale className="h-6 w-6 text-[#0b6b3a]" />,
      title: 'Zoning & Due Diligence',
      text: 'All land transactions must adhere to state-specific environmental and zoning regulations as outlined in the ODR Policy Manual.',
    },
    {
      icon: <Timer className="h-6 w-6 text-[#0b6b3a]" />,
      title: '48-Hour Upload Rule',
      text: 'Agents must upload all Vacant Land listing agreements and sales contracts to the ODR system within 48 hours.',
    },
    {
      icon: <Shield className="h-6 w-6 text-[#0b6b3a]" />,
      title: 'Fair Housing Land Act',
      text: 'We ensure equal opportunity in land sales, strictly prohibiting discrimination in all forms.',
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
              <MapPin className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Vacant Land &amp; Explore Vacant Land</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Unlock Potential with Vacant Land</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            From raw land to custom development. We provide the platform and expertise to transform vacant lots into high-value assets through our Build 2 Suit program.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#f5f8f2]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#2d2a1f] uppercase">Strategic Land Services</p>
            <h2 className="text-4xl font-bold text-[#1f2a1b] mt-3">Turn Empty Lots into Living Assets</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-2xl border ${
                  service.featured ? 'border-[#0b6b3a] bg-gradient-to-b from-[#0b6b3a]/10 to-white' : 'border-white/80 bg-white'
                } shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-[#0b6b3a]/10 flex items-center justify-center mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#1f2a1b] mb-3">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
                {service.featured && (
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-[#0b6b3a]">
                    Featured Service · Build 2 Suit
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f1a13] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg hover:bg-white/10 transition-all duration-300"
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

      <section className="bg-[#152018] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 flex items-start gap-4"
              >
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    item.title === 'No Direct Deposits' ? 'bg-[#cd5c08]/15' : 'bg-white/10'
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

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Handshake className="h-9 w-9 text-white" />
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Call to Action</p>
          <h2 className="text-3xl font-bold mb-4">Start Your Development Journey</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Contact our List 2 Last specialists to evaluate your land's market value or explore our Build 2 Suit options today.
          </p>
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
