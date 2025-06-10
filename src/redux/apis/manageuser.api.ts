import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {User} from "@/interfaces/auth.type";
import {customFetchBaseQuery} from "../customeBaseQuery";
import { status } from '../../consts/index';

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customFetchBaseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], String>({
            query: (paramstring) => {
                return `/users?${paramstring.toString()}`;
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
        }),
        approval_vendor: builder.mutation<string, {vendor_id:string, status:string}>({
            query: (payload) => ({
                url : '/vendors/approval',
                method: "POST",
                body: payload
            })
        })
    })
});

export const {useGetAllUsersQuery, useUpdateUserMutation, useApproval_vendorMutation} = userApi;
