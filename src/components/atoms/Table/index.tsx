import React from 'react';
import { formatPrice } from '@/utils';

// Define and export the RawProduct interface
export interface RawProduct {
    id: string;
    product_name: string;
    product_price: number;
    product_thumbnail: string;
    product_images: string[];
    product_type: string;
    product_brand: string;
    product_category: string;
    product_made: string;
    product_discount: boolean;
    product_discount_start: string;
    product_discount_end: string;
    product_sold: number;
    product_international: boolean;
    product_rate: number;
    product_ingredient: string;
}

// Define the props interface for ProductTable
interface ProductTableProps {
    products: RawProduct[];
    productLabels: { key: string; label: string }[];
}

// ProductTable component
const ProductTable: React.FC<ProductTableProps> = ({ products, productLabels }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {productLabels.map((label) => (
                            <th
                                key={label.key}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {label.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                        <tr key={`${index}-${product.product_name}`}>
                            {productLabels.map((label) => (
                                <td
                                    key={`${index}-${product.product_name}-${label.key}`}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {label.key === 'product_price' ? (
                                        formatPrice(product.product_price)
                                    ) : label.key === 'product_discount' ? (
                                        product.product_discount ? 'Có' : 'Không'
                                    ) : label.key === 'product_images' ? (
                                        product.product_images.length > 0
                                            ? product.product_images.join(', ')
                                            : 'Không có'
                                    ) : label.key === 'product_international' ? (
                                        product.product_international ? 'Có' : 'Không'
                                    ) : (
                                        product[label.key as keyof RawProduct]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable