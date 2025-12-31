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
                <ShoppingCart className="h-7 w-7 text-white group-hover:text-[#c45c4b] transition-colors" strokeWidth={2} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#c45c4b] text-sm font-bold">
                    {count}
                </span>
            </div>
        </Link>
    );
}
