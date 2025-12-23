'use client';

import React from 'react';

interface ServiceHeroProps {
  title: string;
  description: string;
}

export function ServiceHero({ title, description }: ServiceHeroProps) {
  return (
    <section className="relative py-32 text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url(/images/Services.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 to-primary-700/40"></div>
      </div>
      <div className="container-custom text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-primary-100 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
