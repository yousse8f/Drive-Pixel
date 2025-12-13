import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate IT Solutions – Smart Tools for Property Professionals | Drive Pixel',
  description: 'Streamline your real estate business with our specialized IT solutions. CRM systems, property management automation, marketing tools, and custom software for real estate agencies.',
  keywords: 'real estate software, CRM for real estate, property management automation, real estate IT solutions, real estate technology',
  openGraph: {
    title: 'Real Estate IT Solutions – Smart Tools for Property Professionals',
    description: 'Streamline your real estate business with our specialized IT solutions. CRM systems, property management automation, marketing tools, and custom software.',
    type: 'website',
    url: 'https://drivepixel.com/services/real-estate',
    images: [
      {
        url: 'https://drivepixel.com/images/real-estate-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Estate IT Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate IT Solutions – Smart Tools for Property Professionals',
    description: 'Streamline your real estate business with our specialized IT solutions.',
    images: ['https://drivepixel.com/images/real-estate-og.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: 'https://drivepixel.com/services/real-estate'
  }
};
