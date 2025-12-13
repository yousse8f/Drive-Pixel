import Link from 'next/link';
import { ArrowRight, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WebDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Professional Web Development Services</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            We build websites that are responsive, fast, and tailored to your business needs.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Monitor className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom design & UI/UX</h3>
              <p className="text-gray-600">Tailored designs that reflect your brand.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Monitor className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">CMS integration (WordPress, Joomla…)</h3>
              <p className="text-gray-600">Seamless integration with popular CMS platforms.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Monitor className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SEO-friendly architecture</h3>
              <p className="text-gray-600">Optimized for search engines to improve visibility.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Monitor className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce functionality</h3>
              <p className="text-gray-600">Robust e-commerce solutions for your online store.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Monitor className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Maintenance & support</h3>
              <p className="text-gray-600">Ongoing support to keep your website running smoothly.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Contact us today to start building your website!</h2>
          <Link href="/contact">
            <Button size="lg" className="bg-cta hover:bg-cta-600 text-white">
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
