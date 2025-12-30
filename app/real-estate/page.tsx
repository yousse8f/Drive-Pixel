import Link from 'next/link';
import { ArrowRight, Home, Building2, Trees, Tractor, Milk, HardHat, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RealEstatePage() {
  const propertyTypes = [
    {
      icon: <Home className="h-12 w-12 text-[#10b981]" />,
      title: 'Residential',
      description: 'Single-family homes and residential properties',
      href: '/real-estate/residential'
    },
    {
      icon: <Building2 className="h-12 w-12 text-[#10b981]" />,
      title: 'Multifamily',
      description: 'Apartment buildings and multi-unit properties',
      href: '/real-estate/multifamily'
    },
    {
      icon: <Building2 className="h-12 w-12 text-[#10b981]" />,
      title: 'Commercial',
      description: 'Office buildings, retail spaces, and commercial properties',
      href: '/real-estate/commercial'
    },
    {
      icon: <MapPin className="h-12 w-12 text-[#10b981]" />,
      title: 'Vacant Land',
      description: 'Undeveloped land and vacant lots',
      href: '/real-estate/vacant-land'
    },
    {
      icon: <Trees className="h-12 w-12 text-[#10b981]" />,
      title: 'Agricultural Land',
      description: 'Farmland and agricultural properties',
      href: '/real-estate/agricultural-land'
    },
    {
      icon: <Milk className="h-12 w-12 text-[#10b981]" />,
      title: 'Dairy Farming',
      description: 'Dairy farm operations and facilities',
      href: '/real-estate/dairy-farming'
    },
    {
      icon: <HardHat className="h-12 w-12 text-[#10b981]" />,
      title: 'Development',
      description: 'Development projects and opportunities',
      href: '/real-estate/development'
    },
    {
      icon: <Briefcase className="h-12 w-12 text-[#10b981]" />,
      title: 'Business',
      description: 'Business properties and commercial ventures',
      href: '/real-estate/business'
    }
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Estate Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive real estate solutions across all property types
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-[#1a1f3a] mb-16">Property Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => (
              <Link key={index} href={type.href}>
                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="flex items-center text-[#10b981] font-semibold">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Our Real Estate Services?</h2>
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
