/**
 * Navbar Component
 * Main navigation bar with authentication state
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import CartIcon from './ui/CartIcon';

interface DropdownItem {
    href: string;
    label: string;
}

interface MegaSection {
    title: string;
    links: DropdownItem[];
}

interface NavLink {
    href: string;
    label: string;
    dropdown?: DropdownItem[];
    megaSections?: MegaSection[];
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navLinks: NavLink[] = [
        {
            href: '/services/real-estate',
            label: 'Real Estate',
            megaSections: [
                {
                    title: 'Operations',
                    links: [
                        { href: '/services/real-estate', label: 'Real Estate IT Solutions' },
                        { href: '#', label: 'Property Operations' },
                        { href: '#', label: 'Investor Portals' },
                    ],
                },
                {
                    title: 'Growth & Leads',
                    links: [
                        { href: '#', label: 'CRM & Lead Systems' },
                        { href: '#', label: 'Marketing Automation' },
                    ],
                },
                {
                    title: 'Intelligence',
                    links: [
                        { href: '#', label: 'Market Analytics' },
                        { href: '#', label: 'Monthly Market Snapshot' },
                    ],
                },
            ],
        },
        {
            href: '/logistics',
            label: 'Freight-Logistics',
            megaSections: [
                {
                    title: 'Operations',
                    links: [
                        { href: '#', label: 'Freight Logistics' },
                        { href: '#', label: 'Supply Chain' },
                        { href: '#', label: 'Warehouse Systems' },
                    ],
                },
                {
                    title: 'Fleet & Routing',
                    links: [
                        { href: '#', label: 'Transportation' },
                        { href: '#', label: 'Fleet Telematics' },
                        { href: '#', label: 'Route Optimization' },
                    ],
                },
                {
                    title: 'Insights',
                    links: [
                        { href: '#', label: 'Market Trends' },
                        { href: '#', label: 'Performance Dashboards' },
                    ],
                },
            ],
        },
        {
            href: '/services',
            label: 'Services',
            megaSections: [
                {
                    title: 'Digital Products & Solutions',
                    links: [
                        { href: '/services/web-development', label: 'Web Development' },
                        { href: '/services/mobile-app-development', label: 'Mobile App Development' },
                        { href: '/services/software-solutions', label: 'Custom Software Solutions' },
                    ],
                },
                {
                    title: 'Consulting & Security',
                    links: [
                        { href: '/services/it-consulting', label: 'IT Consulting' },
                        { href: '/services/cybersecurity', label: 'Cybersecurity' },
                        { href: '/services/real-estate', label: 'Real Estate Tech' },
                    ],
                },
                {
                    title: 'Logistics & Ops',
                    links: [
                        { href: '#', label: 'Freight Logistics' },
                        { href: '#', label: 'Supply Chain' },
                        { href: '#', label: 'Transportation' },
                    ],
                },
            ],
        },
        {
            href: '/about',
            label: 'About Us',
            megaSections: [
                {
                    title: 'Get to Know Us',
                    links: [
                        { href: '/about', label: 'About the Company' },
                        { href: '/about/company-overview', label: 'Overview' },
                        { href: '/about/history', label: 'Our History' },
                    ],
                },
                {
                    title: 'Relationships & Partners',
                    links: [
                        { href: '/about/clients', label: 'Our Clients' },
                        { href: '/portfolio', label: 'Featured Work' },
                        { href: '/about/we-work-in', label: 'Fields We Work In' },
                    ],
                },
                {
                    title: 'Join & Connect',
                    links: [
                        { href: '/careers', label: 'Careers' },
                        { href: '/blog', label: 'Blog & News' },
                        { href: '/contact', label: 'Contact Us' },
                    ],
                },
            ],
        },
        { href: '/blog', label: 'Blog' },
        { href: '/shop', label: 'Shop' },
        { href: '/contact', label: 'Contact' },
    ];

    const navBgClass = 'bg-[#050b1d]/95 backdrop-blur-xl';
    const navBorderClass = 'border-white/5';
    const linkBaseClass =
        'px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';
    const dropdownItemClass =
        'block px-4 py-2.5 rounded-md text-base text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';
    const megaCardClass =
        'group block rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3.5 text-base text-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.45)] hover:bg-white/[0.06] hover:border-emerald-400/60 hover:shadow-[0_20px_45px_-22px_rgba(16,185,129,0.45)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';

    const handleMouseEnter = (label: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 160);
    };

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <nav className={`${navBgClass} border-b ${navBorderClass} sticky top-0 z-50 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] px-4 sm:px-6 lg:px-8`}>
            <div className="hidden md:flex items-center justify-between py-2 text-xs text-white border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-emerald-400" />
                    <Link
                        href="mailto:Contact@drivepixel.com"
                        className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    >
                        Contact@drivepixel.com
                    </Link>
                </div>
                <div className="flex items-center gap-3 text-white">
                    <span className="hidden lg:inline">Enterprise technology for operations & growth</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                    <Link
                        href="/contact"
                        className="hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                    >
                        Support
                    </Link>
                </div>
            </div>

            <div className="w-full">
                <div className="flex items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/images/logo-eecf49f1.png"
                                alt="DrivePixel Logo"
                                width={140}
                                height={50}
                                className="h-10 w-auto"
                            />
                            <span className="text-white text-xl font-bold">DrivePixel</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Right Aligned */}
                    <div className="hidden md:flex items-center justify-end flex-1 gap-1 pr-2">
                        {navLinks.map((link) => {
                            const hasMega = link.megaSections && link.megaSections.length > 0;
                            const hasDropdown = link.dropdown && link.dropdown.length > 0;
                            const shouldOpen = hasMega || hasDropdown;
                            return (
                                <div
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => shouldOpen && handleMouseEnter(link.label)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link
                                        href={link.href}
                                        className={`${linkBaseClass} flex items-center gap-2`}
                                    >
                                        {link.label}
                                        {shouldOpen && (
                                            <ChevronDown className="h-4 w-4 text-white/60 transition-transform duration-150 group-hover:-translate-y-[1px]" />
                                        )}
                                    </Link>
                                    <span className="pointer-events-none absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-emerald-400/0 group-hover:bg-emerald-400/70 transition-colors duration-200" />

                                    {hasMega && openDropdown === link.label && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-screen max-w-4xl bg-[#070f25]/95 border border-white/8 rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] z-50 opacity-100 translate-y-0 transition duration-200 ease-out backdrop-blur">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                                {link.megaSections?.map((section) => (
                                                    <div key={section.title} className="space-y-3">
                                                        <h3 className="text-xs font-semibold uppercase tracking-wide text-white">
                                                            {section.title}
                                                        </h3>
                                                        <div className="grid gap-2.5">
                                                            {section.links.map((item) => (
                                                                <Link key={item.label} href={item.href} className={megaCardClass}>
                                                                    <span className="block font-medium text-white/90 group-hover:text-white">
                                                                        {item.label}
                                                                    </span>
                                                                    <span className="block text-[12px] text-white/90 group-hover:text-white transition-colors">
                                                                        Explore {item.label}
                                                                    </span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {hasDropdown && openDropdown === link.label && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[420px] bg-[#070f25]/95 border border-white/8 rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] z-50 opacity-100 translate-y-0 transition duration-200 ease-out backdrop-blur">
                                            <div className="p-5 space-y-1.5">
                                                {link.dropdown?.map((item) => (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        className={dropdownItemClass}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right-Side Actions */}
                    <div className="flex items-center gap-4 pl-4">
                        {/* Cart and Contact Us - Desktop */}
                        <div className="hidden md:flex items-center gap-4">
                            <CartIcon />
                            <Link href="mailto:Contact@drivepixel.com" className="whitespace-nowrap">
                                <Button className="bg-emerald-500/90 hover:bg-emerald-400 text-[#041028] font-semibold px-4 py-2 rounded-full shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
                                    <Mail className="h-4 w-4 mr-2" />
                                    <span>Contact Us</span>
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden flex items-center gap-3">
                            <CartIcon />
                            <button
                                className="text-white p-2 rounded-md hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#060f23]/95 border-t border-white/10 shadow-lg backdrop-blur">
                    <div className="px-6 py-4 space-y-2">
                        {navLinks.map((link) => {
                            const hasMega = link.megaSections && link.megaSections.length > 0;
                            const hasDropdown = link.dropdown && link.dropdown.length > 0;
                            const shouldOpen = hasMega || hasDropdown;
                            const isOpen = openDropdown === link.label;
                            return (
                                <div key={link.label} className="border-b border-white/10 last:border-none">
                                    <Link
                                        href={link.href}
                                        className="text-white/90 flex items-center justify-between w-full py-3 text-sm font-medium"
                                        onClick={() => {
                                            if (shouldOpen) {
                                                setOpenDropdown(isOpen ? null : link.label);
                                            } else {
                                                setMobileMenuOpen(false);
                                            }
                                        }}
                                    >
                                        {link.label}
                                        {shouldOpen && (
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                            />
                                        )}
                                    </Link>

                                    {hasMega && isOpen && (
                                        <div className="pl-2 pb-3 space-y-3">
                                            {link.megaSections?.map((section) => (
                                                <div key={section.title} className="space-y-1">
                                                    <p className="text-[11px] font-semibold uppercase text-emerald-300">
                                                        {section.title}
                                                    </p>
                                                    <div className="space-y-1">
                                                        {section.links.map((item) => (
                                                            <Link
                                                                key={item.label}
                                                                href={item.href}
                                                                className="block py-1.5 text-white/80 hover:text-white text-sm"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {hasDropdown && isOpen && (
                                        <div className="pl-2 pb-3 space-y-1">
                                            {link.dropdown?.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className="block py-2 text-white/80 hover:text-white text-sm"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div className="pt-3">
                            <Link href="mailto:Contact@drivepixel.com">
                                <Button className="w-full bg-emerald-500/90 hover:bg-emerald-400 text-[#041028] font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-full shadow-sm transition-all duration-200">
                                    <Mail className="h-4 w-4" />
                                    <span>Contact Us</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
