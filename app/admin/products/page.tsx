'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Search, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { apiClient } from '@/lib/api-client';

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await apiClient.getProducts(true); // Include inactive
            if (response.success && response.data) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const response = await apiClient.deleteProduct(id);
            if (response.success) {
                setProducts(products.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete product', error);
            alert('Failed to delete product');
        }
    };

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="bg-cta hover:bg-cta-600">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-2 bg-white p-4 rounded-xl border border-gray-200">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Filter products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent border-0 focus-visible:ring-0 text-gray-900 placeholder:text-gray-500"
                />
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="border-gray-200 hover:bg-gray-50">
                            <TableHead className="text-gray-500">Name</TableHead>
                            <TableHead className="text-gray-500">Category</TableHead>
                            <TableHead className="text-gray-500">Price</TableHead>
                            <TableHead className="text-gray-500">Status</TableHead>
                            <TableHead className="text-right text-gray-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <Package className="h-8 w-8 opacity-50" />
                                        <p>No products found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id} className="border-gray-200 hover:bg-gray-50">
                                    <TableCell className="font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            {product.imageUrl ? (
                                                <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden relative">
                                                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                                </div>
                                            ) : (
                                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    <Package className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                            <span>{product.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{product.category || '-'}</TableCell>
                                    <TableCell className="text-emerald-400 font-mono">${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium border ${product.isActive
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}
                                        >
                                            {product.isActive ? 'Active' : 'Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}`}>
                                                <Button variant="ghost" size="icon" className="hover:bg-gray-100 hover:text-blue-500">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(product.id)}
                                                className="hover:bg-gray-100 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
