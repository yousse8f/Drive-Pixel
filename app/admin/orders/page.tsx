'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await apiClient.getOrders();
            if (response.success && response.data) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Failed to load orders', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16 text-gray-600">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
                Loading orders...
            </div>
        );
    }

    return (
        <div className="space-y-8 text-gray-900">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-gray-600">Manage and view customer orders.</p>
            </div>

            <Card className="border border-gray-200 bg-white shadow-sm">
                <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-xl font-semibold text-gray-900">Recent Orders</CardTitle>
                    <p className="text-sm text-gray-500">Live overview of every purchase placed through the platform.</p>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50">
                                    <TableHead className="text-gray-600">Customer</TableHead>
                                    <TableHead className="text-gray-600">Total</TableHead>
                                    <TableHead className="text-gray-600">Payment Status</TableHead>
                                    <TableHead className="text-gray-600">Order Status</TableHead>
                                    <TableHead className="text-gray-600">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                                            <TableCell className="font-semibold text-gray-900">
                                                <div>{order.customer_name}</div>
                                                <div className="text-sm text-gray-500">{order.customer_email}</div>
                                            </TableCell>
                                            <TableCell className="text-sm font-semibold text-gray-900">
                                                ${order.total.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                                                    {order.payment_status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-700">
                                                {format(new Date(order.created_at), 'yyyy-MM-dd HH:mm')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
