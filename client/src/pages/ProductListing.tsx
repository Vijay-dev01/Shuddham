import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useGetProductsQuery } from '../redux/api/productsApiSlice';
import { Loader2 } from 'lucide-react';

interface ProductListingProps {
    category?: 'spices' | 'oils';
}

const ProductListing: React.FC<ProductListingProps> = ({ category }) => {
    const { category: urlCategory } = useParams<{ category: string }>();
    const { data: products, isLoading, error } = useGetProductsQuery({});

    // Determine category from prop or URL
    const activeCategory = category || (urlCategory === 'spices' || urlCategory === 'oils' ? urlCategory : undefined);

    const filteredProducts = activeCategory && products
        ? products.filter((p: any) => p.category === activeCategory)
        : products;

    const title = activeCategory
        ? (activeCategory === 'spices' ? 'Authentic Spices' : 'Cold-Pressed Oils')
        : 'All Products';

    if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C]" /></div>;
    if (error) return <div className="text-center py-20 text-red-500">Error loading products</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-8 capitalize">{title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts?.map((product: any) => (
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
        </div>
    );
};

export default ProductListing;
