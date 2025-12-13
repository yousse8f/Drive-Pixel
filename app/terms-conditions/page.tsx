'use client';

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Terms & Conditions</h1>
                    <p className="text-xl text-primary-100">Last updated: December 4, 2025</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-neutral-100 flex-1">
                <div className="container-custom max-w-5xl">
                    <div className="bg-neutral-0 p-8 rounded-lg shadow-sm border border-neutral-200">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-primary-900 mb-6">1. Agreement to Terms</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">2. Use License</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            Permission is granted to temporarily download one copy of the materials (information or software) on DrivePixel's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                            <li>Modifying or copying the materials</li>
                            <li>Using the materials for any commercial purpose or for any public display</li>
                            <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                            <li>Removing any copyright or other proprietary notations from the materials</li>
                            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                            </ul>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">3. Disclaimer</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            The materials on DrivePixel's website are provided on an 'as is' basis. DrivePixel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">4. Limitations</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            In no event shall DrivePixel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DrivePixel's website.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">5. Accuracy of Materials</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            The materials appearing on DrivePixel's website could include technical, typographical, or photographic errors. DrivePixel does not warrant that any of the materials on its website are accurate, complete, or current. DrivePixel may make changes to the materials contained on its website at any time without notice.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">6. Links</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            DrivePixel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DrivePixel of the site. Use of any such linked website is at the user's own risk.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">7. Modifications</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            DrivePixel may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">8. Governing Law</h2>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                            </p>

                            <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">9. Contact Information</h2>
                            <p className="text-gray-700 leading-relaxed">
                            If you have any questions about these Terms & Conditions, please contact us at support@drivepixel.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
