import {IProduct} from "@/interfaces";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
};

export const fetchProducts = createAsyncThunk<IProduct[], string>(
    "products/fetch",
    async (accessToken) => {
        try {
            const response = await axios.get(
                "http://localhost:5050/api/v1/product",
                {
                    headers: {Authorization: `Bearer ${accessToken}`}
                }
            );
            return response.data.data.products;
        } catch (error: any) {}
    }
);

export const createProduct = createAsyncThunk<
    IProduct,
    {accessToken: string; product: Omit<IProduct, "_id">}
>("products/create", async ({accessToken, product}, {rejectWithValue}) => {
    try {
        const response = await axios.post(
            "http://localhost:5050/api/v1/product",
            product,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || "Failed to create product"
        );
    }
});

export const updateProduct = createAsyncThunk<
    IProduct,
    {accessToken: string; productId: string; updates: Partial<IProduct>}
>(
    "products/update",
    async ({accessToken, productId, updates}, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `http://localhost:5050/api/v1/product/${productId}`,
                updates,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update product"
            );
        }
    }
);
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<IProduct[]>) => {
                    state.loading = false;
                    state.products = action.payload;
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load products";
            })

            // Create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                createProduct.fulfilled,
                (state, action: PayloadAction<IProduct>) => {
                    state.loading = false;
                    state.products.push(action.payload); // Add new product to the state
                }
            )
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default productSlice.reducer;
