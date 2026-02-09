import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useGetProductsQuery } from '../redux/api/productsApiSlice';
import { Loader2 } from 'lucide-react';

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { data: products, isLoading, error } = useGetProductsQuery({});

    // Filter products based on search query
    const filteredProducts = products?.filter((product: any) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
    ) || [];

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" />
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error loading products</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-2">
                Search Results
            </h1>
            <p className="text-gray-600 mb-8">
                {filteredProducts.length} results for "{query}"
            </p>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600 mb-4">No products found</p>
                    <p className="text-gray-500">Try searching with different keywords</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product: any) => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                            weight={product.weight}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
