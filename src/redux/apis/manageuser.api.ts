import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "@/interfaces/auth.type";
import {customFetchBaseQuery} from "../customeBaseQuery";

interface GetUsersQueryParams {
    role?: "customer" | "seller";
    is_active?: boolean;
    search?: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customFetchBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], GetUsersQueryParams>({
            query: ({role, is_active, search}) => {
                const params = new URLSearchParams();
                if (role) params.append("role", role);
                if (is_active !== undefined)
                    params.append("is_active", is_active.toString());
                if (search) params.append("search", search);
                return `/users?${params.toString()}`;
            },
            providesTags: ["User"]
        }),
        updateUser: builder.mutation<User, Partial<User> & {id: string}>({
            query: ({id, ...updates}) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: updates
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const {useGetAllUsersQuery, useUpdateUserMutation} = userApi;
