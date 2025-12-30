import Link from 'next/link';
import {
  ArrowRight,
  Tractor,
  Milk,
  Sprout,
  Hammer,
  Moon,
  DollarSign,
  Ban,
  Scale,
  Timer,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AgriculturalLandPage() {
  const services = [
    {
      icon: <Milk className="h-8 w-8 text-[#0e5b2d]" />,
      title: 'Dairy Farming & Livestock',
      description:
        'Comprehensive support for acquiring and managing dairy operations. We focus on land suitability, water rights, and infrastructure requirements for sustainable farming.',
    },
    {
      icon: <Sprout className="h-8 w-8 text-[#0e5b2d]" />,
      title: 'Arable & Crop Land',
      description:
        'Sourcing high-yield agricultural plots. Our List 2 Last specialists ensure the land meets the specific environmental and soil standards for your intended crop production.',
    },
    {
      icon: <Hammer className="h-8 w-8 text-[#0e5b2d]" />,
      title: 'Build 2 Suit (Agri-Infrastructure)',
      description:
        'Custom development for agricultural needs. We manage the construction of barns, processing facilities, and storage units from the ground up through our B2S network.',
      featured: true,
    },
  ];

  const financing = [
    {
      icon: <Moon className="h-10 w-10 text-[#0e5b2d]" />,
      overline: 'Ethical Ag-Finance',
      title: 'Shariah-Compliant Ag-Funding',
      items: [
        '<strong>Murabaha:</strong> Interest-free financing for land and farm equipment.',
        '<strong>Ijarah:</strong> Lease-to-own models for large-scale agricultural machinery and facilities.',
        '<strong>Risk Sharing:</strong> Ethical investment structures that align with Islamic finance principles.',
      ],
      highlight: true,
    },
    {
      icon: <DollarSign className="h-10 w-10 text-[#0e5b2d]" />,
      overline: 'Agent Earnings',
      title: '100%Commission Structure',
      items: [
        '<strong>Flat Transaction Fee:</strong> Keep your full commission on large-scale land deals.',
        '<strong>Referral System:</strong> 10% for active agents; 15% for "Park Your License" agents on agricultural leads.',
        '<strong>No Desk Fees:</strong> Maximizing agent profit on complex rural transactions.',
      ],
    },
  ];

  const compliance = [
    {
      icon: <Ban className="h-6 w-6 text-[#c05621]" />,
      title: 'Earnest Money Protocol',
      text: 'ODR Agents must never touch client funds. All earnest money for agricultural purchases must be wired directly to the Escrow/Title company.',
    },
    {
      icon: <Scale className="h-6 w-6 text-[#0e5b2d]" />,
      title: 'Environmental Compliance',
      text: 'All deals must adhere to local agricultural zoning laws and environmental protection standards as per the ODR Policy Manual.',
    },
    {
      icon: <Timer className="h-6 w-6 text-[#0e5b2d]" />,
      title: '48-Hour Document Rule',
      text: 'All agricultural listing agreements and sales contracts must be uploaded to the ODR digital portal within 48 hours of signing.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#0e5b2d]" />,
      title: 'Secure Transactions',
      text: 'Strict anti-fraud protocols are in place to verify all high-value wire transfers for land acquisitions.',
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
              <Tractor className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="uppercase text-sm tracking-[0.3em] text-white/70 mb-4">Agricultural Land &amp; Dairy Farming</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Sustainable Agricultural Investments</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Cultivating future growth through strategic land acquisition. We provide specialized brokerage for agricultural assets and dairy farming, backed by Shariah-compliant financial structures.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#fbf6ec]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-[0.3em] text-[#6b4d1d] uppercase">Specialized Agricultural Services</p>
            <h2 className="text-4xl font-bold text-[#1e2a1c] mt-3">Operational Support from Soil to Storage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className={`rounded-2xl border ${
                  service.featured
                    ? 'border-[#c68a1e] bg-gradient-to-b from-[#fff3d6] to-white'
                    : 'border-white/80 bg-white'
                } shadow-lg p-8 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="h-14 w-14 rounded-xl bg-[#0e5b2d]/10 flex items-center justify-center mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#1e2a1c] mb-3">{service.title}</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{service.description}</p>
                {service.featured && (
                  <span className="mt-4 inline-flex items-center text-xs font-semibold uppercase tracking-wide text-[#c68a1e]">
                    Highlight · Build 2 Suit
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f1b13] text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financing.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border ${
                  card.highlight ? 'border-[#c68a1e] bg-gradient-to-r from-[#2b3b2d] to-[#1b251c]' : 'border-white/10 bg-white/5'
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

      <section className="bg-[#1c261c] text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {compliance.map((item) => (
              <div key={item.title} className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 flex items-start gap-4">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    item.title === 'Earnest Money Protocol' ? 'bg-[#c05621]/15' : 'bg-white/10'
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

      <section className="py-16 bg-gradient-to-r from-[#0f1b13] to-[#2d3a2a] text-white">
        <div className="container-custom">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center">
                <Globe className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Global Connection</p>
              <h2 className="text-3xl font-bold mb-4">Global Investor Reach</h2>
              <p className="text-white/80 leading-relaxed">
                We use the APS-LEADS-DFLX platform to connect local agricultural opportunities with international investors looking for stable, ethical land assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center">
              <Tractor className="h-9 w-9 text-white" />
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-3">Call to Action</p>
          <h2 className="text-3xl font-bold mb-4">Invest in Agricultural & Dairy Growth</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Speak with our agricultural brokerage team to evaluate farmland value, explore dairy operations, or launch a Build 2 Suit infrastructure project.
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
