'use client';

import Navbar from '@/components/Navbar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Cookie Policy</h1>
                    <p className="text-xl text-primary-100">Last updated: December 4, 2025</p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-neutral-100 flex-1">
                <div className="container-custom max-w-5xl">
                    <div className="bg-neutral-0 p-8 rounded-lg shadow-sm border border-neutral-200">
                        <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-primary-900 mb-6">What Are Cookies?</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Cookies are small files that are stored on your device when you visit our website. They help us remember your preferences and improve your browsing experience.
                        </p>

                        <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Types of Cookies We Use</h2>
                        <h3 className="text-2xl font-semibold text-primary-800 mb-4">Essential Cookies</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                        </p>

                        <h3 className="text-2xl font-semibold text-primary-800 mb-4">Performance Cookies</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>

                        <h3 className="text-2xl font-semibold text-primary-800 mb-4">Functional Cookies</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            These cookies enable the website to provide enhanced functionality and personalization, such as remembering your preferences.
                        </p>

                        <h3 className="text-2xl font-semibold text-primary-800 mb-4">Marketing Cookies</h3>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            These cookies are used to track visitors across websites and display relevant advertisements based on their browsing history.
                        </p>

                        <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">How to Control Cookies</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.
                        </p>

                        <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Third-Party Cookies</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            In some special cases, we also use cookies provided by trusted third parties. These third parties may use cookies to track your internet usage and show you targeted advertising based on your profile.
                        </p>

                        <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Updates to This Policy</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please review this policy periodically to stay informed about how we use cookies.
                        </p>

                        <h2 className="text-3xl font-bold text-primary-900 mb-6 mt-8">Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If you have any questions about our Cookie Policy, please contact us at support@drivepixel.com
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
    );
}
