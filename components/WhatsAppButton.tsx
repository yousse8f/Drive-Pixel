/**
 * Floating Call Button Component
 * Appears on all pages with a floating action button
 */

'use client';

import { Phone } from 'lucide-react';

export default function WhatsAppButton() {
    const phoneNumber = '201234567890'; // Replace with your phone number

    const handleCallClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-2">
            {/* Call Now Label */}
            <div className="bg-cta text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg whitespace-nowrap animate-pulse">
                Call Now
            </div>
            
            {/* Call Button */}
            <button
                onClick={handleCallClick}
                className="bg-cta hover:bg-cta-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                aria-label="Call us"
                title="Click to call"
            >
                <Phone className="h-6 w-6" />
            </button>
        </div>
    );
}
