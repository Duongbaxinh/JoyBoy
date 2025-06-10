import UpdateProductPage from '@/components/pages/UpdateProductPage';
import { Props } from '@/interfaces/page.type';
import React from 'react';


async function page({ params }: Props) {
    const { product_slug } = await params
    return (
        <UpdateProductPage productSlug={product_slug} />
    );
}

export default page;