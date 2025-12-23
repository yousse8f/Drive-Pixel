import Link from 'next/link';
import { ArrowRight, Code, Cloud, Plug, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SoftwareSolutionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-20 bg-gradient-to-r from-[#1a1f3a] to-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Custom Software Solutions for Your Business</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Tailored software solutions to optimize your business operations and workflows.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Code className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Inventory & workflow automation</h3>
              <p className="text-gray-600">Automate and optimize your business processes.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Cloud className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Cloud-based solutions</h3>
              <p className="text-gray-600">Scalable solutions hosted on the cloud.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Plug className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">API integrations</h3>
              <p className="text-gray-600">Seamlessly integrate with existing systems.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Shield className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Scalable & secure architecture</h3>
              <p className="text-gray-600">Built to grow with your business.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <HeadphonesIcon className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Regular updates & support</h3>
              <p className="text-gray-600">Continuous support and updates.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Request a consultation for your software needs!</h2>
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
