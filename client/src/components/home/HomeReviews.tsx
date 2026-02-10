import React from 'react';
import { Star, Loader2, Quote } from 'lucide-react';
import { useGetTopReviewsQuery } from '../../redux/api/reviewsApiSlice';

const HomeReviews: React.FC = () => {
    const { data: reviews, isLoading, error } = useGetTopReviewsQuery({});

    if (isLoading) return null; // Don't show loader on home page for secondary content
    if (error) return null;

    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="bg-[#1E6F5C]/5 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-heading font-bold text-[#1E6F5C] mb-4">What Our Customers Say</h2>
                    <div className="w-20 h-1 bg-[#F2B705] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review: any) => (
                        <div key={review._id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-[#1E6F5C]/10" />

                            <div className="flex text-[#F2B705] mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6 italic line-clamp-3">"{review.comment}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#1E6F5C] text-white flex items-center justify-center font-bold text-lg">
                                    {review.user ? review.user.name.substring(0, 1).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#7A4A2E]">{review.user ? review.user.name : 'Anonymous'}</h4>
                                    {review.product && (
                                        <p className="text-xs text-[#1E6F5C] font-medium uppercase tracking-wide truncate max-w-[150px]">
                                            {review.product.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeReviews;
