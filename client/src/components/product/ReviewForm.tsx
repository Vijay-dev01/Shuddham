import React, { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCreateReviewMutation } from '../../redux/api/reviewsApiSlice';
import Button from '../ui/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface ReviewFormProps {
    productId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    const [createReview, { isLoading, error }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state: any) => state.auth);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            setComment('');
            setRating(5);
            toast.success('Review Submitted Successfully!');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-heading font-bold text-[#1E6F5C] mb-4">Write a Customer Review</h3>

            {userInfo ? (
                <form onSubmit={submitHandler}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error! </strong>
                            <span className="block sm:inline">{'data' in error ? (error as any).data.message : 'Something went wrong'}</span>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-colors"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating ? 'text-[#F2B705] fill-current' : 'text-gray-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-gray-700 font-bold mb-2">Comment</label>
                        <textarea
                            id="comment"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E6F5C]"
                            required
                        ></textarea>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                        Submit Review
                    </Button>
                </form>
            ) : (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-yellow-800">
                    Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review.
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
