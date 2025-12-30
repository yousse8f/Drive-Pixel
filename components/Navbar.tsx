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
            href: '/real-estate',
            label: 'Real Estate',
            megaSections: [
                {
                    title: 'Residential Properties',
                    links: [
                        { href: '/real-estate/agent-commission', label: 'Agent Commission 100%' },
                        { href: '/real-estate/why-onedrive', label: 'Why OneDrive Realty?' },
                        { href: '/real-estate/halal-financing', label: 'Halal Financing' },
                    ],
                },
                {
                    title: 'Land & Agriculture',
                    links: [
                        { href: '/real-estate/build-dream-home', label: 'Build Your Dream Home' },
                        { href: '/real-estate/list-property', label: 'List Your Property for Sale' },
                        { href: '/real-estate/api-leads', label: 'API-LEADS-DFLX' },
                    ],
                },
                {
                    title: 'Investment',
                    links: [
                        { href: '/real-estate/exchange-1031', label: 'Exchange 1031' },
                        { href: '/real-estate/cap-ror-reo', label: 'CAP-ROR-REO' },
                        { href: '/real-estate/blogs', label: 'R/E BLOGS' },
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
                        { href: '/logistics', label: 'Freight Logistics' },
                        { href: '/logistics#supply-chain', label: 'Supply Chain' },
                        { href: '/logistics#warehouse', label: 'Warehouse Systems' },
                    ],
                },
                {
                    title: 'Fleet & Routing',
                    links: [
                        { href: '/logistics#transportation', label: 'Transportation' },
                        { href: '/logistics#fleet', label: 'Fleet Telematics' },
                        { href: '/logistics#route', label: 'Route Optimization' },
                    ],
                },
                {
                    title: 'Insights',
                    links: [
                        { href: '/logistics#analytics', label: 'Market Trends' },
                        { href: '/logistics#dashboards', label: 'Performance Dashboards' },
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
                        { href: '/logistics', label: 'Freight Logistics' },
                        { href: '/logistics#supply-chain', label: 'Supply Chain' },
                        { href: '/logistics#transportation', label: 'Transportation' },
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
    ];

    const navBgClass = 'bg-[#050b1d]/95 backdrop-blur-xl';
    const navBorderClass = 'border-white/5';
    const linkBaseClass =
        'text-sm font-medium text-white/90 hover:text-white transition-colors';
    const dropdownItemClass =
        'block px-4 py-2.5 rounded-md text-sm text-white hover:bg-white/5 transition-colors';
    const megaCardClass =
        'group block rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200';

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
        <nav className="bg-[#08122b] sticky top-0 z-50">
            {/* Top Bar */}
            <div className="hidden md:flex items-center justify-between py-1.5 px-6 lg:px-12 text-xs text-white/80">
                <Link
                    href="mailto:Contact@drivepixel.com"
                    className="hover:text-white transition-colors"
                >
                    Contact@drivepixel.com
                </Link>
                <span className="text-white/70">Enterprise technology for operations & growth</span>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center justify-between h-14 px-6 lg:px-12">
                {/* Logo - Text Only */}
                <Link href="/" className="flex-shrink-0">
                    <span className="text-white text-xl font-bold">DrivePixel</span>
                </Link>

                {/* Desktop Navigation - Center */}
                <div className="hidden md:flex items-center gap-6">
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
                <div className="flex items-center gap-4">
                    {/* Contact Us Button - Desktop */}
                    <div className="hidden md:block">
                        <Link href="/contact">
                            <Button className="bg-[#07090d] hover:bg-[#0f1218] text-white font-medium px-6 py-2 rounded-md transition-all duration-200">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-3">
                        <CartIcon />
                        <button
                            className="text-white p-2 rounded-md hover:bg-white/5"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="h-0.5 w-full bg-white" />

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#08122b] border-t border-white/10">
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
                                                    <p className="text-[11px] font-semibold uppercase text-white/60">
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
                            <Link href="/contact">
                                <Button className="w-full bg-[#07090d] hover:bg-[#0f1218] text-white font-medium px-4 py-2 rounded-md transition-all duration-200">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
