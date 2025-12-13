"use client";

import { useCart } from "@/lib/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingCartButton() {
    const { count } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Link
            href="/cart"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 bg-cta hover:bg-cta-600 text-white pl-4 pr-5 py-3 rounded-l-full shadow-2xl transition-all duration-300 hover:pr-6 hover:shadow-cta/50 group"
            aria-label="View Cart"
        >
            <div className="relative">
                <ShoppingCart className="h-6 w-6 transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] opacity-90 uppercase tracking-wider font-semibold">Cart</span>
                <span className="text-lg font-bold">{count}</span>
            </div>
        </Link>
    );
}
