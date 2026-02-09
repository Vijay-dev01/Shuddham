import { apiSlice } from '../../redux/api/apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Dashboard Stats
        getDashboardStats: builder.query({
            query: () => '/admin/orders/dashboard/stats',
        }),

        // Products
        getAdminProducts: builder.query({
            query: () => '/admin/products',
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: '/admin/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: ({ id, ...product }) => ({
                url: `/admin/products/${id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/admin/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
        toggleProductStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/products/${id}/status`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Product'],
        }),

        // Orders
        getAdminOrders: builder.query({
            query: () => '/admin/orders',
            providesTags: ['Order'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/orders/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetAdminProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useToggleProductStatusMutation,
    useGetAdminOrdersQuery,
    useUpdateOrderStatusMutation,
} = adminApiSlice;
