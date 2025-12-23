"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, CreditCard, CheckCircle2, X, Loader2, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/lib/hooks/useCart';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useRouter, useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.drivepixel.com/api';
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

function CartContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { items, total, updateItem, removeItem, sessionId, loading } = useCart();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [showPayPal, setShowPayPal] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [checkoutForm, setCheckoutForm] = useState({
        customerName: '',
        customerEmail: '',
    });

    useEffect(() => {
        if (searchParams.get('cancelled') === 'true') {
            setStatusMessage({ type: 'error', text: 'Payment was cancelled. Please try again.' });
        }
    }, [searchParams]);

    const handleUpdateQuantity = async (itemId: string, quantity: number) => {
        if (quantity < 1) return;
        await updateItem(itemId, quantity);
    };

    const validateForm = () => {
        if (!checkoutForm.customerName.trim()) {
            setStatusMessage({ type: 'error', text: 'Please enter your full name.' });
            return false;
        }
        if (!checkoutForm.customerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.customerEmail)) {
            setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return false;
        }
        return true;
    };

    const handleProceedToPayment = () => {
        if (!validateForm()) {
            return;
        }
        setStatusMessage(null);
        setShowPayPal(true);
    };

    const createOrder = async () => {
        try {
            const headers: any = { 'Content-Type': 'application/json' };
            if (sessionId) headers['x-session-id'] = sessionId;

            const response = await fetch(`${API_URL}/paypal/create-order`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    customerName: checkoutForm.customerName,
                    customerEmail: checkoutForm.customerEmail,
                }),
            });

            const data = await response.json();

            if (data.success && data.data) {
                setOrderId(data.data.orderId);
                return data.data.paypalOrderId;
            } else {
                throw new Error(data.message || 'Failed to create order');
            }
        } catch (error: any) {
            console.error('Create order error:', error);
            setStatusMessage({ type: 'error', text: error.message || 'Failed to create order' });
            throw error;
        }
    };

    const onApprove = async (data: any) => {
        try {
            setCheckoutLoading(true);
            const response = await fetch(`${API_URL}/paypal/capture-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paypalOrderId: data.orderID,
                    orderId: orderId,
                }),
            });

            const result = await response.json();

            if (result.success) {
                router.push(`/order/success?orderId=${orderId}`);
            } else {
                throw new Error(result.message || 'Payment capture failed');
            }
        } catch (error: any) {
            console.error('Capture error:', error);
            setStatusMessage({ type: 'error', text: error.message || 'Payment processing failed' });
            setCheckoutLoading(false);
        }
    };

    const onError = (err: any) => {
        console.error('PayPal error:', err);
        setStatusMessage({ type: 'error', text: 'Payment failed. Please try again.' });
        setShowPayPal(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                <div className="text-xl font-semibold">Loading Cart...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
            <Navbar />

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
                                                <Button className="bg-cta hover:bg-cta-600 text-[#041028] font-semibold">
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
                                                                <label className="text-sm font-semibold text-gray-900" htmlFor={`qty-${item.id}`}>
                                                                    Qty:
                                                                </label>
                                                                <Input
                                                                    id={`qty-${item.id}`}
                                                                    type="number"
                                                                    min={1}
                                                                    className="w-20 h-9 text-center bg-white border-gray-300 text-gray-900 font-semibold"
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
                                                <label className="text-sm font-semibold text-gray-900 mb-2 block">Full Name</label>
                                                <Input
                                                    value={checkoutForm.customerName}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerName: e.target.value })}
                                                    placeholder="Enter your full name"
                                                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-semibold text-gray-900 mb-2 block">Email Address</label>
                                                <Input
                                                    type="email"
                                                    value={checkoutForm.customerEmail}
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, customerEmail: e.target.value })}
                                                    placeholder="Enter your email"
                                                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-200 space-y-3">
                                            <div className="flex justify-between text-base">
                                                <span className="text-gray-700 font-medium">Subtotal</span>
                                                <span className="font-semibold text-gray-900">${total.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-base">
                                                <span className="text-gray-700 font-medium">Taxes</span>
                                                <span className="font-semibold text-gray-900">$0.00</span>
                                            </div>
                                            <div className="flex justify-between text-xl font-bold text-gray-900 border-t-2 border-gray-300 pt-4">
                                                <span>Total</span>
                                                <span className="text-primary-600">${total.toFixed(2)}</span>
                                            </div>

                                            {!showPayPal ? (
                                                <Button
                                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                                                    onClick={handleProceedToPayment}
                                                    disabled={checkoutLoading || items.length === 0}
                                                >
                                                    Proceed to Payment
                                                </Button>
                                            ) : (
                                                <div className="space-y-3">
                                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                                                        <div className="flex items-start gap-2">
                                                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-semibold mb-1">Secure PayPal Checkout</p>
                                                                <p className="text-xs">Click the PayPal button below to complete your purchase securely.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {PAYPAL_CLIENT_ID ? (
                                                        <PayPalScriptProvider
                                                            options={{
                                                                clientId: PAYPAL_CLIENT_ID,
                                                                currency: 'USD',
                                                                intent: 'capture',
                                                            }}
                                                        >
                                                            <PayPalButtons
                                                                style={{
                                                                    layout: 'vertical',
                                                                    color: 'gold',
                                                                    shape: 'rect',
                                                                    label: 'paypal',
                                                                }}
                                                                createOrder={createOrder}
                                                                onApprove={onApprove}
                                                                onError={onError}
                                                                disabled={checkoutLoading}
                                                            />
                                                        </PayPalScriptProvider>
                                                    ) : (
                                                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                                                            PayPal is not configured. Please contact support.
                                                        </div>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() => setShowPayPal(false)}
                                                        disabled={checkoutLoading}
                                                    >
                                                        Back to Cart
                                                    </Button>
                                                </div>
                                            )}
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

export default function CartPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-primary-600 mb-4" />
                <div className="text-xl font-semibold">Loading Cart...</div>
            </div>
        }>
            <CartContent />
        </Suspense>
    );
}
