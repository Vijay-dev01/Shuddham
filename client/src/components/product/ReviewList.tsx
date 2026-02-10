import React from 'react';
import { Star, Loader2 } from 'lucide-react';
import { useGetReviewsQuery } from '../../redux/api/reviewsApiSlice';

interface ReviewListProps {
    productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
    const { data: reviews, isLoading, error } = useGetReviewsQuery(productId);

    if (isLoading) return <Loader2 className="h-6 w-6 animate-spin text-[#1E6F5C]" />;
    if (error) return <div className="text-red-500">Error loading reviews</div>;

    // Check if reviews is an array before mapping
    if (!reviews || !Array.isArray(reviews)) {
        return <div className="text-gray-500 italic mt-4">No reviews yet</div>;
    }

    if (reviews.length === 0) {
        return <div className="text-gray-500 italic mt-4">No reviews yet</div>;
    }

    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-heading font-bold text-[#1E6F5C]">Customer Reviews</h3>
            {reviews.map((review: any) => (
                <div key={review._id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <strong className="text-[#7A4A2E]">{review.user ? review.user.name : 'Anonymous'}</strong>
                        <div className="flex text-[#F2B705]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{review.createdAt.substring(0, 10)}</p>
                    <p className="text-gray-700">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
