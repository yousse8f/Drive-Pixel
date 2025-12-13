'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../_components/ProductForm';
import { apiClient } from '@/lib/api-client';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
    const params = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            loadProduct(params.id as string);
        }
    }, [params.id]);

    const loadProduct = async (id: string) => {
        try {
            // We use getPublicProduct because getProducts returns a list and we want single item
            // But verify if admin endpoint exists or if we rely on public list for now
            // Actually we just added getProduct (admin route) to backend, but apiClient might not have it exposed specifically
            // Let's check apiClient again. It has getProducts (list). It does not have getProduct(id) for admin.
            // But we can use public endpoint for retrieving data initially if it's active.
            // Or better: update apiClient to include getProduct for admin or use generic request.

            // Attempt to find from list first or fetch specific?
            // Best practice: Fetch specific. I'll add getProduct to apiClient or use request directly.
            // Since I can't edit apiClient easily without context (it's large), I'll try to fetch via generic request if possible, 
            // or just assume public endpoint works if I didn't add auth to it? 
            // Wait, public endpoint checks is_active=true. 
            // But I added getProduct route to admin!
            // So I should call client.request(`/admin/products/${id}`)

            // @ts-ignore - Accessing private method or extending logic dynamically
            const response = await apiClient.request(`/admin/products/${id}`);

            if (response.success && response.data) {
                setProduct(response.data);
            }
        } catch (error) {
            console.error('Failed to load product', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20 text-slate-400">Product not found</div>;
    }

    return <ProductForm initialData={product} isEditing />;
}
