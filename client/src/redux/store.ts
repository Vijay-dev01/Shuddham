import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
