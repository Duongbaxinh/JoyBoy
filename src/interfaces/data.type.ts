import {ShippingAddress, UserProfileType} from "./auth.type";

export type ProductResponse = {
    results: IProduct[];
    limitnumber: number;
    page: number;
    page_size: number;
    number_page: number;
    count: number;
};

type IProduct = {
    id?: string;
    product_thumbnail: string;
    product_brand: string;
    product_name: string;
    product_price: number | string;
    product_discount: boolean | null | number;
    product_category: string;
    product_made: string;
    product_discountType: boolean | null;
    product_discount_start: number | null | string;
    product_discount_end: number | null | string;
    product_sold: number;
    product_international: boolean;
    product_rate: number;
    product_ingredient: string;
    product_description: string;
    product_stock_quantity: number | string;
    created_at: string;
    updated_at: string;
    images: string[];
};

export type OrderUser = {
    user_id: number;
    user_name: string;
    user_address: string;
};

export type OrderStorage = {
    order_quantity: number;
    order_total_price: number;
    order_discount: number;
    order_final_price: number;
    order_shipping: number;
    order_expected_delivery_time: string; // ISO format datetime string
    order_user: {
        user_id: number;
        user_name: string;
        user_address: string;
    };
    order_products: {
        id: number | undefined; // nếu có thể là undefined, nếu không thì chỉ để number
        product_price: number | undefined;
        product_thumbnail: string | undefined;
        product_name: string | undefined;
        product_quantity: number;
        product_total_price: number | undefined;
        product_discount: number;
    }[];
};

export type OrderProduct = {
    id: string;
    product_name: string;
    product_price: number;
    product_thumbnail: string;
    quantity: number;
    created_at?: string;
    updated_at?: string;
};

export type OrderCheckout = {
    order_id: string;
    order_quantity: number;
    order_total_price: number;
    order_discount: number;
    order_code_discount: string;
    order_final_price: number;
    order_shipping: number;
    order_shippingAddress: ShippingAddress;
    order_paid: boolean;
    order_amount_paid: number;
    order_amount_rest: number;
    order_payment_method: "CASH" | "CARD";
    order_discount_shipping: number;
    order_expected_delivery_time: Date;
    order_user: OrderUser;
    order_products: OrderProduct[];
};

export type OrderType = {
    id: string;
    user: UserProfileType;
    status:
        | "pending"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "cancelled"
        | "confirmed";
    total_price: number;
    shipping_address: ShippingAddress;
    order_details: OrderProduct[];
    created_at: string;
    updated_at: string;
};

export type OrderDetailType = {
    product_id: string;
    order_id: string;
    quantity: number;
};
export type OrderItemDisplayType = {
    id: string;
    product_name: string;
    product_price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
};

export type OrderResponse = {
    id: string;
    user: UserProfileType;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    shipping_address: ShippingAddress;
    order_details: OrderProduct[];
    total_price: number;
    created_at: string;
    updated_at: string;
};

export type CategoryFilter = {
    key: string;
    title: string;
};

export type BranchType = {
    id: number;
    product_image: string;
    logo_image: string;
    title: string;
    discount: string;
};
