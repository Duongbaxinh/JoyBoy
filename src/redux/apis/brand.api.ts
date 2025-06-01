import {BranchType} from "@/interfaces/data.type";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
    reducerPath: "brandApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    endpoints: (builder) => ({
        getBrands: builder.query<BranchType[], void>({
            query: () => "/brands"
        })
    })
});

export const {useGetBrandsQuery} = brandApi;
