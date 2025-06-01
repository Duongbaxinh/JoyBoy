export interface IProduct {
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
}
