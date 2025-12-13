/**
 * Footer Component
 * Site footer with links and information
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin, Instagram, Music, Heart, Youtube, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-primary-900 text-gray-100" suppressHydrationWarning>
            {/* Header Section */}
            <div className="border-b border-primary-700 py-12 bg-gradient-to-r from-primary-900 to-primary-700">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">DrivePixel</h2>
                    <p className="text-primary-300">Intelligent Digital Solutions</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company */}
                    <div>
                        <h3 className="text-white font-bold mb-4 pb-2 border-b-2 border-primary-300 inline-block">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary-300 transition-colors">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-primary-300 transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="hover:text-primary-300 transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="hover:text-primary-300 transition-colors">Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-primary-300 transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-300 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="text-white font-bold mb-4 pb-2 border-b-2 border-primary-300 inline-block">Solutions</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/services" className="hover:text-primary-300 transition-colors">Web & Mobile Apps</Link></li>
                            <li><Link href="/services" className="hover:text-primary-300 transition-colors">Cloud Solutions</Link></li>
                            <li><Link href="/services" className="hover:text-primary-300 transition-colors">AI & Automation</Link></li>
                            <li><Link href="/services" className="hover:text-primary-300 transition-colors">IT Advisory</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold mb-4 pb-2 border-b-2 border-primary-300 inline-block">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/blog" className="hover:text-primary-300 transition-colors">Blog</Link></li>
                            <li><Link href="/portfolio" className="hover:text-primary-300 transition-colors">Case Studies</Link></li>
                            <li><Link href="/contact" className="hover:text-primary-300 transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-4 pb-2 border-b-2 border-primary-300 inline-block">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-primary-300 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions" className="hover:text-primary-300 transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-primary-300 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Logo & Social Media Section */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                        {/* Logo & Site Name */}
                        <div className="flex flex-col items-center lg:items-start gap-3">
                            <Image
                                src="/images/logo-eecf49f1.png"
                                alt="DrivePixel Logo"
                                width={120}
                                height={40}
                                className="h-12 md:h-16 w-auto"
                            />
                            <h3 className="text-white font-bold text-lg">DrivePixel</h3>
                        </div>

                        {/* Follow Us */}
                        <div className="flex-shrink-0 text-center lg:text-right">
                            <h4 className="text-white font-semibold mb-3 text-sm md:text-base">Follow Us On:</h4>
                            <div className="flex gap-3 md:gap-4 justify-center lg:justify-end flex-wrap">
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Facebook className="h-4 w-4 md:h-5 md:w-5" /></a>
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Twitter className="h-4 w-4 md:h-5 md:w-5" /></a>
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Linkedin className="h-4 w-4 md:h-5 md:w-5" /></a>
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Instagram className="h-4 w-4 md:h-5 md:w-5" /></a>
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Youtube className="h-4 w-4 md:h-5 md:w-5" /></a>
                                <a href="#" className="text-primary-100 hover:text-primary-300 transition-colors"><Globe className="h-4 w-4 md:h-5 md:w-5" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-primary-700 bg-primary-800 py-4 md:py-6">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm flex-wrap">
                        {/* Copyright */}
                        <div className="text-primary-100 text-center md:text-left order-2 md:order-1">
                            <p>Copyright © {year} DrivePixel. All rights reserved.</p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-2 md:gap-4 text-primary-100 justify-center md:justify-end text-xs md:text-sm order-1 md:order-2">
                            <Link href="/privacy-policy" className="hover:text-primary-300 transition-colors">Privacy Policy</Link>
                            <span>|</span>
                            <Link href="/terms-conditions" className="hover:text-primary-300 transition-colors">Terms & Conditions</Link>
                            <span>|</span>
                            <Link href="/cookie-policy" className="hover:text-primary-300 transition-colors">Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
