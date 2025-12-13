/**
 * Privacy Policy Page
 */

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import { Lock, Shield, Eye, Users, FileText, Phone, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero */}
            <section className="bg-primary-900 text-neutral-0 py-20">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-neutral-100 flex-1">
                <div className="container-custom max-w-5xl">
                    <div className="space-y-12">
                        {/* Information We Collect */}
                        <div>
                            <h2 className="text-3xl font-bold mb-8">Information We Collect</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <Eye className="h-5 w-5 text-primary-500" />
                                        Personal Information Provided by You
                                    </h3>
                                    <ul className="space-y-2 text-neutral-700">
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Name
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Email address
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Phone number
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Address
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary-500" />
                                        Automatically Collected Data
                                    </h3>
                                    <ul className="space-y-2 text-neutral-700">
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> IP address
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Device activity
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Browsing activity
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="text-primary-500">•</span> Location data
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Data Security */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Data Security & Cookies</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <Lock className="h-5 w-5 text-success" />
                                        Security Measures
                                    </h3>
                                    <p className="text-neutral-700">
                                        Industry standard security systems protect your data. Users are responsible for password safety.
                                    </p>
                                </div>

                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-gold-500" />
                                        Cookies
                                    </h3>
                                    <p className="text-neutral-700">
                                        Used to enhance website experience. Can be managed via browser settings.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Information */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
                            <div className="bg-neutral-0 p-8 rounded-lg shadow-sm border border-neutral-200 space-y-4">
                                <div className="flex gap-4">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <div>
                                        <p className="font-semibold text-neutral-900">Provide Services</p>
                                        <p className="text-neutral-700">To deliver and improve our services and features</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <div>
                                        <p className="font-semibold text-neutral-900">Communication</p>
                                        <p className="text-neutral-700">To send updates, notifications, and support messages</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <div>
                                        <p className="font-semibold text-neutral-900">Legal Compliance</p>
                                        <p className="text-neutral-700">To comply with legal obligations and protect our rights</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-primary-500 font-bold">•</span>
                                    <div>
                                        <p className="font-semibold text-neutral-900">Marketing (Only with Consent)</p>
                                        <p className="text-neutral-700">To send promotional materials where permitted by law</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Information Sharing */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Information Sharing</h2>
                            <div className="space-y-4">
                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary-500" />
                                        Service Providers
                                    </h3>
                                    <p className="text-neutral-700">We share information with service providers who assist us in operating our business, subject to confidentiality agreements.</p>
                                </div>
                                <div className="bg-neutral-0 p-6 rounded-lg shadow-sm border border-neutral-200">
                                    <h3 className="font-bold text-neutral-900 mb-2">Legal Requirements</h3>
                                    <p className="text-neutral-700">We may disclose information when required by law or to protect our rights and safety.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Us */}
                        <div className="bg-primary-900 text-neutral-0 p-8 rounded-lg">
                            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                            <p className="mb-6 text-primary-100">
                                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <a href="/contact" className="flex items-center gap-2 text-primary-100 hover:text-neutral-0 transition-colors">
                                        <Mail className="h-4 w-4 text-highlight" />
                                        <span className="text-highlight font-semibold">Email:</span>
                                        <span className="hover:underline">Contact@drivepixel.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-neutral-300 text-center text-neutral-600">
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
