"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Download, Mail, Package, Loader2, AlertCircle, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.drivepixel.com/api';

type OrderItem = {
    productId: string;
    name: string;
    description: string;
    quantity: number;
    priceEach: number;
    imageUrl?: string;
};

type OrderDetails = {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    customerAddress: string;
    total: number;
    paymentStatus: string;
    status: string;
    paymentProvider: string;
    paymentReference?: string;
    createdAt: string;
    items: OrderItem[];
};

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails();
        } else {
            setError('No order ID provided');
            setLoading(false);
        }
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/paypal/order/${orderId}`);
            const data = await response.json();

            if (data.success && data.data) {
                setOrder(data.data);
            } else {
                setError(data.message || 'Failed to load order details');
            }
        } catch (err: any) {
            console.error('Error fetching order:', err);
            setError('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
                        <p className="text-lg text-gray-600">Loading order details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
                    <Card className="max-w-md w-full mx-4">
                        <CardContent className="pt-6 text-center">
                            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                            <p className="text-gray-600 mb-6">{error || 'Unable to retrieve order details'}</p>
                            <Link href="/shop">
                                <Button className="bg-cta hover:bg-cta-600 text-[#041028]">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="container-custom max-w-4xl">
                    {/* Success Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle2 className="h-12 w-12 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                        <p className="text-lg text-gray-600">
                            Thank you for your purchase, {order.customerName}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Order #{order.id} • {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>

                    {/* Order Summary Card */}
                    <Card className="mb-6 shadow-lg print:shadow-none">
                        <CardHeader className="bg-gradient-to-r from-primary-50 to-cta-50 border-b">
                            <CardTitle className="flex items-center gap-2 text-primary-900">
                                <Package className="h-5 w-5" />
                                Order Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Order Items */}
                            <div className="space-y-4 mb-6">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                        <div className="h-20 w-20 rounded-lg bg-gray-100 overflow-hidden relative flex-shrink-0 border border-gray-200">
                                            {item.imageUrl ? (
                                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                                    No image
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                                <span className="font-semibold text-gray-900">
                                                    ${(item.priceEach * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Totals */}
                            <div className="space-y-2 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-base">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${order.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-base">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-primary-900 pt-2 border-t border-gray-200">
                                    <span>Total Paid</span>
                                    <span className="text-green-600">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer & Payment Info */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <Card className="shadow-lg print:shadow-none">
                            <CardHeader className="bg-gray-50 border-b">
                                <CardTitle className="text-base font-semibold text-gray-900">
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-2 text-sm">
                                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                                    <p className="text-gray-600">{order.customerEmail}</p>
                                    {order.customerPhone && (
                                        <p className="text-gray-600">{order.customerPhone}</p>
                                    )}
                                    <p className="text-gray-600 whitespace-pre-line">{order.customerAddress}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg print:shadow-none">
                            <CardHeader className="bg-gray-50 border-b">
                                <CardTitle className="text-base font-semibold text-gray-900">
                                    Payment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Method</span>
                                        <span className="font-semibold text-gray-900 capitalize">{order.paymentProvider}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment Status</span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                    {order.paymentReference && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Transaction ID</span>
                                            <span className="font-mono text-xs text-gray-900">{order.paymentReference.slice(0, 16)}...</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Confirmation Message */}
                    <Card className="mb-6 bg-blue-50 border-blue-200 print:hidden">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">Confirmation Email Sent</h3>
                                    <p className="text-sm text-blue-800">
                                        A confirmation email with your order details and receipt has been sent to{' '}
                                        <span className="font-semibold">{order.customerEmail}</span>. 
                                        Please check your inbox and spam folder.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 print:hidden">
                        <Button
                            onClick={handlePrint}
                            variant="outline"
                            className="flex-1 border-gray-300 hover:bg-gray-50"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Print Receipt
                        </Button>
                        <Link href="/shop" className="flex-1">
                            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                                Continue Shopping
                            </Button>
                        </Link>
                        <Link href="/" className="flex-1">
                            <Button className="w-full bg-cta hover:bg-cta-600 text-[#041028]">
                                <Home className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>

                    {/* Support Message */}
                    <div className="mt-8 text-center text-sm text-gray-600 print:hidden">
                        <p>
                            Need help with your order?{' '}
                            <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold underline">
                                Contact our support team
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        background: white !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
