'use client';

import Link from 'next/link';
import { ArrowRight, Home, DollarSign, Network, Headphones, Award, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Build2SuitPage() {
  const benefits = [
    {
      icon: Home,
      title: 'Customization for Clients',
      description: 'You can assist clients who are looking to create their dream property from the ground up. This increases your value as an agent, and enhances client satisfaction.'
    },
    {
      icon: DollarSign,
      title: 'Higher Commission Potential',
      description: 'Since custom builds generally have a higher price point, your potential earnings from these deals are significant. Coupled with our 100% commission plan, agents have the opportunity to maximize their income.'
    },
    {
      icon: Network,
      title: 'Streamlined Process',
      description: 'We have partnerships with architects, builders, and legal professionals to make the Build 2 Suit process as smooth as possible for both the agent and client. You\'ll have access to a network of professionals to guide your clients through the entire building process.'
    },
    {
      icon: Headphones,
      title: 'Full Support and Resources',
      description: 'As with all our services, agents participating in the Build 2 Suit program benefit from our transaction management system, in-house marketing team, and design department to promote custom builds effectively.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative py-32 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url(/images/Real%20Estate.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-[#1a1f3a]/70"></div>
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">BUILD 2 SUIT</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Custom-built properties tailored to your exact specifications
          </p>
        </div>
      </section>

      <section className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              OVERVIEW
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Specialized Services for Custom-Built Properties
              </h2>
            </div>
          </div>

          <div className="space-y-6 mb-16">
            <p className="text-lg text-muted-indigo leading-relaxed text-center max-w-4xl mx-auto">
              At One Drive Realty, we not only offer a competitive 100% commission structure for agents, but we also provide specialized services through our Build 2 Suit program, tailored for agents working with clients interested in custom-built properties.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHAT IS THE BUILD 2 SUIT PROGRAM?
            </div>
          </div>

          <div className="rounded-lg border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] mb-16">
            <div className="space-y-4">
              <p className="text-lg text-muted-indigo leading-relaxed text-center">
                The Build 2 Suit program allows clients to purchase land and construct a property that meets their exact specifications, whether it's residential, commercial, or multi-use. As an agent with One Drive Realty, you can offer this premium service to your clients while benefiting from our 100% commission plan.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              HOW BUILD 2 SUIT BENEFITS AGENTS
            </div>
            <div className="w-full rounded-none bg-royal-purple border border-muted-indigo shadow-[0_6px_0_rgba(88,70,150,0.35)] py-3 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Maximize Your Value and Income
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="flex flex-col gap-4 rounded-lg border border-muted-indigo/30 bg-light-beige px-6 py-8 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] min-h-[200px]">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-midnight-blue mb-2 leading-tight">{benefit.title}</h3>
                      <p className="text-sm text-muted-indigo leading-relaxed break-words">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mb-12">
            <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.55)] py-2 text-center uppercase text-[11px] font-semibold tracking-[0.35em] text-midnight-blue">
              WHY COMBINE BUILD 2 SUIT WITH 100% COMMISSION?
            </div>
          </div>

          <div className="rounded-lg border border-muted-indigo/30 bg-light-beige px-8 py-10 shadow-[0_12px_0_0_rgba(45,58,107,0.3)] mb-16">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 flex-shrink-0 rounded-full bg-sea-green shadow-[inset_0_-6px_0_rgba(0,0,0,0.18)] flex items-center justify-center text-white">
                <Award className="h-12 w-12" />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-midnight-blue leading-tight">Position Yourself as a Market Leader</h3>
                <p className="text-lg text-muted-indigo leading-relaxed">
                  By offering a unique service like Build 2 Suit alongside our 100% commission plan, you position yourself as a leader in the real estate market. You not only keep all your commission after a flat fee, but also deliver high-value projects to clients looking for custom solutions, making you the go-to agent in the field of new construction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-midnight-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-full rounded-none bg-pale-goldenrod border border-metallic-gold shadow-[inset_0_4px_0_rgba(255,255,255,0.4)] py-2 uppercase text-[11px] font-extrabold tracking-[0.35em] text-midnight-blue bg-opacity-90">
            CONTACT US
          </div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black">Enhance Your Real Estate Career</h2>
         
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="mailto:info@onedriverealty.com">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                <Mail className="mr-2 h-5 w-5" />
                Email Us Now
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-metallic-gold hover:bg-amber text-midnight-blue font-bold px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105 shadow-xl">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
