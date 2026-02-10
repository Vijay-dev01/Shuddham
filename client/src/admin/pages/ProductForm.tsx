import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateProductMutation, useUpdateProductMutation } from '../api/adminApiSlice';
import { useGetProductDetailsQuery } from '../../redux/api/productsApiSlice';
import { Loader2, Upload, X } from 'lucide-react';
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

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);
    const [additionalImagesPreview, setAdditionalImagesPreview] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isEditMode && existingProduct) {
            setFormData({
                name: existingProduct.name || '',
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
            setMainImagePreview(existingProduct.image || '');
            setAdditionalImagesPreview(existingProduct.images || []);
        }
    }, [isEditMode, existingProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setAdditionalImages([...additionalImages, ...files]);
            const previews = files.map(file => URL.createObjectURL(file));
            setAdditionalImagesPreview([...additionalImagesPreview, ...previews]);
        }
    };

    const removeAdditionalImage = (index: number) => {
        // Need to figure out if it's a new file or an existing URL
        const previewToRemove = additionalImagesPreview[index];

        // If it starts with blob:, it's a newly added file
        if (previewToRemove.startsWith('blob:')) {
            // Find the index in the additionalImages array
            // Since previews and files are matched, we can find it
            const blobIndex = additionalImagesPreview.filter((p, i) => i < index && p.startsWith('blob:')).length;
            setAdditionalImages(additionalImages.filter((_, i) => i !== blobIndex));
        }

        setAdditionalImagesPreview(additionalImagesPreview.filter((_, i) => i !== index));
    };

    const uploadSingleImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const userInfo = localStorage.getItem('userInfo');
        const token = userInfo ? JSON.parse(userInfo).token : '';

        const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Image upload failed');
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            // 1. Handle Main Image
            let imageUrl = mainImagePreview;
            if (mainImage) {
                imageUrl = await uploadSingleImage(mainImage);
            }

            // 2. Handle Additional Images
            // Filter current previews to keep only existing URLs (not starting with blob:)
            const existingUrls = additionalImagesPreview.filter(url => !url.startsWith('blob:'));

            // Upload only new files
            const newFileUrls = await Promise.all(
                additionalImages.map(file => uploadSingleImage(file))
            );

            const finalImagesUrls = [...existingUrls, ...newFileUrls];

            const productData = {
                ...formData,
                image: imageUrl,
                images: finalImagesUrls,
                price: Number(formData.price),
                countInStock: Number(formData.countInStock),
            };

            if (isEditMode) {
                await updateProduct({ id, ...productData }).unwrap();
                alert('Product updated successfully');
            } else {
                await createProduct(productData).unwrap();
                alert('Product created successfully');
            }
            navigate('/admin/products');
        } catch (err: any) {
            alert(err?.data?.message || err.message || 'Failed to save product');
        } finally {
            setUploading(false);
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

                    {/* Main Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Main Product Image*</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            {mainImagePreview ? (
                                <div className="relative">
                                    <img src={mainImagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMainImage(null);
                                            setMainImagePreview('');
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-md"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center cursor-pointer">
                                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                    <span className="text-sm text-gray-600">Click to upload main image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainImageChange}
                                        className="hidden"
                                        required={!isEditMode}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Additional Images Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <label className="flex flex-col items-center cursor-pointer mb-4">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">Click to add more images</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleAdditionalImagesChange}
                                    className="hidden"
                                />
                            </label>
                            {additionalImagesPreview.length > 0 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {additionalImagesPreview.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img src={preview.startsWith('blob:') ? preview : preview} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded" />
                                            <button
                                                type="button"
                                                onClick={() => removeAdditionalImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                    <Button type="submit" disabled={creating || updating || uploading} className="flex-1">
                        {(creating || updating || uploading) ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {uploading ? 'Uploading...' : 'Saving...'}
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
