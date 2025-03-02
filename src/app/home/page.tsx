"use client";

import React, {useState, FormEvent} from "react";
import axios from "axios";

interface ProductFormData {
    code: string;
    customerCode: string;
    name: string;
    category: string;
    brand: string;
    price: number;
    quantity: number;
    position: string;
    images: File[];
}

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        code: "",
        customerCode: "",
        name: "",
        category: "",
        brand: "",
        price: 0,
        quantity: 0,
        position: "",
        images: []
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                images: []
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        data.append("code", formData.code);
        data.append("customerCode", formData.customerCode);
        data.append("name", formData.name);
        data.append("category", formData.category);
        data.append("brand", formData.brand);
        data.append("price", formData.price.toString());
        data.append("quantity", formData.quantity.toString());
        data.append("position", formData.position);
        formData.images.forEach((image) => data.append("images", image));

        try {
            const response = await axios.post("YOUR_API_ENDPOINT", data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Product created:", response.data);
            alert("Product created successfully!");
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Thêm hàng</h2>

            {/* Thông tin Section */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold border-b-2 border-green-500 inline-block">
                    Thông tin
                </h3>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Mã hàng */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Mã hàng
                        </label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Mã khách hàng tự động */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Mã khách hàng tự động
                        </label>
                        <input
                            type="text"
                            name="customerCode"
                            value={formData.customerCode}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Tên hàng */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Tên hàng
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Nhóm hàng */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Nhóm hàng
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500">
                            <option value="">---Lựa chọn---</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                        </select>
                    </div>

                    {/* Thương hiệu */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Thương hiệu
                        </label>
                        <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500">
                            <option value="">---Chọn thương hiệu---</option>
                            <option value="brand1">Brand 1</option>
                            <option value="brand2">Brand 2</option>
                        </select>
                    </div>

                    {/* Bán trực tiếp */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            name="directSale"
                            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                            Bán trực tiếp
                        </label>
                    </div>

                    {/* Giá vốn */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Giá vốn
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Giá bán */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Giá bán
                        </label>
                        <input
                            type="number"
                            disabled
                            value={0}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>

                    {/* Tồn kho */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Tồn kho
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Trọng lượng */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Trọng lượng (g)
                        </label>
                        <input
                            type="number"
                            disabled
                            value={0}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                        />
                    </div>

                    {/* Vị trí */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Vị trí
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Hình ảnh
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, index) => (
                            <div
                                key={index}
                                className="border border-dashed border-gray-300 h-24 flex items-center justify-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id={`image-upload-${index}`}
                                />
                                <label
                                    htmlFor={`image-upload-${index}`}
                                    className="cursor-pointer text-gray-500">
                                    {formData.images[index] ? (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.images[index]
                                            )}
                                            alt="Preview"
                                            className="h-20 w-20 object-cover"
                                        />
                                    ) : (
                                        <span>Upload</span>
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Thuộc tính */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Thuộc tính
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500">
                        <option>---Chọn thuộc tính---</option>
                    </select>
                </div>

                {/* Đơn vị tính */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Đơn vị tính
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500">
                        <option>---Chọn đơn vị---</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        Bỏ qua
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Lưu
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Lưu & Thêm mới
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Lưu & Sao chép
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
