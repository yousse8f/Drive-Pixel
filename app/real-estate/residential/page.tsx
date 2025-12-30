import Link from 'next/link';
import {
  ArrowRight,
  Home,
  Search,
  LineChart,
  Handshake,
  Scale,
  DollarSign,
  Ban,
  Shield,
  Timer,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResidentialPage() {
  const services = [
    {
      icon: <Search className="h-8 w-8 text-[#d4af37]" />,
      title: 'Smart Home Search',
      description:
        'Access to real-time listings through NWMLS and our proprietary APS-LEADS-DFLX platform. We provide virtual tours and digital tools to help you find the perfect single-family home or condo.',
    },
    {
      icon: <LineChart className="h-8 w-8 text-[#d4af37]" />,
      title: 'List 2 Last Program',
      description:
        'For sellers, we utilize our List 2 Last strategy. We ensure your property is marketed globally via our CYPS network to attract high-intent buyers and institutional investors.',
    },
    {
      icon: <Handshake className="h-8 w-8 text-[#d4af37]" />,
      title: 'Expert Mentorship',
      description:
        'Every transaction is backed by our Broker Mentor program. Whether you are a first-time buyer or a seasoned investor, our agents are guided by industry veterans to ensure a smooth closing.',
    },
  ];

  const financing = [
    {
      icon: <Scale className="h-10 w-10 text-[#d4af37]" />,
      overline: 'Ethical Residential Funding',
      title: 'Shariah-Compliant Funding',
      items: [
        '<strong>Murabaha:</strong> Interest-free, cost-plus-profit home financing.',
        '<strong>Ijarah:</strong> Ethical lease-to-own residential models.',
        '<strong>Halal Investment:</strong> All residential transactions are audited to ensure they remain free from Riba (interest).',
      ],
      highlight: true,
    },
    {
      icon: <DollarSign className="h-10 w-10 text-[#d4af37]" />,
      overline: 'Agent 100% Commission',
      title: '100% Commission Residential Plan',
      items: [
        '<strong>Flat Fee:</strong> Keep 100% of your residential commission.',
        '<strong>State-Specific Fees:</strong> Transaction fees as low as $495 (FL) or $695 (WA/NY).',
        '<strong>No Hidden Fees:</strong> No desk fees, no monthly office rent, and full digital sponsorship.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#d97706]" />,
      title: 'No Cash/Check Handling',
      text: 'ODR Agents are strictly prohibited from accepting or holding Earnest Money. All residential deposits must be wired directly to the Title/Escrow company.',
    },
    {
      icon: <Scale className="h-6 w-6 text-white" />,
      title: 'Fair Housing Act',
      text: 'We provide equal professional service without regard to race, religion, sex, or familial status, strictly following Federal and State Fair Housing laws.',
    },
    {
      icon: <Timer className="h-6 w-6 text-white" />,
      title: '48-Hour Compliance',
      text: 'All residential listing agreements and purchase contracts must be uploaded to the ODR digital portal within 48 hours of execution.',
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: 'Anti-Fraud Protocol',
      text: 'To prevent wire fraud, all financial instructions for residential closings must be verified through our secure legal channels.',
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
              <Home className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Residential Real Estate</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Digital Boutique Residential Firm</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Redefining the home buying and selling experience through cutting-edge technology, expert mentorship, and ethical financial standards.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#f5f6f9]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#0f1b2d] uppercase">Residential Services</p>
            <h2 className="text-4xl font-bold text-[#1a2434] mt-3">Guiding Every Buyer and Seller</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-2xl border ${
                  service.title === 'Expert Mentorship'
                    ? 'border-[#d4af37] bg-gradient-to-b from-[#fff9ec] to-white'
                    : 'border-white/80 bg-white'
                } shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-[#0f1b2d]/5 flex items-center justify-center mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#1a2434] mb-3">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f1b2d] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#d4af37] bg-gradient-to-r from-[#1f2b3f] to-[#0f1b2d]' : 'border-white/10 bg-white/5'
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

      <section className="bg-[#101722] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div
                key={item.title}
                className={`flex-1 rounded-2xl border border-white/10 px-6 py-5 flex items-start gap-4 ${
                  item.title === 'No Cash/Check Handling' ? 'bg-[#d97706]/15' : 'bg-white/5'
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

      <section className="py-20 bg-gradient-to-r from-[#0f1b2d] via-[#182842] to-[#0f1b2d] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Global Connection</p>
              <h2 className="text-3xl font-bold mb-4">Global Reach, Local Expertise</h2>
              <p className="text-white/80 leading-relaxed">
                Through our international partners and digital presence, your residential property gains exposure to a global network of ethical investors and qualified buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Interested in Residential Properties?</h2>
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
