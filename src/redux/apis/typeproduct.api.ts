import {BASE_API} from "@/config/api.config";
import {ProductType, ProductTypeResponse} from "@/interfaces/data.type";
import {toQueryString} from "@/utils/createParam";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {url} from "inspector";

export const productTypeApi = createApi({
    reducerPath: "productTypeApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    tagTypes: ["productType"],
    endpoints: (builder) => ({
        getType: builder.query<ProductTypeResponse, any>({
            query: (params) => {
                const url = toQueryString(params);
                console.log("check url product types ::: ", url);
                return {
                    url: `/types?${url}`
                };
            },
            providesTags: ["productType"],
            transformResponse: (response: ProductTypeResponse) => {
                return response as ProductTypeResponse;
            }
        }),
        getAllType: builder.query<ProductType[], void>({
            query: () => {
                return {
                    url: `/types`
                };
            },
            providesTags: ["productType"],
            transformResponse: (response: ProductType[]) => {
                return response as ProductType[];
            }
        })
    })
});

export const {useGetTypeQuery, useGetAllTypeQuery} = productTypeApi;
