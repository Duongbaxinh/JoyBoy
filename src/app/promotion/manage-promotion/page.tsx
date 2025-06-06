import PromotionFormPage from '@/components/pages/PromotionFormPage';
import { Props } from '@/interfaces/page.type';
import React from 'react';

async function page({ searchParams }: Props) {
    const { promotionId } = await searchParams
    return (
        <PromotionFormPage promotionId={promotionId} />
    );
}

export default page;