import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {BASE_API, LOGIN_API} from "@/config/api.config";
import {AuthDataLogin} from "../../interfaces/auth.type";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API
});

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery,
    endpoints: (builder) => ({
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

export const {useLoginMutation} = authApi;
