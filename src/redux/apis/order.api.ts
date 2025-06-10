import {OrderResponse} from "@/interfaces/data.type";
import {createApi} from "@reduxjs/toolkit/query/react";
import {customFetchBaseQuery} from "../customeBaseQuery";
import {ORDER_API} from "@/config/api.config";
import {status} from "@/consts";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: customFetchBaseQuery,
    tagTypes: ["order"],
    endpoints: (builder) => ({
        getOrders: builder.query<OrderResponse[], void>({
            query: () => "/orders"
        }),
        updateStatusOrder: builder.mutation<
            OrderResponse,
            {status: string; orderId: string}
        >({
            query: ({status, orderId}) => ({
                url: `${ORDER_API}/${orderId}`,
                method: "PUT",
                body: {status: status}
            }),
            invalidatesTags: ["order"],
            transformResponse: (response: OrderResponse) => {
                return response;
            }
        })
    })
});

export const {useGetOrdersQuery, useUpdateStatusOrderMutation} = orderApi;
