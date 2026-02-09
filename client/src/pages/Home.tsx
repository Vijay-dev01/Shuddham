import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import ProductCard from '../components/product/ProductCard';
import { useGetProductsQuery } from '../redux/api/productsApiSlice';
import { Loader2 } from 'lucide-react';

const Home: React.FC = () => {
    const { data: products, isLoading, error } = useGetProductsQuery({});
    console.log(products,"pro")
    return (
        <div className="bg-[#FAFAF7]">
            <Hero />
            <Features />

            {/* Product Overview Section */}
            <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-2">Our Best Sellers</h2>
                        <p className="text-gray-600">Handpicked for purity and taste.</p>
                    </div>
                    <a href="/spices" className="text-[#7A4A2E] font-medium hover:underline hidden md:block">View All Products →</a>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-[#1E6F5C]" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-12">Error loading products</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products?.slice(0, 4).map((product: any) => (
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

                <div className="mt-8 text-center md:hidden">
                    <a href="/spices" className="text-[#7A4A2E] font-medium hover:underline">View All Products →</a>
                </div>
            </section>

            {/* Process Section Placeholder */}
            <section className="py-16 bg-[#1E6F5C] text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold mb-8">How We Make It</h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        From the fertile lands of local farmers to traditional stone grinding and hygienic packing —
                        we ensure that every pinch of spice and drop of oil is as pure as nature intended.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
