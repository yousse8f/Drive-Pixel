"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, CreditCard, CheckCircle2, X } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';

export default function CartPage() {
    const { items, total, updateItem, removeItem, checkout, loading } = useCart();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [checkoutForm, setCheckoutForm] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        paymentProvider: 'stripe',
    });

    const handleUpdateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        await updateItem(itemId, quantity);
    };

    const handleCheckout = async () => {
        if (!checkoutForm.customerName || !checkoutForm.customerEmail || !checkoutForm.customerAddress) {
            setStatusMessage({ type: 'error', text: 'Please fill in name, email, and address.' });
            return;
        }
        setCheckoutLoading(true);
        setStatusMessage(null);
        try {
            await checkout({
                customerName: checkoutForm.customerName,
                customerEmail: checkoutForm.customerEmail,
                customerPhone: checkoutForm.customerPhone,
                customerAddress: checkoutForm.customerAddress,
                paymentProvider: checkoutForm.paymentProvider,
            });
            setStatusMessage({ type: 'success', text: 'Order placed successfully! Payment pending.' });
            // Optional: reset form or redirect
            setCheckoutForm({
                customerName: '',
                customerEmail: '',
                customerPhone: '',
                customerAddress: '',
                paymentProvider: 'stripe',
            });
        } catch (error: any) {
            setStatusMessage({ type: 'error', text: error.message || 'Checkout failed.' });
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
                <div className="text-xl font-semibold">Loading Cart...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <TopBar />
            <Navbar darkBg={false} />

            <main className="flex-1 py-12">
                <div className="container-custom">
                    <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <ShoppingCart className="h-8 w-8 text-primary-600" />
                        Your Shopping Cart
                    </h1>

                    <div className="grid lg:grid-cols-[1.5fr,1fr] gap-10">
                        {/* Cart Items */}
                        <div className="space-y-6">
                            <Card className="bg-white shadow-sm border-gray-200">
                                <CardContent className="p-0">
                                    {items.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                                            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
                                            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                                            <Link href="/shop">
                                                <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                                                    Start Shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {items.map((item) => (
                                                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                                                    <div className="h-24 w-24 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0 border border-gray-200">
                                                        {item.imageUrl ? (
                                                            <Image src={item.imageUrl} alt={`${item.name} image`} fill className="object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                                                No image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 w-full">
                                                        <div className="flex items-start justify-between gap-4 mb-2">
                                                            <div>
                                                                <Link href={`/shop`} className="font-bold text-lg text-primary-900 hover:text-primary-700 transition-colors">
                                                                    {item.name}
                                                                </Link>
                                                                <div className="text-primary-600 font-medium mt-1">${item.priceEach.toFixed(2)}</div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeItem(item.id)}
                                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                                aria-label={`Remove ${item.name}`}
                                                            >
                                                                <X className="h-5 w-5" />
                                                            </Button>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="flex items-center gap-3">
                                                                <label className="text-sm font-medium text-gray-600" htmlFor={`qty-${item.id}`}>
                                                                    Qty:
                                                                </label>
                                                                <Input
                                                                    id={`qty-${item.id}`}
                                                                    type="number"
                                                                    min={1}
                                                                    className="w-20 h-9 text-center"
                                                                    value={item.quantity}
                                                                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                                />
                                                            </div>
                                                            <div className="font-bold text-lg text-gray-900">
                                                                ${(item.priceEach * item.quantity).toFixed(2)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Checkout Form */}
                        {items.length > 0 && (
                            <div className="space-y-6">
                                <Card className="bg-white shadow-sm border-gray-200 sticky top-24">
                                    <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                                        <CardTitle className="flex items-center gap-2 text-primary-900 text-xl">
                                            <CreditCard className="h-5 w-5 text-primary-600" />
                                            Checkout Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5 pt-6">
                                        {statusMessage && (
                                            <div
                                                className={`rounded-lg px-4 py-3 border text-sm ${statusMessage.type === 'success'
                                                        ? 'bg-green-50 text-green-800 border-green-200'
                                                        : 'bg-red-50 text-red-800 border-red-200'
                                                    }`}
                                            >
                                                {statusMessage.text}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                                                <Input
                                                    value={checkoutForm.customerName}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerName: e.target.value })}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                                                <Input
                                                    type="email"
                                                    value={checkoutForm.customerEmail}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerEmail: e.target.value })}
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone (Optional)</label>
                                                <Input
                                                    value={checkoutForm.customerPhone}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerPhone: e.target.value })}
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-700 mb-1 block">Shipping Address</label>
                                                <textarea
                                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                                                    value={checkoutForm.customerAddress}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerAddress: e.target.value })}
                                                    placeholder="Enter your full address"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100">
                                            <div className="flex justify-between text-base mb-2">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">${total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-base mb-4">
                                                <span className="text-gray-600">Taxes</span>
                                                <span className="font-medium">$0.00</span>
                                            </div>
                                            <div className="flex justify-between text-xl font-bold text-primary-900 border-t border-gray-100 pt-4">
                                                <span>Total</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-cta hover:bg-cta-600 text-white py-6 text-lg"
                                            onClick={handleCheckout}
                                            disabled={checkoutLoading}
                                        >
                                            {checkoutLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Secure Checkout powered by Stripe/PayPal
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
