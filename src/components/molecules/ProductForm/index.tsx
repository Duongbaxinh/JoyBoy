"use client";
import FileUpload from '@/components/atoms/FileUpload';
import Input, { Variant } from '@/components/atoms/Input';
import Popup from '@/components/atoms/Popup';
import { useForm } from 'react-hook-form';

type ProductFormData = {
    product_name: string;
    product_brand: string;
    product_type: string;
    product_thumbnail: string;
    product_images: number;
    product_made: number;
    product_discount: string;
    product_discount_start: string;
    product_discount_end: string;
    product_international: boolean;
    product_ingredient: string;
    product_description: string;
    product_stock_quantity: number;
    product_expiration_date: string;
};

export default function ProductForm() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormData>({
        defaultValues: {
            product_name: "",
            product_brand: "",
            product_type: "",
            product_thumbnail: "",
            product_images: 0,
            product_made: 0,
            product_discount: "",
            product_discount_start: "",
            product_discount_end: "",
            product_international: false,
            product_ingredient: "",
            product_description: "",
            product_stock_quantity: 0,
            product_expiration_date: "",
        },
    });

    const onSubmit = (data: ProductFormData) => {
        console.log('Form data:', data);
    };

    const handleChangeFile = (e: any) => {
        console.log('check file :::: ', e.target.files)
    }
    return (
        <Popup isOpen={true}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[1000px] mx-auto flex flex-col gap-4 p-4">
                <h2 className="text-2xl font-bold">Thêm Sản Phẩm</h2>

                <div>
                    <label className="block font-medium text-gray-700">Tên sản phẩm</label>
                    <Input
                        nameInput="product_name"
                        placeholder="Nhập tên sản phẩm"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_name", { required: "Tên sản phẩm là bắt buộc" }) }}
                    />
                    {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Thương hiệu</label>
                    <Input
                        nameInput="product_brand"
                        placeholder="Nhập thương hiệu"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_brand", { required: "Thương hiệu là bắt buộc" }) }}
                    />
                    {errors.product_brand && <p className="text-red-500 text-sm mt-1">{errors.product_brand.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Loại sản phẩm</label>
                    <Input
                        nameInput="product_type"
                        placeholder="Nhập loại sản phẩm"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_type", { required: "Loại sản phẩm là bắt buộc" }) }}
                    />
                    {errors.product_type && <p className="text-red-500 text-sm mt-1">{errors.product_type.message}</p>}
                </div>


                <div>
                    <label className="block font-medium text-gray-700">Hình ảnh sản phẩm (tối đa 5)</label>
                    <input type='file' onChange={handleChangeFile} />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Năm sản xuất</label>
                    <Input
                        nameInput="product_made"
                        type="number"
                        placeholder="Nhập năm sản xuất"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_made", { required: "Năm sản xuất là bắt buộc", min: { value: 1900, message: "Năm phải lớn hơn 1900" } }) }}
                    />
                    {errors.product_made && <p className="text-red-500 text-sm mt-1">{errors.product_made.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Giảm giá</label>
                    <Input
                        nameInput="product_discount"
                        placeholder="Nhập phần trăm giảm giá"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_discount", { required: "Giảm giá là bắt buộc", pattern: { value: /^\d+(\.\d{1,2})?$/, message: "Phải là số hợp lệ (ví dụ: 10 hoặc 10.5)" } }) }}
                    />
                    {errors.product_discount && <p className="text-red-500 text-sm mt-1">{errors.product_discount.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Ngày bắt đầu giảm giá</label>
                    <Input
                        nameInput="product_discount_start"
                        type="date"
                        placeholder="Chọn ngày bắt đầu"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_discount_start", { required: "Ngày bắt đầu là bắt buộc" }) }}
                    />
                    {errors.product_discount_start && <p className="text-red-500 text-sm mt-1">{errors.product_discount_start.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Ngày kết thúc giảm giá</label>
                    <Input
                        nameInput="product_discount_end"
                        type="date"
                        placeholder="Chọn ngày kết thúc"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_discount_end", { required: "Ngày kết thúc là bắt buộc" }) }}
                    />
                    {errors.product_discount_end && <p className="text-red-500 text-sm mt-1">{errors.product_discount_end.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Sản phẩm quốc tế</label>
                    <Input
                        nameInput="product_international"
                        type="checkbox"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_international") }}
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Thành phần</label>
                    <Input
                        nameInput="product_ingredient"
                        placeholder="Nhập thành phần"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_ingredient", { required: "Thành phần là bắt buộc" }) }}
                    />
                    {errors.product_ingredient && <p className="text-red-500 text-sm mt-1">{errors.product_ingredient.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Mô tả</label>
                    <Input
                        nameInput="product_description"
                        placeholder="Nhập mô tả"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_description", { required: "Mô tả là bắt buộc" }) }}
                    />
                    {errors.product_description && <p className="text-red-500 text-sm mt-1">{errors.product_description.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Số lượng tồn kho</label>
                    <Input
                        nameInput="product_stock_quantity"
                        type="number"
                        placeholder="Nhập số lượng tồn kho"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_stock_quantity", { required: "Số lượng tồn kho là bắt buộc", min: { value: 0, message: "Phải lớn hơn hoặc bằng 0" } }) }}
                    />
                    {errors.product_stock_quantity && <p className="text-red-500 text-sm mt-1">{errors.product_stock_quantity.message}</p>}
                </div>

                <div>
                    <label className="block font-medium text-gray-700">Ngày hết hạn</label>
                    <Input
                        nameInput="product_expiration_date"
                        type="date"
                        placeholder="Chọn ngày hết hạn"
                        variant={Variant.OUTLINE}
                        resInput={{ ...register("product_expiration_date", { required: "Ngày hết hạn là bắt buộc" }) }}
                    />
                    {errors.product_expiration_date && <p className="text-red-500 text-sm mt-1">{errors.product_expiration_date.message}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
                    Lưu sản phẩm
                </button>
            </form>
        </Popup>
    );
}