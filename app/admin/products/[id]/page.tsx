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
            const response = await apiClient.getProduct(id);

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
