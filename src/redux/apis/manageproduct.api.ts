import {ImageProduct, IProduct} from "@/interfaces/data.type";
import {ProductFormData} from "@/interfaces/form.type";
import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "../customeBaseQuery";
interface ParamsType {
    limit?: number;
    page?: number;
    [key: string]: any;
}
export const manageProductApi = createApi({
    reducerPath: "manageProductApi",
    baseQuery: customFetchBaseQuery,
    tagTypes: ["IProduct"],
    endpoints: (builder) => ({
        createProduct: builder.mutation<IProduct, ProductFormData[]>({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["IProduct"]
        }),
        createProductImages: builder.mutation<ImageProduct, ImageProduct[]>({
            query: (product) => ({
                url: "/product-images",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["IProduct"]
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (slug) => ({
                url: `/products/${slug}`,
                method: "DELETE"
            }),
            invalidatesTags: ["IProduct"]
        })
    })
});

export const {
    useCreateProductMutation,
    useCreateProductImagesMutation,
    useDeleteProductMutation
} = manageProductApi;
