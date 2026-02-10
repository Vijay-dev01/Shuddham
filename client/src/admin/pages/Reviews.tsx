import React from 'react';
import { useGetAllReviewsQuery, useDeleteReviewMutation } from '../../redux/api/reviewsApiSlice';
import { Loader2, Trash2 } from 'lucide-react';

const Reviews: React.FC = () => {
    const { data: reviews, isLoading, error, refetch } = useGetAllReviewsQuery({});
    const [deleteReview] = useDeleteReviewMutation();

    const deleteHandler = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await deleteReview(id).unwrap();
                refetch();
            } catch (err) {
                console.error(err);
                alert('Failed to delete review');
            }
        }
    };

    if (isLoading) return <Loader2 className="h-10 w-10 animate-spin text-[#1E6F5C] mx-auto mt-10" />;
    if (error) return <div className="text-red-500 text-center mt-10">Error loading reviews</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#1E6F5C]">Reviews</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">ID</th>
                            <th className="p-4 font-semibold text-gray-600">User</th>
                            <th className="p-4 font-semibold text-gray-600">Product</th>
                            <th className="p-4 font-semibold text-gray-600">Rating</th>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reviews?.map((review: any) => (
                            <tr key={review._id} className="hover:bg-gray-50">
                                <td className="p-4 text-sm text-gray-600">{review._id}</td>
                                <td className="p-4 text-sm font-medium text-gray-800">{review.user?.name || 'Deleted User'}</td>
                                <td className="p-4 text-sm text-gray-600">{review.product?.name || 'Deleted Product'}</td>
                                <td className="p-4 text-sm text-gray-600">{review.rating}</td>
                                <td className="p-4 text-sm text-gray-600">{review.createdAt.substring(0, 10)}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => deleteHandler(review._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reviews && reviews.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No reviews found</div>
                )}
            </div>
        </div>
    );
};

export default Reviews;
