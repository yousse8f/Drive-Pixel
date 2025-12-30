"use client";

import { useCart } from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartIcon() {
    const { count } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Link href="/cart" className="relative group p-2">
            <svg 
                width="36" 
                height="36" 
                viewBox="0 0 28 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:scale-110"
            >
                <defs>
                    <linearGradient id="cartBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10B981"/>
                        <stop offset="100%" stopColor="#059669"/>
                    </linearGradient>
                    <filter id="cartShadow">
                        <feDropShadow dx="1" dy="2" stdDeviation="1" floodColor="#059669" floodOpacity="0.5"/>
                    </filter>
                </defs>
                
                {/* هيكل العربة الخضراء الخلفية (الظل) */}
                <path 
                    d="M4 4H7L9 16H21L23 7H8"
                    stroke="#047857"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="#047857"
                    transform="translate(3, 2)"
                />
                
                {/* هيكل العربة الأبيض المصمت */}
                <path 
                    d="M4 4H7L9 16H21L23 7H8"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="white"
                />
                
                                
                {/* الرقم الأحمر في وسط العربة */}
                <text x="14" y="11" textAnchor="middle" fill="#DC2626" fontSize="8" fontWeight="bold">{count}</text>
                
                {/* الشريط الأخضر الخلفي (الظل) */}
                <path 
                    d="M8 17H22"
                    stroke="#047857"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform="translate(3, 2)"
                />
                
                {/* الشريط الأبيض السفلي */}
                <path 
                    d="M8 17H22"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                
                {/* العجلة اليسرى الخضراء (الظل) */}
                <rect x="8" y="19" width="4" height="4" rx="2" fill="#047857" transform="translate(3, 2)"/>
                
                {/* العجلة اليسرى البيضاء */}
                <rect x="8" y="19" width="4" height="4" rx="2" fill="white"/>
                
                {/* العجلة اليمنى الخضراء (الظل) */}
                <rect x="16" y="19" width="4" height="4" rx="2" fill="#047857" transform="translate(3, 2)"/>
                
                {/* العجلة اليمنى البيضاء */}
                <rect x="16" y="19" width="4" height="4" rx="2" fill="white"/>

                {/* اللوحة الخضراء - الطبقة السفلية (الظل) */}
                <rect x="8" y="23" width="14" height="2" rx="1" fill="#047857" transform="translate(3, 2)"/>
                
                {/* اللوحة الخضراء - الطبقة الوسطى */}
                <rect x="8" y="22.5" width="14" height="2" rx="1" fill="#059669" transform="translate(2, 1)"/>
                
                {/* اللوحة الخضراء - الطبقة العلوية */}
                <rect x="8" y="22" width="14" height="2" rx="1" fill="#10B981"/>
            </svg>
                    </Link>
    );
}
