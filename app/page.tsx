/**
 * Homepage
 * Main landing page with hero section and services overview
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Truck, Package, ChevronLeft, ChevronRight, Star, MessageCircle, Briefcase, Clock, Users, Award, Globe, Code, Megaphone, Cloud, Smartphone, Settings, Database, Server, Terminal, Lightbulb, Rocket, Cog, BarChart3, Calendar, Zap, ShoppingCart, BarChart2, Home, Compass, Layers, ShieldCheck, DollarSign, Landmark, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRef, useState, useEffect } from 'react';
import { publicApiClient } from '@/lib/public-api-client';

// Add CSS animations for page flip effect
const flipAnimationStyle = `
  @keyframes pageFlip {
    0% {
      transform: rotateY(0deg) rotateX(0deg);
      opacity: 1;
    }
    50% {
      transform: rotateY(90deg) rotateX(5deg);
      opacity: 0.5;
    }
    100% {
      transform: rotateY(0deg) rotateX(0deg);
      opacity: 1;
    }
  }

  @keyframes colorWave {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  .flip-text {
    animation: pageFlip 0.8s ease-in-out;
    perspective: 1000px;
  }

  .color-wave {
    background: linear-gradient(90deg, #ffffff, #5a6ea0, #3a4b73, #ffffff);
    background-size: 200% auto;
    animation: colorWave 1.5s ease-in-out;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .approach-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .approach-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 30px rgba(0,0,0,0.25);
  }
`;

export default function HomePage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentHeroText, setCurrentHeroText] = useState(0);
    const [heroTexts, setHeroTexts] = useState([
        {
            title: 'Build Future-Ready Platforms',
            subtitle: 'We create smart applications, AI-powered tools, and seamless cloud infrastructure that help brands grow faster.'
        },
    ]);
    const [testimonials, setTestimonials] = useState([
        {
            name: 'CEO, Digital Venture',
            email: 'digital-venture.com',
            rating: 5,
            text: '"DrivePixel delivered a flawless system that scaled our operations instantly. Their technical expertise and attention to detail made all the difference in our success."',
        },
    ]);
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        try {
            const [heroRes, testimonialsRes, servicesRes] = await Promise.all([
                publicApiClient.getHeroTexts() as Promise<{ success: boolean; data: any[] }>,
                publicApiClient.getTestimonials() as Promise<{ success: boolean; data: any[] }>,
                publicApiClient.getServices() as Promise<{ success: boolean; data: any[] }>,
            ]);

            if (heroRes.success && heroRes.data && heroRes.data.length > 0) {
                setHeroTexts(heroRes.data.map((ht: any) => ({
                    title: ht.title,
                    subtitle: ht.subtitle,
                })));
            }

            if (testimonialsRes.success && testimonialsRes.data && testimonialsRes.data.length > 0) {
                setTestimonials(testimonialsRes.data.map((t: any) => ({
                    name: t.name,
                    email: t.email,
                    rating: t.rating,
                    text: t.text,
                })));
            }

            if (servicesRes.success && servicesRes.data) {
                setServices(servicesRes.data as any[]);
            }
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Auto-rotate hero text every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroText((prev) => (prev + 1) % heroTexts.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroTexts.length]);

    return (
        <div className="min-h-screen flex flex-col" suppressHydrationWarning>
            <style>{flipAnimationStyle}</style>
            <Navbar />

            {/* Hero Section with Image Background */}
            <section
                className="relative text-white overflow-hidden pt-28 pb-24"
                style={{
                    backgroundImage: 'url(/images/transportvideo.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '80vh',
                }}
            >

                {/* Content */}
                <div className="container-custom relative z-10 flex justify-center items-center" style={{ minHeight: '60vh' }}>
                    <div className="max-w-4xl w-full text-center">
                        {/* Hero Text */}
                        <h1
                            key={`title-${currentHeroText}`}
                            className="flip-text text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white"
                            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                            {heroTexts[currentHeroText].title}
                        </h1>
                        <p
                            key={`subtitle-${currentHeroText}`}
                            className="flip-text text-lg md:text-xl lg:text-2xl mb-12 text-white/80 leading-relaxed max-w-3xl mx-auto"
                        >
                            {heroTexts[currentHeroText].subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                                    Get a Free Consultation
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl"
                                >
                                    Request a Project Quote
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Services Overview Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            KEY SERVICES OVERVIEW
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                We Build Future-Ready Digital Solutions
                            </h2>
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            <div className="col-span-4 text-center py-8 text-[#53223c] font-semibold">Loading services...</div>
                        ) : services.length > 0 ? (
                            services.map((service) => {
                                const iconUrl =
                                    service.iconUrl ||
                                    service.icon_url ||
                                    (typeof service.icon === 'string' && service.icon.startsWith('http') ? service.icon : null);
                                const iconLabel = !iconUrl && typeof service.icon === 'string' ? service.icon : null;
                                return (
                                    <div
                                        key={service.id}
                                        className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform relative"
                                    >
                                        <div className="flex flex-col items-center gap-4 flex-1">
                                            <div className="h-24 w-24 rounded-lg border border-royal-blue/30 bg-light-beige shadow-[0_6px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-4">
                                                {iconUrl ? (
                                                    <Image
                                                        src={iconUrl}
                                                        alt={`${service.title} icon`}
                                                        width={48}
                                                        height={48}
                                                        unoptimized
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : iconLabel ? (
                                                    <span className="text-3xl leading-none">{iconLabel}</span>
                                                ) : (
                                                    <span className="text-xl font-semibold tracking-wider">DP</span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-midnight-blue">{service.title}</h3>
                                            <p className="text-sm text-muted-indigo leading-relaxed">{service.description}</p>
                                        </div>
                                        
                                        <button className="w-full rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 flex items-center justify-center gap-2 shadow-md">
                                            <span>Learn More</span>
                                            <span aria-hidden>→</span>
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-4 text-center py-8 text-[#53223c] font-semibold">No services available</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Solutions Overview Section - Advisory / Build / Operate */}
            <section className="py-20 md:py-24 bg-midnight-blue">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16 text-center">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
                            OUR APPROACH
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Advisory • Build • Operate
                        </h2>
                        <p className="text-lg text-white/85 max-w-3xl mx-auto">
                            A complete end-to-end partnership from strategy to deployment to ongoing optimization.
                        </p>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[{
                            title: 'Advisory',
                            description: 'We analyze your business needs, assess opportunities, and design the right technical strategy to match your goals.',
                            icon: Compass
                        }, {
                            title: 'Build',
                            description: 'From concept to deployment—our team develops world-class applications, APIs, platforms, and integrated systems using cutting-edge technologies.',
                            icon: Layers
                        }, {
                            title: 'Operate',
                            description: 'We ensure your product stays fast, secure, monitored, and continuously optimized with long-term support and proactive improvements.',
                            icon: ShieldCheck
                        }].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="rounded-none border border-muted-indigo/30 bg-light-beige px-8 py-10 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] approach-card"
                                    style={{ animationDelay: `${idx * 0.6}s` }}
                                >
                                    <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-midnight-blue mb-4">{item.title}</h3>
                                    <p className="text-muted-indigo leading-relaxed text-sm">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Real Estate IT Solutions Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            SPECIALIZED SOLUTIONS
                        </div>
                        <div className="w-full py-5 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Real Estate IT Solutions – Streamline Your Property Business
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
                            <p className="text-sm text-white font-medium">
                                Specialized IT services designed for real estate agencies and property managers to manage listings, track leads, and grow their business efficiently.
                            </p>
                        </div>
                    </div>

                    {/* Features Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                            <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white text-3xl">
                                <DollarSign className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-midnight-blue">Agent Commission 100%</h3>
                            <p className="text-sm text-muted-indigo leading-relaxed">Maximize your earnings with our 100% commission brokerage model.</p>
                        </div>

                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                            <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white text-3xl">
                                <HelpCircle className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-midnight-blue">Why OneDrive Realty?</h3>
                            <p className="text-sm text-muted-indigo leading-relaxed">Discover our tech-enabled support system built to empower every agent.</p>
                        </div>

                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                            <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white text-3xl">
                                <Landmark className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-midnight-blue">Halal Financing</h3>
                            <p className="text-sm text-muted-indigo leading-relaxed">Connect with Sharia-compliant financing partners for ethical investments.</p>
                        </div>

                        <div className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                            <div className="h-20 w-20 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white text-3xl">
                                <BarChart3 className="h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-midnight-blue">CAP-ROR-REO</h3>
                            <p className="text-sm text-muted-indigo leading-relaxed">Analyze cap rates, returns, and REO deals with real-time investment data.</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-12">
                        <Link href="/real-estate">
                            <button className="inline-flex items-center justify-center rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 shadow-md">
                                Learn More About Real Estate Solutions
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Technologies & Tools Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            TECHNOLOGIES & TOOLS
                        </div>
                        <div className="w-full py-5 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                Modern, Reliable Technology Stacks
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-2">
                            <p className="text-sm text-white font-medium">
                                We work with modern, reliable technology stacks to deliver solutions that are stable, scalable, and future-proof.
                            </p>
                        </div>
                    </div>

                    {/* Tech Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {['React.js / Next.js', 'Node.js / Express', 'Python / Django / FastAPI', 'Flutter / React Native', 'AWS / Google Cloud / Azure', 'Docker / Kubernetes', 'CI/CD & DevOps Automation', 'PostgreSQL / MongoDB / Redis'].map((tech, index) => (
                            <div key={index} className="flex flex-col items-center gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-4 py-6 text-center shadow-[0_10px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                                <div className="h-16 w-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                    {index === 0 && <Code className="h-8 w-8" />}
                                    {index === 1 && <Server className="h-8 w-8" />}
                                    {index === 2 && <Terminal className="h-8 w-8" />}
                                    {index === 3 && <Smartphone className="h-8 w-8" />}
                                    {index === 4 && <Cloud className="h-8 w-8" />}
                                    {index === 5 && <Package className="h-8 w-8" />}
                                    {index === 6 && <Settings className="h-8 w-8" />}
                                    {index === 7 && <Database className="h-8 w-8" />}
                                </div>
                                <p className="font-semibold text-midnight-blue text-sm">{tech}</p>
                            </div>
                        ))}
                    </div>

                    {/* Service Links CTA */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/services/mobile-app-development" className="flex-1">
                            <button className="w-full inline-flex items-center justify-center rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 shadow-md">
                                Learn More About Mobile App Development
                            </button>
                        </Link>

                        <Link href="/services/software-solutions" className="flex-1">
                            <button className="w-full inline-flex items-center justify-center rounded-none bg-royal-blue hover:bg-royal-purple text-white font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 shadow-md">
                                Learn More About Software Solutions
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Portfolio Highlights Section */}
            <section className="py-20 md:py-24 bg-midnight-blue">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16 text-center">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            PORTFOLIO HIGHLIGHTS
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            Digital Solutions We've Built
                        </h2>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            A look at the digital experiences we’ve crafted for ambitious brands across SaaS, enterprise, and commerce.
                        </p>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[{
                            title: 'Smart Booking Platform',
                            meta: 'SaaS',
                            description: 'Modern booking engine with real-time availability, secure payments, and an optimized dashboard.',
                            icon: Calendar
                        }, {
                            title: 'AI Workflow Automation',
                            meta: 'Enterprise',
                            description: 'Automated data processing powered by machine learning, reducing manual tasks by 60%.',
                            icon: Zap
                        }, {
                            title: 'E-Commerce PWA',
                            meta: 'Retail',
                            description: 'Lightning-fast shopping experience with progressive web tech and high conversion performance.',
                            icon: ShoppingCart
                        }].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="flex flex-col gap-4 rounded-none border border-muted-indigo/30 bg-light-beige px-6 py-8 text-center shadow-[0_12px_0_0_rgba(45,58,107,0.3)] hover:-translate-y-2 transition-transform">
                                    <div className="mx-auto h-16 w-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-midnight-blue">{item.title}</h3>
                                    <p className="text-sm font-semibold text-muted-indigo">{item.meta}</p>
                                    <p className="text-sm text-muted-indigo leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* End-to-End Digital Solutions Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            END-TO-END DIGITAL SOLUTIONS
                        </div>
                        <div className="w-full py-5 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                End-to-End Digital Solutions
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
                            <p className="text-sm text-white font-medium">
                                From custom applications and mobile development to cloud and email solutions, we provide scalable, secure, and future-ready services.
                            </p>
                        </div>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Advisory & Strategy */}
                        <div className="flex flex-col gap-5 rounded-none border border-muted-indigo/30 bg-light-beige px-7 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                            <div className="w-16 h-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                <Lightbulb className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-midnight-blue mb-4">Advisory & Strategy</h3>
                                <ul className="space-y-3 text-muted-indigo text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Requirement Analysis & Technology Consultation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Solution Architecture & Scalability Planning</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>UI/UX Consulting for Web & Mobile Apps</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Security, Compliance & Performance Reviews</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Digital Transformation & Automation Roadmaps</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Build & Deploy */}
                        <div className="flex flex-col gap-5 rounded-none border border-muted-indigo/30 bg-light-beige px-7 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                            <div className="w-16 h-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                <Rocket className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-midnight-blue mb-4">Build & Deploy</h3>
                                <ul className="space-y-3 text-muted-indigo text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Custom Web & Enterprise Application Development</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Mobile App Development (iOS, Android, React Native, Flutter)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>API Development & Third-Party Integrations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Cloud-Native Applications (AWS, Azure, GCP)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Email & Communication Solutions (Google Workspace, Microsoft 365, WhatsApp API)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Operate & Enhance */}
                        <div className="flex flex-col gap-5 rounded-none border border-muted-indigo/30 bg-light-beige px-7 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                            <div className="w-16 h-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                <Cog className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-midnight-blue mb-4">Operate & Enhance</h3>
                                <ul className="space-y-3 text-muted-indigo text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Future Ready, Managed Services & Maintenance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Application Optimization & Version Upgrades</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Continuous Monitoring, Backup & Disaster Recovery</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>DevOps & CI/CD Automation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-sea-green font-bold mt-1">●</span>
                                        <span>Cost Optimization</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cloud Solutions Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="space-y-6 mb-16 text-center">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            END-TO-END MANAGED SOLUTIONS
                        </div>
                        <div className="w-full py-5">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Cloud Solutions That Scale With Your Business
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
                            <p className="text-sm text-white font-medium">
                                From planning to continuous optimization, we architect, migrate, monitor, and operate multi-cloud environments so your teams can innovate faster with less risk.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        {[{
                            label: 'Successful Projects',
                            value: '4000+',
                            icon: Briefcase
                        }, {
                            label: 'Years of Experience',
                            value: '11+',
                            icon: Clock
                        }, {
                            label: 'Clients Worldwide',
                            value: '500+',
                            icon: Users
                        }, {
                            label: 'Awards & References',
                            value: '80+',
                            icon: Award
                        }].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex flex-col items-center gap-3 rounded-lg border border-muted-indigo/30 bg-light-beige px-5 py-6 text-center shadow-[0_10px_0_0_rgba(45,58,107,0.3)]">
                                    <div className="h-16 w-16 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-black text-midnight-blue">{item.value}</div>
                                    <p className="text-sm text-muted-indigo font-medium">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 md:py-24 bg-midnight-blue">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="space-y-6 mb-16 text-center">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            CLIENT TESTIMONIALS
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                            What Our Clients Say
                        </h2>
                        <p className="text-lg text-white/80 max-w-3xl mx-auto">
                            Trusted by leading companies worldwide for delivering exceptional digital solutions.
                        </p>
                    </div>

                    {/* Testimonial Card */}
                    <div className="max-w-4xl mx-auto">
                        <div className="rounded-none border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)]">
                            <div className="text-center space-y-3">
                                {/* Stars */}
                                <div className="flex gap-2 justify-center">
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="h-6 w-6 fill-amber text-amber drop-shadow-lg" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-xl md:text-2xl text-midnight-blue leading-relaxed font-medium">
                                    {testimonials[currentTestimonial].text}
                                </p>

                                {/* Author Info */}
                                <div>
                                    <h3 className="text-2xl font-bold text-midnight-blue">{testimonials[currentTestimonial].name}</h3>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex gap-6 justify-center">
                                    <button
                                        onClick={prevTestimonial}
                                        className="inline-flex items-center justify-center rounded-none bg-royal-blue hover:bg-royal-purple text-white font-semibold px-5 py-3 border-[3px] border-light-beige shadow-md hover:-translate-y-1 transition-all duration-300"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={nextTestimonial}
                                        className="inline-flex items-center justify-center rounded-none bg-royal-blue hover:bg-royal-purple text-white font-semibold px-5 py-3 border-[3px] border-light-beige shadow-md hover:-translate-y-1 transition-all duration-300"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 md:py-24" style={{backgroundColor: '#2D3A6B'}}>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="space-y-6 mb-12">
                        <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue">
                            READY TO BUILD SOMETHING POWERFUL?
                        </div>
                        <div className="w-full py-5">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Ready to Build Something Powerful?
                            </h2>
                        </div>
                        <div className="w-full rounded-none bg-royal-purple border-2 border-light-beige shadow-[0_6px_0_rgba(255,255,255,0.35)] py-2 text-center px-4">
                            <p className="text-sm text-white font-medium">
                                Let's discuss your goals and create a technology roadmap that turns bold ideas into measurable outcomes.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact">
                            <button className="inline-flex items-center justify-center rounded-none bg-metallic-gold hover:bg-amber text-midnight-blue font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 shadow-md">
                                Get a Free Consultation
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="inline-flex items-center justify-center rounded-none bg-metallic-gold hover:bg-amber text-midnight-blue font-bold tracking-wide px-2 py-1 border-[3px] border-light-beige transition-all duration-300 text-lg transform hover:scale-105 shadow-md">
                                Request a Project Quote
                            </button>
                        </Link>
                    </div>
                    <p className="text-muted-indigo mt-10 text-sm font-medium">
                        Prefer speaking directly? Our specialists are available to map out your next big move.
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
