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

    const realEstateSections: DropdownItem[] = [
        {
            href: '/real-estate/agent-commission',
            label: 'Agent 100% Commission',
            dropdown: [
                { href: '/real-estate/agent-commission/full-sponsorship', label: 'Full Sponsorship' },
                { href: '/real-estate/agent-commission/referrals-fees', label: 'Referrals Fees' },
                { href: '/real-estate/agent-commission/park-your-license', label: 'Park Your License' },
                { href: '/real-estate/agent-commission/marketing-fees', label: 'Marketing Fees' },
                { href: '/real-estate/agent-commission/ce-training', label: 'C/E Training' },
                { href: '/real-estate/agent-commission/broker-mentors', label: 'Broker Mentors' },
                { href: '/real-estate/agent-commission/build-2-suite', label: 'Build 2 Suite' },
                { href: '/real-estate/agent-commission/list-2-last-agents', label: 'List 2 Last Agents' },
                { href: '/real-estate/agent-commission/branch-offices', label: 'Branch Offices' },
                { href: '/real-estate/agent-commission/own-real-estate-website', label: 'Own R/E Website' },
            ],
        },
        {
            href: '/real-estate/why-onedrive',
            label: 'Why OneDrive Realty',
            dropdown: [
                { href: '/real-estate/why-onedrive/plan-1', label: 'Plan 1' },
                { href: '/real-estate/why-onedrive/plan-2', label: 'Plan 2' },
                { href: '/real-estate/why-onedrive/cyps-patent', label: 'CYPS Patent' },
                { href: '/real-estate/why-onedrive/membership', label: 'Membership' },
                { href: '/real-estate/why-onedrive/partners', label: 'Partners' },
                { href: '/real-estate/why-onedrive/our-listings', label: 'Our Listings' },
                { href: '/real-estate/why-onedrive/search-your-listing', label: 'Search Your Listing' },
                { href: '/real-estate/why-onedrive/nwmls-access', label: 'NWMLS Access' },
                { href: '/real-estate/why-onedrive/re-contract-forms', label: 'RE Contract Forms' },
                { href: '/real-estate/why-onedrive/list-your-property', label: 'List Your Property' },
            ],
        },
        {
            href: '/real-estate/halal-financing',
            label: 'Halal Funding',
            dropdown: [
                { href: '/real-estate/halal-financing/residential', label: 'Residential' },
                { href: '/real-estate/halal-financing/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/halal-financing/commercial', label: 'Commercial' },
                { href: '/real-estate/halal-financing/vacant-land', label: 'Vacant Land' },
                { href: '/real-estate/halal-financing/dairy-farming', label: 'Dairy Farming' },
                { href: '/real-estate/halal-financing/agriculture-land', label: 'Agriculture Land' },
                { href: '/real-estate/halal-financing/development', label: 'Development' },
                { href: '/real-estate/halal-financing/business', label: 'Business' },
                { href: '/real-estate/halal-financing/unit-share-cert', label: 'Unit Share Cert' },
                { href: '/real-estate/halal-financing/invest-with-us', label: 'Invest With Us' },
            ],
        },
        {
            href: '/real-estate/build-dream-home',
            label: 'Build 2 Suit',
            dropdown: [
                { href: '/real-estate/build-dream-home/envelope-structures', label: 'Envelope Structures' },
                { href: '/real-estate/build-dream-home/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/build-dream-home/residential', label: 'Residential' },
                { href: '/real-estate/build-dream-home/commercial', label: 'Commercial' },
                { href: '/real-estate/build-dream-home/dairy-farming', label: 'Dairy Farming' },
                { href: '/real-estate/build-dream-home/log-homes-kit', label: 'Log Homes Kit' },
                { href: '/real-estate/build-dream-home/cyps-list-2-last', label: 'CYPS List 2 Last' },
                { href: '/real-estate/build-dream-home/development', label: 'Development' },
                { href: '/real-estate/build-dream-home/vacant-land-api', label: 'Vacant Land API' },
                { href: '/real-estate/build-dream-home/sms-mms-blast', label: 'SMS-MMS BLAST' },
            ],
        },
        {
            href: '/real-estate/list-property',
            label: 'List Your Property',
            dropdown: [
                { href: '/real-estate/list-property/residential', label: 'Residential' },
                { href: '/real-estate/list-property/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/list-property/commercial', label: 'Commercial' },
                { href: '/real-estate/list-property/vacant-lots', label: 'Vacant Lots' },
                { href: '/real-estate/list-property/vacant-acreage', label: 'Vacant Acreage' },
                { href: '/real-estate/list-property/business', label: 'Business' },
                { href: '/real-estate/list-property/sms-mms-blast', label: 'SMS-MMS BLAST' },
                { href: '/real-estate/list-property/1-drive-listings', label: '1 Drive Listings' },
                { href: '/real-estate/list-property/cyps-marketing', label: 'CYPS Marketing' },
                { href: '/real-estate/list-property/property-trade', label: 'Property Trade' },
            ],
        },
        {
            href: '/real-estate/api-leads',
            label: 'API-LEADS-DFXL',
            dropdown: [
                { href: '/real-estate/api-leads/property-owners', label: 'Property Owners' },
                { href: '/real-estate/api-leads/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/api-leads/residential', label: 'Residential' },
                { href: '/real-estate/api-leads/commercial', label: 'Commercial' },
                { href: '/real-estate/api-leads/business', label: 'Business' },
                { href: '/real-estate/api-leads/vacant-lots', label: 'Vacant Lots' },
                { href: '/real-estate/api-leads/vacant-acreage', label: 'Vacant Acreage' },
                { href: '/real-estate/api-leads/cyps-patent', label: 'CYPS Patent' },
                { href: '/real-estate/api-leads/short-code-data', label: 'Short-Code Data' },
                { href: '/real-estate/api-leads/sms-mms-blast', label: 'SMS-MMS BLAST' },
            ],
        },
        {
            href: '/real-estate/exchange-1031',
            label: '1031 Exchange',
            dropdown: [
                { href: '/real-estate/exchange-1031/residential', label: 'Residential' },
                { href: '/real-estate/exchange-1031/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/exchange-1031/commercial', label: 'Commercial' },
                { href: '/real-estate/exchange-1031/vacant-land', label: 'Vacant Land' },
                { href: '/real-estate/exchange-1031/farming', label: 'Farming' },
                { href: '/real-estate/exchange-1031/vested-equity', label: 'Vested Equity' },
                { href: '/real-estate/exchange-1031/reit-trade', label: 'REIT-TRADE' },
                { href: '/real-estate/exchange-1031/mraeit-trade', label: 'MRAEIT-TRADE' },
                { href: '/real-estate/exchange-1031/usa-escrow-title', label: 'USA Escrow Title' },
                { href: '/real-estate/exchange-1031/world-escrow-title', label: 'World Escrow Title' },
            ],
        },
        {
            href: '/real-estate/blogs',
            label: 'R/E BLOGS',
            dropdown: [
                { href: '/real-estate/blogs/emerging-markets', label: 'Emerging Markets' },
                { href: '/real-estate/blogs/global', label: 'Global' },
                { href: '/real-estate/blogs/national', label: 'National' },
                { href: '/real-estate/blogs/regional', label: 'Regional' },
                { href: '/real-estate/blogs/residential', label: 'Residential' },
                { href: '/real-estate/blogs/commercial', label: 'Commercial' },
                { href: '/real-estate/blogs/financing', label: 'Financing' },
                { href: '/real-estate/blogs/investment', label: 'Investment' },
                { href: '/real-estate/blogs/blogger-biography', label: 'Blogger Biography' },
                { href: '/real-estate/blogs/blogger-police-report', label: 'Blogger Police Report' },
            ],
        },
        {
            href: '/real-estate/cap-ror-reo',
            label: 'CAP-ROR-REO',
            dropdown: [
                { href: '/real-estate/cap-ror-reo/capitalization-rate', label: 'Capitalization Rate' },
                { href: '/real-estate/cap-ror-reo/rate-of-return-rate', label: 'Rate Of Return Rate' },
                { href: '/real-estate/cap-ror-reo/real-estate-owned', label: 'Real Estate Owned' },
                { href: '/real-estate/cap-ror-reo/residential', label: 'Residential' },
                { href: '/real-estate/cap-ror-reo/multi-family', label: 'Multi-Family' },
                { href: '/real-estate/cap-ror-reo/commercial', label: 'Commercial' },
                { href: '/real-estate/cap-ror-reo/vacant-land', label: 'Vacant Land' },
                { href: '/real-estate/cap-ror-reo/crop-farming', label: 'Crop Farming' },
                { href: '/real-estate/cap-ror-reo/livestock-farm', label: 'Livestock Farm' },
                { href: '/real-estate/cap-ror-reo/build-2-suit-profit', label: 'Build 2 Suit Profit' },
            ],
        },
    ];

    const realEstateMegaSections: MegaSection[] = Array.from(
        { length: Math.ceil(realEstateSections.length / 3) },
        (_, index) => ({
            title: '',
            links: realEstateSections.slice(index * 3, index * 3 + 3),
        })
    );

    const navLinks: NavLink[] = [
        {
            href: '/real-estate',
            label: 'Real Estate',
            megaSections: realEstateMegaSections,
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
