export type ProductFormData = {
    product_name: string;
    product_price: string;
    product_thumbnail: string;
    product_type_id: string;
    product_brand_id: string;
    product_made: string;
    product_discount: boolean;
    product_discount_percent: number;
    product_discount_start: string | null;
    product_discount_end: string | null;
    product_promotion_id: string;
    product_international: boolean;
    product_description: string;
    product_ingredient: string;
    product_stock_quantity: number;
    product_expiration_date: string;
};
