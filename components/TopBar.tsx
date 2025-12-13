/**
 * TopBar Component
 * Contact information bar displayed above the navbar
 */

'use client';

import { Mail, Phone } from 'lucide-react';

export default function TopBar() {
    return (
        <div className="hidden md:block bg-gradient-to-r from-primary-900 to-gray-600 border-b border-primary-300 py-2">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    {/* Left Section - Contact Info */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <a 
                            href="mailto:Info@OneDriveRealty.com" 
                            className="flex items-center gap-2 text-white hover:text-primary-100 transition-colors"
                        >
                            <Mail className="h-4 w-4 text-primary-300" />
                            <span className="text-primary-300 font-semibold">Email:</span>
                            <span className="hover:underline">Info@OneDriveRealty.com</span>
                        </a>
                        <a 
                            href="mailto:Contact@drivepixel.com" 
                            className="flex items-center gap-2 text-white hover:text-primary-100 transition-colors"
                        >
                            <Mail className="h-4 w-4 text-highlight" />
                            <span className="text-highlight font-semibold">Email:</span>
                            <span className="hover:underline">Contact@drivepixel.com</span>
                        </a>
                    </div>

                    {/* Right Section - Support Link */}
                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:Info@OneDriveRealty.com"
                            className="flex items-center gap-2 text-white hover:text-primary-100 transition-colors"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Support</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
