/**
 * Navbar Component
 * Main navigation bar with authentication state
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NavbarProps {
    darkBg?: boolean;
}

export default function Navbar({ darkBg = false }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [technologyDropdownOpen, setTechnologyDropdownOpen] = useState(false);
    const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const isDark = darkBg || isHomePage;

    const navBgClass = 'bg-primary-900';
    const navBorderClass = 'border-primary-900';
    const linkColorClass = 'text-primary-100 hover:text-neutral-0 text-base font-medium';

    return (
        <nav className={`${navBgClass} border-b ${navBorderClass} sticky top-0 z-50 shadow-lg`} suppressHydrationWarning>
            <div className="container-custom" suppressHydrationWarning>
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/logo-eecf49f1.png"
                            alt="DrivePixel Logo"
                            width={140}
                            height={50}
                            className="h-12 w-auto"
                        />
                        <span className="text-white font-bold text-xl hidden sm:inline">DrivePixel</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link
                            href="/"
                            className={`${linkColorClass} transition-colors`}
                        >
                            Home
                        </Link>
                        <div className="relative group">
                            <button
                                className={`${linkColorClass} transition-colors flex items-center gap-1`}
                                onMouseEnter={() => setAboutDropdownOpen(true)}
                                onMouseLeave={() => setAboutDropdownOpen(false)}
                            >
                                About Us
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {aboutDropdownOpen && (
                                <div
                                    className="absolute left-0 top-full mt-0 w-56 bg-primary-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                                    onMouseEnter={() => setAboutDropdownOpen(true)}
                                    onMouseLeave={() => setAboutDropdownOpen(false)}
                                >
                                    <Link href="/about" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            About Us
                                        </div>
                                    </Link>
                                    <Link href="/about/company-overview" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Company Overview
                                        </div>
                                    </Link>
                                    <Link href="/about/history" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Our History
                                        </div>
                                    </Link>
                                    <Link href="/about/clients" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Clients
                                        </div>
                                    </Link>
                                    <Link href="/about/we-work-in" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            We Work In
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="relative group">
                            <button
                                className={`${linkColorClass} transition-colors flex items-center gap-1`}
                                onMouseEnter={() => setServicesDropdownOpen(true)}
                                onMouseLeave={() => setServicesDropdownOpen(false)}
                            >
                                Services
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            {servicesDropdownOpen && (
                                <div
                                    className="absolute left-0 top-full mt-0 w-56 bg-primary-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                                    onMouseEnter={() => setServicesDropdownOpen(true)}
                                    onMouseLeave={() => setServicesDropdownOpen(false)}
                                >
                                    <Link href="/services" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            All Services
                                        </div>
                                    </Link>
                                    <Link href="/services/web-development" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Web Development
                                        </div>
                                    </Link>
                                    <Link href="/services/mobile-app-development" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Mobile App Development
                                        </div>
                                    </Link>
                                    <Link href="/services/software-solutions" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Software Solutions
                                        </div>
                                    </Link>
                                    <Link href="/services/it-consulting" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            IT Consulting & Support
                                        </div>
                                    </Link>
                                    <Link href="/services/cybersecurity" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Cybersecurity Services
                                        </div>
                                    </Link>
                                    <Link href="/services/real-estate" className="block">
                                        <div className="px-4 py-3 text-neutral-0 hover:bg-primary-500 hover:text-white transition-all duration-300 font-medium cursor-pointer border-b border-primary-600">
                                            Real Estate IT Solutions
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        <Link
                            href="/portfolio"
                            className={`${linkColorClass} transition-colors`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/blog"
                            className={`${linkColorClass} transition-colors`}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/careers"
                            className={`${linkColorClass} transition-colors`}
                        >
                            Careers
                        </Link>
                        <Link
                            href="/contact"
                            className={`${linkColorClass} transition-colors`}
                        >
                            Contact
                        </Link>
                        <Link href="mailto:support@drivepixel.com">
                            <Button className="bg-cta hover:bg-cta-600 text-white flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95">
                                <Mail className="h-5 w-5" />
                                Email Us
                            </Button>
                        </Link>
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className={`md:hidden ${isDark ? 'text-white' : 'text-gray-900'}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 bg-primary-700">
                        <Link
                            href="/"
                            className={`block ${linkColorClass} transition-colors`}
                        >
                            Home
                        </Link>
                        <div>
                            <button
                                className={`block w-full text-left ${linkColorClass} transition-colors flex items-center justify-between`}
                                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                            >
                                About Us
                                <ChevronDown className={`h-4 w-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {aboutDropdownOpen && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="/about" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">About Us</h3>
                                        </div>
                                    </Link>
                                    <Link href="/about/company-overview" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Company Overview</h3>
                                        </div>
                                    </Link>
                                    <Link href="/about/history" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Our History</h3>
                                        </div>
                                    </Link>
                                    <Link href="/about/clients" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Clients</h3>
                                        </div>
                                    </Link>
                                    <Link href="/about/we-work-in" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">We Work In</h3>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                className={`block w-full text-left ${linkColorClass} transition-colors flex items-center justify-between`}
                                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                            >
                                Services
                                <ChevronDown className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {servicesDropdownOpen && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="/services" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">All Services</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/web-development" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Web Development</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/mobile-app-development" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Mobile App Development</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/software-solutions" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Software Solutions</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/it-consulting" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">IT Consulting & Support</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/cybersecurity" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Cybersecurity Services</h3>
                                        </div>
                                    </Link>
                                    <Link href="/services/real-estate" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Real Estate IT Solutions</h3>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                className={`block w-full text-left ${linkColorClass} transition-colors flex items-center justify-between`}
                                onClick={() => setTechnologyDropdownOpen(!technologyDropdownOpen)}
                            >
                                Technology
                                <ChevronDown className={`h-4 w-4 transition-transform ${technologyDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {technologyDropdownOpen && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <div className="p-3 text-neutral-0 font-bold text-sm bg-primary-700 rounded-lg">
                                        UI/UX
                                    </div>
                                    <Link href="/technology/frontend" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Frontend</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/backend" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Backend</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/ecommerce" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">eCommerce</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/framework" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Framework</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/mobile" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Mobile</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/database" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Database</h3>
                                        </div>
                                    </Link>
                                    <Link href="/technology/cloud" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Cloud</h3>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                className={`block w-full text-left ${linkColorClass} transition-colors flex items-center justify-between`}
                                onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                            >
                                Industry
                                <ChevronDown className={`h-4 w-4 transition-transform ${industryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {industryDropdownOpen && (
                                <div className="mt-2 space-y-2 pl-4">
                                    <Link href="/industry/education" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Education</h3>
                                        </div>
                                    </Link>
                                    <Link href="/industry/retail" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Retail</h3>
                                        </div>
                                    </Link>
                                    <Link href="/industry/food-travel-hotel" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Food, Travel & Hotel</h3>
                                        </div>
                                    </Link>
                                    <Link href="/industry/media-entertainment" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Media & Entertainment</h3>
                                        </div>
                                    </Link>
                                    <Link href="/industry/real-estate" className="block">
                                        <div className="p-3 text-neutral-0 hover:bg-primary-700 rounded-lg transition-colors">
                                            <h3 className="font-semibold">Real Estate</h3>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <Link
                            href="/portfolio"
                            className={`block ${linkColorClass} transition-colors`}
                        >
                            Portfolio
                        </Link>
                        <Link
                            href="/blog"
                            className={`block ${linkColorClass} transition-colors`}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/careers"
                            className={`block ${linkColorClass} transition-colors`}
                        >
                            Careers
                        </Link>
                        <Link
                            href="/contact"
                            className={`block ${linkColorClass} transition-colors`}
                        >
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
