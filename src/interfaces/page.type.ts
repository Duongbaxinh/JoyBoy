export type Props = {
    params: Promise<{
        product_slug: string;
        order_id: string;
        category_key: string;
        text_search: string;
    }>;
    searchParams: Promise<{
        token: string;
        promotionId: string;
    }>;
};
