'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                <p className="text-gray-600">Manage and view customer orders.</p>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="border-gray-200 hover:bg-gray-50">
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                    Loading orders...
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                    <p>No orders found.</p>
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id} className="border-gray-200 hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        <div>{order.customer_name}</div>
                                        <div className="text-sm text-gray-500">{order.customer_email}</div>
                                    </TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
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
                                    <TableCell>{format(new Date(order.created_at), 'yyyy-MM-dd HH:mm')}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
