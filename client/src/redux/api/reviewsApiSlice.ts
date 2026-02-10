import { apiSlice } from './apiSlice';

const REVIEW_URL = '/reviews';

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: (productId) => ({
                url: `${REVIEW_URL}/product/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getAllReviews: builder.query({
            query: () => ({
                url: REVIEW_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getTopReviews: builder.query({
            query: () => ({
                url: `${REVIEW_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: REVIEW_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `${REVIEW_URL}/${reviewId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetAllReviewsQuery,
    useGetTopReviewsQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApiSlice;
