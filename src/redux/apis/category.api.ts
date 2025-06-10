import {BASE_API} from "@/config/api.config";
import {CategoryProduct} from "@/interfaces/data.type";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({baseUrl: BASE_API}),
    tagTypes: ["category"],
    endpoints: (builder) => ({
        getAllCategory: builder.query<CategoryProduct[], void>({
            query: () => `/categories`,
            providesTags: ["category"]
        })
    })
});

export const {useGetAllCategoryQuery} = categoryApi;
