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
        <Link href="/cart" className="relative group">
            <div className="relative p-2 rounded-lg hover:bg-white/5 transition-all duration-200">
                <ShoppingCart className="h-7 w-7 text-white group-hover:text-metallic-gold transition-colors" strokeWidth={2} />
                <span className="absolute -top-1 -right-1 bg-metallic-gold text-midnight-blue text-[10px] font-bold rounded-md h-4 min-w-[16px] px-0.5 flex items-center justify-center border border-[#08122b]">
                    {count}
                </span>
            </div>
        </Link>
    );
}
