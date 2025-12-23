import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, ShoppingCart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CompanyOverviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="relative py-20 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/contact.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Company Overview</h1>
          <p className="text-xl text-white/90 max-w-4xl mx-auto">
            Drive Pixel is designed to serve businesses of all sizes, delivering IT services, software solutions, and creative projects from a single platform. Hosted securely on Bluehost VPS, our platform ensures scalability, performance, and compliance for our clients.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1f3a] mb-10 text-center">Key Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Shield className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">End-to-end IT services</h3>
              <p className="text-gray-600">Web, Mobile, Software, and Cybersecurity delivered from one trusted team.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <TrendingUp className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Marketing automation & CRM integration</h3>
              <p className="text-gray-600">Connect leads, pipelines, and campaigns to streamline growth and customer engagement.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <ShoppingCart className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">E-commerce stores</h3>
              <p className="text-gray-600">Complete product/service management, payments, inventory, and scalable storefront experiences.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Palette className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Creative solutions</h3>
              <p className="text-gray-600">Branding, graphics, and screen-print design crafted with pixel-perfect attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Let’s build something reliable and scalable.</h2>
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
