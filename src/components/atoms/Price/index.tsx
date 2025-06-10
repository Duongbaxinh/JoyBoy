'use client'

import React from "react";

type PriceProps = {
    product_price: number | string,
    className?: string
}

const Price: React.FC<PriceProps> = ({ product_price, className }) => {
    return (
        <div className={`flex ${className} `}>
            <span className={`text-[13px] font-semibold ${className}`}>
                {Number(product_price).toLocaleString("vi-VN")}
            </span>
            <sub>
                <sup className={`text-xs ${className}`}>đ</sup>
            </sub>
        </div>
    );
};

export default Price;
