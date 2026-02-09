import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProductMutation, useUpdateProductMutation } from '../api/adminApiSlice';
import { useGetProductDetailsQuery } from '../../redux/api/productsApiSlice';
import { Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';

const ProductForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const { data: existingProduct, isLoading: loadingProduct } = useGetProductDetailsQuery(id, {
        skip: !isEditMode,
    });

    const [createProduct, { isLoading: creating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        images: '',
        description: '',
        benefits: '',
        usage: '',
        storage: '',
        category: 'spices',
        subCategory: '',
        price: '',
        countInStock: '',
        weight: '100g',
    });

    useEffect(() => {
        if (isEditMode && existingProduct) {
            setFormData({
                name: existingProduct.name || '',
                image: existingProduct.image || '',
                images: existingProduct.images?.join(', ') || '',
                description: existingProduct.description || '',
                benefits: existingProduct.benefits || '',
                usage: existingProduct.usage || '',
                storage: existingProduct.storage || '',
                category: existingProduct.category || 'spices',
                subCategory: existingProduct.subCategory || '',
                price: existingProduct.price?.toString() || '',
                countInStock: existingProduct.countInStock?.toString() || '',
                weight: existingProduct.weight || '100g',
            });
        }
    }, [isEditMode, existingProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: Number(formData.price),
            countInStock: Number(formData.countInStock),
            images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
        };

        try {
            if (isEditMode) {
                await updateProduct({ id, ...productData }).unwrap();
                alert('Product updated successfully');
            } else {
                await createProduct(productData).unwrap();
                alert('Product created successfully');
            }
            navigate('/admin/products');
        } catch (err: any) {
            alert(err?.data?.message || 'Failed to save product');
        }
    };

    if (loadingProduct) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            >
                                <option value="spices">Spices</option>
                                <option value="oils">Oils</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleChange}
                                placeholder="e.g., Turmeric, Coconut"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL*</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                        <input
                            type="text"
                            name="images"
                            value={formData.images}
                            onChange={handleChange}
                            placeholder="URLs separated by commas"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                        <textarea
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)*</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Weight*</label>
                            <input
                                type="text"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                placeholder="e.g., 100g, 500ml"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-6">
                    <Button type="submit" disabled={creating || updating} className="flex-1">
                        {(creating || updating) ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            isEditMode ? 'Update Product' : 'Create Product'
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/products')}
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
