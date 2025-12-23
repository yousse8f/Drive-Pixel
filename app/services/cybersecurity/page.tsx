import Link from 'next/link';
import { ArrowRight, Shield, Lock, FileCheck, HardDrive, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ServiceHero } from '@/components/ServiceHero';

export default function CybersecurityServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ServiceHero 
        title="Cybersecurity Services – Protect Your Business"
        description="Ensure the safety and integrity of your network, data, and digital assets."
      />
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Shield className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Network monitoring & threat detection</h3>
              <p className="text-gray-600">Continuous monitoring to detect threats early and protect your infrastructure.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <Lock className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Data encryption & protection</h3>
              <p className="text-gray-600">Secure your data with advanced encryption standards and protection protocols.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <FileCheck className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Compliance & audits</h3>
              <p className="text-gray-600">Ensure compliance with industry standards and regulatory requirements.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <HardDrive className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Backup & disaster recovery</h3>
              <p className="text-gray-600">Prepare for the unexpected with robust recovery plans and backup solutions.</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-[#10b981]/10 mb-6">
                <GraduationCap className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1f3a] mb-3">Security training for staff</h3>
              <p className="text-gray-600">Empower your team with cybersecurity knowledge and best practices.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-[#1a1f3a] text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Secure your business today!</h2>
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
