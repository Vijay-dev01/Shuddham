import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => `/products/${productId}`,
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
