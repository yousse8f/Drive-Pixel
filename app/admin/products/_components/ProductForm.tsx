'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import { Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        imageUrl: initialData?.imageUrl || '',
        category: initialData?.category || '',
        availability: initialData?.availability || 10,
        isActive: initialData?.isActive !== false, // Default true
    });

    const handleChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                ...formData,
                price: Number(formData.price),
                availability: Number(formData.availability),
            };

            if (isEditing) {
                await apiClient.updateProduct(initialData.id, data);
            } else {
                await apiClient.createProduct(data);
            }
            router.push('/admin/products');
            router.refresh(); // Refresh server components/cache if any
        } catch (error) {
            console.error('Failed to save product', error);
            alert('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon" className="hover:bg-white/10 text-slate-400">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isEditing ? 'Edit Product' : 'New Product'}
                    </h1>
                    <p className="text-slate-400">
                        {isEditing ? 'Update product details' : 'Add a new product to your inventory'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Product Name</label>
                    <Input
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="bg-slate-950 border-white/10 text-white"
                        placeholder="e.g. Enterprise Package"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Price ($)</label>
                        <Input
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                            required
                            className="bg-slate-950 border-white/10 text-white"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Availability (Qty)</label>
                        <Input
                            type="number"
                            value={formData.availability}
                            onChange={(e) => handleChange('availability', e.target.value)}
                            className="bg-slate-950 border-white/10 text-white"
                            placeholder="100"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Category</label>
                    {/* Can be improved with a Select component if categories are fixed */}
                    <Input
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="bg-slate-950 border-white/10 text-white"
                        placeholder="e.g. Services, Software, Design"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Image URL</label>
                    <Input
                        value={formData.imageUrl}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                        className="bg-slate-950 border-white/10 text-white"
                        placeholder="https://..."
                    />
                    {formData.imageUrl && (
                        <div className="mt-2 h-40 w-full relative bg-slate-950 rounded-lg overflow-hidden border border-white/5">
                            <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-contain" />
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Product description..."
                    />
                </div>

                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-cta focus:ring-cta"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-slate-300 select-none">
                        Active (Visible in Shop)
                    </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/admin/products">
                        <Button type="button" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={loading} className="bg-cta hover:bg-cta-600 min-w-[120px]">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isEditing ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
