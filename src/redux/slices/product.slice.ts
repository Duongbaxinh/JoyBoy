import {IProduct} from "@/interfaces";
import {BASE_API} from "@/config/api.config";
import {ProductResponse} from "@/interfaces/data.type";
import {toQueryString} from "@/utils/createParam";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
interface ParamsType {
    limit?: number;
    page?: number;
    [key: string]: any;
}
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API
    }),
    tagTypes: ["IProduct"],
    endpoints: (builder) => ({
        searchProducts: builder.query<IProduct[], ParamsType>({
            query: (params: any) => {
                const queryString = toQueryString(params);
                const url = `/products?${queryString}`;
                return {
                    url: url,
                    timeout: 10000
                };
            },
            transformResponse: (response: IProduct[]) => {
                return response;
            },
            keepUnusedDataFor: 0
        }),
        getAllProducts: builder.query<ProductResponse, ParamsType>({
            query: (params: any) => {
                const queryString = toQueryString(params);
                const url = `/products?${queryString}`;
                console.log("url products :::: ", url);
                return {
                    url: url,
                    timeout: 10000
                };
            },
            transformResponse: (response: ProductResponse) => {
                return response as ProductResponse;
            },
            providesTags: ["IProduct"]
        }),
        getProductFilter: builder.query<ProductResponse, ParamsType>({
            query: (params: any) => {
                const queryString = toQueryString(params);

                const url = `/products?${queryString}`;
                return {
                    url: url,
                    timeout: 10000
                };
            },
            transformResponse: (response: ProductResponse) => {
                return response;
            },
            providesTags: ["IProduct"],
            keepUnusedDataFor: 0
        }),
        getProductById: builder.query({
            // query: (id) => `/products/${id}`,
            query: (id) => {
                return {
                    url: "http://localhost:5001/1"
                };
            },
            transformResponse: (response: IProduct) => {
                return response;
            },
            keepUnusedDataFor: 0
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductFilterQuery,
    useSearchProductsQuery
} = productApi;
