"use client";
import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {brandApi} from "./apis/brand.api";
import {categoryApi} from "./apis/category.api";
import {manageProductApi} from "./apis/manageproduct.api";
import {orderApi} from "./apis/order.api";
import {productApi} from "./apis/product.api";
import {promotionApi} from "./apis/promotion.api";
import {productTypeApi} from "./apis/typeproduct.api";
import {authApi} from "./slices/auth.slice";
import {userApi} from "./apis/manageuser.api";

export const store = configureStore({
    reducer: {
        [manageProductApi.reducerPath]: manageProductApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [promotionApi.reducerPath]: promotionApi.reducer,
        [productTypeApi.reducerPath]: productTypeApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            orderApi.middleware,
            userApi.middleware,
            manageProductApi.middleware,
            productTypeApi.middleware,
            promotionApi.middleware,
            productApi.middleware,
            categoryApi.middleware,
            brandApi.middleware,
            authApi.middleware
        )
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
