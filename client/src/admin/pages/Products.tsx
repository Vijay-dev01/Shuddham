import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useGetAdminProductsQuery,
    useDeleteProductMutation,
    useToggleProductStatusMutation,
} from '../api/adminApiSlice';
import { Plus, Edit, Trash2, Power, Loader2, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

const Products: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: products, isLoading, refetch } = useGetAdminProductsQuery({});
    const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
    const [toggleStatus, { isLoading: toggling }] = useToggleProductStatusMutation();

    const filteredProducts = products?.filter((product: any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteProduct(id).unwrap();
                alert('Product deleted successfully');
                refetch();
            } catch (err: any) {
                alert(err?.data?.message || 'Failed to delete product');
            }
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            await toggleStatus(id).unwrap();
            refetch();
        } catch (err: any) {
            alert(err?.data?.message || 'Failed to update product status');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Button
                    onClick={() => navigate('/admin/products/create')}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-5 w-5" />
                    Add Product
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E6F5C] outline-none"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product: any) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-12 w-12 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            ₹{product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-bold rounded-full ${product.countInStock > 10
                                                        ? 'bg-green-100 text-green-700'
                                                        : product.countInStock > 0
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {product.countInStock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs font-bold rounded-full ${product.isActive
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {product.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(product._id)}
                                                    disabled={toggling}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title={product.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    <Power className="h-4 w-4 text-gray-600" />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Edit className="h-4 w-4 text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id, product.name)}
                                                    disabled={deleting}
                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
