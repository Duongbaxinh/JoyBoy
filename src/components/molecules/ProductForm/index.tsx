// src/components/ProductForm.tsx
import { useGetBrandsQuery } from "@/redux/apis/brand.api";
import { useGetAllTypeQuery } from "@/redux/apis/typeproduct.api";
import { useGetAllPromotionQuery } from "@/redux/apis/promotion.api";
import { Control, useController } from "react-hook-form";
import { ProductFormData } from "@/interfaces/form.type";

interface ProductFormProps {
    control: Control<any>;
    register: any;
    errors: any;
    index?: number;
    prefix?: string;
}

export default function ProductForm({ control, register, errors, index, prefix = "" }: ProductFormProps) {
    const { data: productTypes } = useGetAllTypeQuery();
    const { data: brands } = useGetBrandsQuery();
    const { data: promotions } = useGetAllPromotionQuery();
    const { field: discountField } = useController({
        control,
        name: `${prefix}product_discount`,
    });

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                    type="text"
                    {...register(`${prefix}product_name`, { required: "Tên sản phẩm là bắt buộc" })}
                    className="mt-1 p-2 w-full border border-purple-300 rounded"
                    placeholder="Nhập tên sản phẩm"
                />
                {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>}
            </div>
            {/* Các trường khác: giá, thương hiệu, loại sản phẩm, v.v. */}
            <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">Giảm giá</label>
                <input
                    type="checkbox"
                    {...register(`${prefix}product_discount`)}
                    className="mt-1 h-5 w-5 text-purple-600"
                />
            </div>
            {discountField.value && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phần trăm giảm giá</label>
                        <input
                            type="number"
                            {...register(`${prefix}product_discount_percent`, { required: "Phần trăm giảm giá là bắt buộc", min: 0, max: 100 })}
                            className="mt-1 p-2 w-full border border-purple-300 rounded"
                            placeholder="Nhập phần trăm"
                        />
                        {errors.product_discount_percent && <p className="text-red-500 text-sm mt- Wales1">{errors.product_discount_percent.message}</p>}
                    </div>
                    {/* Các trường ngày bắt đầu, kết thúc */}
                </>
            )}
            {/* Thêm các trường khác tương tự */}
        </div>
    );
}