import {BASE_API} from "@/config/api.config";
import {BrandType, BrandTypeResponse} from "@/interfaces/data.type";
import {toQueryString} from "@/utils/createParam";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
    reducerPath: "brandApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    endpoints: (builder) => ({
        getBrands: builder.query<BrandTypeResponse, any>({
            query: (params) => `/brands?${toQueryString(params)}`
        }),
        getAllBrand: builder.query<BrandType[], void>({
            query: () => `/brands`
        })
    })
});

export const {useGetBrandsQuery, useGetAllBrandQuery} = brandApi;
