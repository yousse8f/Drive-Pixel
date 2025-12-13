import Link from 'next/link';
import { ArrowRight, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MobileAppDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Mobile App Development for iOS & Android</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Developing intuitive and efficient mobile applications to enhance user engagement.
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Smartphone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cross-platform development</h3>
              <p className="text-gray-600">Build apps that work seamlessly across iOS and Android.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Smartphone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smooth UI/UX design</h3>
              <p className="text-gray-600">Intuitive interfaces designed for great user experiences.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Smartphone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Push notifications & updates</h3>
              <p className="text-gray-600">Keep users engaged with timely notifications and updates.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Smartphone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integration with backend services</h3>
              <p className="text-gray-600">Connect your app with APIs and backend systems reliably.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary-100 mb-6">
                <Smartphone className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">App store deployment</h3>
              <p className="text-gray-600">Publish your app on the App Store and Google Play.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Get in touch to develop your mobile app!</h2>
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
