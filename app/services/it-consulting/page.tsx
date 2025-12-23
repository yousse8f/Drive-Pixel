import Link from 'next/link';
import { ArrowRight, Headphones, ClipboardList, Lightbulb, Gauge, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceHero } from '@/components/ServiceHero';

export default function ITConsultingSupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ServiceHero 
        title="IT Consulting & Support Services"
        description="Expert guidance to improve your IT infrastructure, strategy, and ongoing operations."
      />
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <ClipboardList className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">System analysis & planning</h3>
              <p className="text-gray-600">Comprehensive analysis and strategic planning.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Lightbulb className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">IT strategy & implementation</h3>
              <p className="text-gray-600">IT strategy and implementation tailored to your goals.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Gauge className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Performance optimization</h3>
              <p className="text-gray-600">Enhance the performance of your IT systems.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Headphones className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">24/7 support</h3>
              <p className="text-gray-600">Round-the-clock support for your IT needs.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <AlertTriangle className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Risk assessment & audits</h3>
              <p className="text-gray-600">Identify, assess, and mitigate potential risks.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Contact us for expert IT consulting!</h2>
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
