import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from "./features/auth/authSlice"
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviewsApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/ordersApi';
import categoryApi from './features/category/categoryApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
    [statsApi.reducerPath] : statsApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, 
      reviewApi.middleware, statsApi.middleware, orderApi.middleware, categoryApi.middleware),
});