"use client";
import {configureStore} from "@reduxjs/toolkit";
import {productApi} from "./apis/product.api";
import {setupListeners} from "@reduxjs/toolkit/query";
import {categoryApi} from "./apis/category.api";
import {brandApi} from "./apis/brand.api";
import {authApi} from "./slices/auth.slice";
import userReducer from "./slices/auth.slice";
import {productTypeApi} from "./apis/typeproduct.api";
import {promotionApi} from "./apis/promotion.api";
import {manageProductApi} from "./apis/manageproduct.api";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [manageProductApi.reducerPath]: manageProductApi.reducer,
        [promotionApi.reducerPath]: promotionApi.reducer,
        [productTypeApi.reducerPath]: productTypeApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
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
