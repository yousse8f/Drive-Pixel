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
    dropdown?: DropdownItem[];
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
    const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const nestedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navLinks: NavLink[] = [
        {
            href: '/real-estate',
            label: 'Real Estate',
            megaSections: [
                {
                    title: '',
                    links: [
                        { 
                            href: '/real-estate/agent-commission', 
                            label: 'Agent 100% Commission',
                            dropdown: [
                                { href: '/real-estate/full-sponsorship', label: 'FULL SPONSORSHIP' },
                                { href: '/real-estate/referral-fees', label: 'REFERRALS FEES' },
                                { href: '/real-estate/park-license', label: 'PARK YOUR LICENSE' },
                                { href: '/real-estate/marketing-fees', label: 'MARKETING FEES' },
                                { href: '/real-estate/ce-training', label: 'C/E TRAINING' },
                                { href: '/real-estate/broker-mentors', label: 'BROKER MENTORS' },
                                { href: '/real-estate/list-2-last-agents', label: 'LIST 2 LAST AGENTS' },
                                { href: '/real-estate/branch-offices', label: 'BRANCH OFFICES' },
                                { href: '/real-estate/own-website', label: 'OWN R/E WEBSITE' },
                                { href: '/real-estate/plan-01', label: 'PLAN 01' },
                                { href: '/real-estate/plan-02', label: 'PLAN 02' },
                                { href: '/real-estate/membership', label: 'MEMBERSHIP' },
                                { href: '/real-estate/partners', label: 'PARTNERS' },
                                { href: '/real-estate/board-members', label: 'BOARD MEMBERS' },
                                { href: '/real-estate/agent-contract', label: 'AGENT CONTRACT' }
                            ]
                        },
                        { 
                            href: '/real-estate/why-onedrive', 
                            label: 'Why OneDrive Realty',
                            dropdown: [
                                { href: '/real-estate/cyps-patent', label: 'CYPS PATENT' },
                                { href: '/real-estate/cyps-list-2-last', label: 'CYPS LIST 2 LAST' },
                                { href: '/real-estate/cyps-marketing', label: 'CYPS MARKETING' },
                                { href: '/real-estate/short-code-data', label: 'SHORT CODE DATA' },
                                { href: '/real-estate/license-regulators', label: 'LICENSE REGULATORS' },
                                { href: '/real-estate/obtain-real-estate', label: 'OBTAIN REAL ESTATE' },
                                { href: '/real-estate/connect-with-us', label: 'CONNECT WITH US' },
                                { href: '/real-estate/we-support-gf', label: 'WE SUPPORT GF' }
                            ]
                        },
                        { 
                            href: '/real-estate/halal-financing', 
                            label: 'Halal Funding',
                            dropdown: [
                                { href: '/real-estate/financing', label: 'FINANCING' },
                                { href: '/real-estate/investment', label: 'INVESTMENT' },
                                { href: '/real-estate/unit-share-cert', label: 'UNIT SHARE CERT' },
                                { href: '/real-estate/invest-with-us', label: 'INVEST WITH US' },
                                { href: '/real-estate/usa-escrow-title', label: 'USA ESCROW TITLE' },
                                { href: '/real-estate/world-escrow-title', label: 'WORLD ESCROW TITLE' }
                            ]
                        },
                    ],
                },
                {
                    title: '',
                    links: [
                        { 
                            href: '/real-estate/build-dream-home', 
                            label: 'BUILT 2 SUIT',
                            dropdown: [
                                { href: '/real-estate/envelope-structures', label: 'ENVELOPE STRUCTURES' },
                                { href: '/real-estate/log-home-kits', label: 'LOG HOME KITS' },
                                { href: '/real-estate/development', label: 'DEVELOPMENT' },
                                { href: '/real-estate/build-2-suit-profit', label: 'BUILD 2 SUIT PROFIT' }
                            ]
                        },
                        { 
                            href: '/real-estate/list-property', 
                            label: 'List Your Property',
                            dropdown: [
                                { href: '/real-estate/property-owners', label: 'PROPERTY OWNERS' },
                                { href: '/real-estate/our-listings', label: 'OUR LISTINGS' },
                                { href: '/real-estate/search-four-listing', label: 'SEARCH FOUR LISTING' },
                                { href: '/real-estate/nwmls-access', label: 'NWMLS ACCESS' },
                                { href: '/real-estate/re-contracts-form', label: 'R/E CONTRACTS FORM' },
                                { href: '/real-estate/property-trade', label: 'PROPERTY TRADE' },
                                { href: '/real-estate/1drive-listings', label: '1DRIVE LISTINGS' },
                                { href: '/real-estate/residential', label: 'RESIDENTIAL' },
                                { href: '/real-estate/multifamily', label: 'MULTIFAMILY' },
                                { href: '/real-estate/commercial', label: 'COMMERCIAL' },
                                { href: '/real-estate/business', label: 'BUSINESS' },
                                { href: '/real-estate/vacant-lots', label: 'VACANT LOTS' },
                                { href: '/real-estate/vacant-acreage', label: 'VACANT ACREAGE' }
                            ]
                        },
                        { 
                            href: '/real-estate/api-leads', 
                            label: 'API-LEADS-DFLX',
                            dropdown: [
                                { href: '/real-estate/vacant-land-api', label: 'VACANT LAND API' },
                                { href: '/real-estate/sms-mms-blast', label: 'SMS MMS BLAST' },
                                { href: '/real-estate/cyps-patent-api', label: 'CYPS PATENT' },
                                { href: '/real-estate/short-code-data-api', label: 'SHORT CODE DATA' }
                            ]
                        },
                    ],
                },
                {
                    title: '',
                    links: [
                        { 
                            href: '/real-estate/exchange-1031', 
                            label: '1031 Exchange',
                            dropdown: [
                                { href: '/real-estate/1031-residential', label: 'RESIDENTIAL' },
                                { href: '/real-estate/1031-multifamily', label: 'MULTIFAMILY' },
                                { href: '/real-estate/1031-commercial', label: 'COMMERCIAL' },
                                { href: '/real-estate/1031-vacant-land', label: 'VACANT LAND' },
                                { href: '/real-estate/1031-farming', label: 'FARMING' },
                                { href: '/real-estate/vested-equity', label: 'VESTED EQUITY' },
                                { href: '/real-estate/reit-trade', label: 'REIT-TRADE' },
                                { href: '/real-estate/mreit-trade', label: 'MREIT-TRADE' }
                            ]
                        },
                        { 
                            href: '/real-estate/cap-ror-reo', 
                            label: 'CAP-ROR-REO',
                            dropdown: [
                                { href: '/real-estate/capitalization-rate', label: 'CAPITALIZATION RATE' },
                                { href: '/real-estate/rate-of-return', label: 'RATE OF RETURN RATE' },
                                { href: '/real-estate/real-estate-owned', label: 'REAL ESTATE OWNED' },
                                { href: '/real-estate/cap-residential', label: 'RESIDENTIAL' },
                                { href: '/real-estate/cap-multifamily', label: 'MULTIFAMILY' },
                                { href: '/real-estate/cap-commercial', label: 'COMMERCIAL' },
                                { href: '/real-estate/cap-vacant-land', label: 'VACANT LAND' },
                                { href: '/real-estate/crop-farming', label: 'CROP FARMING' },
                                { href: '/real-estate/livestock-farm', label: 'LIVESTOCK FARM' }
                            ]
                        },
                        { 
                            href: '/real-estate/blogs', 
                            label: 'R/E BLOGS',
                            dropdown: [
                                { href: '/real-estate/emerging-markets', label: 'EMERGING MARKETS' },
                                { href: '/real-estate/global', label: 'GLOBAL' },
                                { href: '/real-estate/national', label: 'NATIONAL' },
                                { href: '/real-estate/regional', label: 'REGIONAL' },
                                { href: '/real-estate/blog-residential', label: 'RESIDENTIAL' },
                                { href: '/real-estate/blog-commercial', label: 'COMMERCIAL' },
                                { href: '/real-estate/blog-financing', label: 'FINANCING' },
                                { href: '/real-estate/blog-investment', label: 'INVESTMENT' },
                                { href: '/real-estate/blogger-biography', label: 'BLOGGER BIOGRAPHY' },
                                { href: '/real-estate/blogger-police-report', label: 'BLOGGER POLICE REPORT' }
                            ]
                        },
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

    const navBgClass = 'bg-midnight-blue/95 backdrop-blur-xl';
    const navBorderClass = 'border-muted-indigo/30';
    const linkBaseClass =
        'text-sm font-medium text-white/90 hover:text-metallic-gold transition-colors';
    const dropdownItemClass =
        'block px-4 py-2.5 rounded-md text-sm text-white hover:bg-royal-blue/20 transition-colors';
    const megaCardClass =
        'group block rounded-lg border border-muted-indigo/30 bg-royal-blue/10 px-4 py-3 text-sm text-white hover:bg-royal-blue/20 hover:border-metallic-gold/40 transition-all duration-200';

    const handleMouseEnter = (label: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleNestedMouseEnter = (label: string) => {
        if (nestedTimeoutRef.current) {
            clearTimeout(nestedTimeoutRef.current);
            nestedTimeoutRef.current = null;
        }
        setOpenNestedDropdown(label);
    };

    const handleMouseLeave = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setOpenNestedDropdown(null);
        }, 500);
    };

    const handleNestedMouseLeave = () => {
        if (nestedTimeoutRef.current) {
            clearTimeout(nestedTimeoutRef.current);
        }
        nestedTimeoutRef.current = setTimeout(() => {
            setOpenNestedDropdown(null);
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
            if (nestedTimeoutRef.current) {
                clearTimeout(nestedTimeoutRef.current);
            }
        };
    }, []);

    return (
        <nav className="bg-midnight-blue sticky top-0 z-50 shadow-lg">
            {/* Top Bar */}
            <div className="hidden md:flex items-center justify-center py-1.5 px-6 lg:px-12 text-xs bg-royal-blue/30">
                <span className="text-pale-goldenrod font-medium">Global Technology for Operations & Growth</span>
            </div>

            {/* Main Navigation */}
            <div className="flex items-center justify-between h-14 px-6 lg:px-12">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 flex items-center gap-3">
                    <Image 
                        src="/images/logo-eecf49f1.png" 
                        alt="DrivePixel Logo" 
                        width={150} 
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                    <span className="text-white text-xl font-bold hidden sm:block">DrivePixel</span>
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
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-screen max-w-4xl bg-midnight-blue/95 border border-muted-indigo/40 rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] z-50 opacity-100 translate-y-0 transition duration-200 ease-out backdrop-blur">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                                                {link.megaSections?.map((section) => (
                                                    <div key={section.title} className="space-y-3">
                                                        <div className="grid gap-2.5">
                                                            {section.links.map((item) => {
                                                                    const hasNestedDropdown = item.dropdown && item.dropdown.length > 0;
                                                                    return (
                                                                        <div key={item.label} className="relative group">
                                                                            <Link 
                                                                                href={item.href} 
                                                                                className={megaCardClass}
                                                                                onMouseEnter={() => hasNestedDropdown && handleNestedMouseEnter(item.label)}
                                                                            >
                                                                                <span className="block font-medium text-white/90 group-hover:text-white">
                                                                                    {item.label}
                                                                                </span>
                                                                                {hasNestedDropdown && (
                                                                                    <ChevronDown className="h-3 w-3 text-white/60 inline-block ml-1" />
                                                                                )}
                                                                            </Link>
                                                                            
                                                                            {hasNestedDropdown && openNestedDropdown === item.label && (
                                                                                <div 
                                                                                    className="absolute left-full top-0 ml-2 w-80 bg-midnight-blue/95 border border-muted-indigo/40 rounded-lg shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] z-[100] opacity-100 translate-y-0 transition duration-200 ease-out backdrop-blur"
                                                                                    onMouseEnter={() => handleNestedMouseEnter(item.label)}
                                                                                    onMouseLeave={handleNestedMouseLeave}
                                                                                    style={{ 
                                                                                        maxHeight: 'calc(100vh - 200px)',
                                                                                        overflowY: 'auto',
                                                                                        bottom: 'auto',
                                                                                        top: '0'
                                                                                    }}
                                                                                >
                                                                                    <div className="p-4 space-y-1">
                                                                                        {item.dropdown?.map((nestedItem) => (
                                                                                            <Link
                                                                                                key={nestedItem.label}
                                                                                                href={nestedItem.href}
                                                                                                className="block px-3 py-2 rounded-md text-sm text-white hover:bg-royal-blue/30 hover:text-metallic-gold transition-colors whitespace-nowrap"
                                                                                            >
                                                                                                {nestedItem.label}
                                                                                            </Link>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {hasDropdown && openDropdown === link.label && (
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[420px] bg-midnight-blue/95 border border-muted-indigo/40 rounded-xl shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] z-50 opacity-100 translate-y-0 transition duration-200 ease-out backdrop-blur">
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
                    {/* Cart Icon - Desktop */}
                    <div className="hidden md:block">
                        <CartIcon />
                    </div>
                    
                    {/* Contact Us Button - Desktop */}
                    <div className="hidden md:block">
                        <Link href="/contact">
                            <Button className="bg-metallic-gold hover:bg-amber text-midnight-blue font-semibold px-6 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg">
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

            <div className="h-0.5 w-full bg-gradient-to-r from-metallic-gold via-amber to-metallic-gold" />

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-midnight-blue border-t border-muted-indigo/30">
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
                                                    <div className="space-y-1">
                                                        {section.links.map((item) => {
                                                                    const hasNestedDropdown = item.dropdown && item.dropdown.length > 0;
                                                                    const isNestedOpen = openDropdown === item.label;
                                                                    return (
                                                                        <div key={item.label} className="space-y-1">
                                                                            <Link
                                                                                href={item.href}
                                                                                className="block py-1.5 text-white/80 hover:text-white text-sm flex items-center justify-between"
                                                                                onClick={(e) => {
                                                                                    if (hasNestedDropdown) {
                                                                                        e.preventDefault();
                                                                                        setOpenDropdown(isNestedOpen ? null : item.label);
                                                                                    } else {
                                                                                        setMobileMenuOpen(false);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {item.label}
                                                                                {hasNestedDropdown && (
                                                                                    <ChevronDown
                                                                                        className={`h-3 w-3 transition-transform ${isNestedOpen ? 'rotate-180' : ''}`}
                                                                                    />
                                                                                )}
                                                                            </Link>
                                                                            
                                                                            {hasNestedDropdown && isNestedOpen && (
                                                                                <div className="pl-4 space-y-1">
                                                                                    {item.dropdown?.map((nestedItem) => (
                                                                                        <Link
                                                                                            key={nestedItem.label}
                                                                                            href={nestedItem.href}
                                                                                            className="block py-1 text-white/70 hover:text-white text-sm"
                                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                                        >
                                                                                            {nestedItem.label}
                                                                                        </Link>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
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
                                <Button className="w-full bg-metallic-gold hover:bg-amber text-midnight-blue font-semibold px-4 py-2 rounded-md transition-all duration-200">
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
