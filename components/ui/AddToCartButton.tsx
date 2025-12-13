"use client";

import { useCart } from "@/lib/hooks/useCart";
import { useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";

interface AddToCartProps {
    productId: string;
    productName?: string; // Optional for analytics/toast
    className?: string;
    variant?: "primary" | "secondary" | "outline";
}

export default function AddToCartButton({ productId, className = "", variant = "primary" }: AddToCartProps) {
    const { addItem } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAdding(true);
        try {
            await addItem(productId, 1);
            // Optionally dispatch a toast here
        } catch (error) {
            console.error("Failed to add to cart", error);
        } finally {
            setIsAdding(false);
        }
    };

    const baseStyles = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300";
    const variantStyles = {
        primary: "bg-cta hover:bg-cta-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        secondary: "bg-primary-700 hover:bg-primary-600 text-white",
        outline: "border-2 border-cta text-cta hover:bg-cta hover:text-white"
    };

    return (
        <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`${baseStyles} ${variantStyles[variant]} ${className} disabled:opacity-70 disabled:cursor-not-allowed`}
        >
            {isAdding ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Adding...
                </>
            ) : (
                <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                </>
            )}
        </button>
    );
}
