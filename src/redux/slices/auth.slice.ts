import {AuthDataLogin, UserProfileType} from "@/interfaces/auth.type";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BASE_API, LOGIN_API, PROFILE_API} from "@/config/api.config";
import {customFetchBaseQuery} from "../customeBaseQuery";

// Base query không có token (cho login, register, update,...)
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API
});

// Base query có token (chỉ dùng cho getUser)
const baseQueryWithToken = fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            headers.set("Authorization", `Bearer ${JSON.parse(token ?? "")}`);
        }
        return headers;
    }
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
        getUser: builder.query<UserProfileType, void>({
            queryFn: async (arg, api, extraOptions) => {
                const result = await customFetchBaseQuery(
                    PROFILE_API,
                    api,
                    extraOptions
                );
                return {
                    data: result.data as UserProfileType
                };
            }
        }),
        login: builder.mutation({
            query: (credentials: AuthDataLogin) => ({
                url: LOGIN_API,
                method: "POST",
                body: credentials
            }),
            transformResponse: (response: any) => {
                console.log("check response ", response);
                return response;
            }
        })
    })
});

export const {useGetUserQuery, useLoginMutation} = authApi;
