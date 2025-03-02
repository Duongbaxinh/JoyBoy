import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice";

export const store = configureStore({
    reducer: {
        product: productReducer
    }
});

// Lấy kiểu RootState và AppDispatch từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
