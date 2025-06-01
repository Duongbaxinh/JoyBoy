import {BASE_API, ORDER_API} from "@/config/api.config";
import {OrderResponse, OrderType} from "@/interfaces/data.type";

import {toQueryString} from "@/utils/createParam";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const orderProductApi = createApi({
    reducerPath: "orderProductApi",
    tagTypes: ["order"],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${JSON.parse(token ?? "")}`
                );
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        getAllOrder: builder.query<OrderResponse[], string>({
            query: (params: any) => {
                const queryString = toQueryString(params);
                const url = `/orders?${queryString}`;
                return {
                    url: url
                };
            },
            transformResponse: (response: OrderResponse[]) => {
                return response;
            },
            keepUnusedDataFor: 0
        }),
        getOrderDetail: builder.query<OrderResponse, string>({
            query: (order_id: string) => {
                const url = `${ORDER_API}/${order_id}`;
                return {
                    url: url
                };
            },
            transformResponse: (response: OrderResponse) => {
                return response;
            },
            keepUnusedDataFor: 0
        }),

        cancelOrder: builder.mutation<
            OrderType,
            {status: string; orderId: string}
        >({
            query: ({status, orderId}) => ({
                url: `${ORDER_API}/${orderId}`,
                method: "PUT",
                body: {status: status}
            }),
            invalidatesTags: ["order"],
            transformResponse: (response: OrderType) => {
                return response;
            }
        })
    })
});

export const {
    useGetAllOrderQuery,
    useGetOrderDetailQuery,
    useCancelOrderMutation
} = orderProductApi;
