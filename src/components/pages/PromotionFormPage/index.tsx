"use client";

import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import InputForm from "@/components/atoms/InputForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ProductSelected } from "../ProductPage";

// Define interfaces
interface Product {
    id: string;
    brand: string;
    name: string;
    originalPrice: number;
    type: string;
}


interface DiscountProgram {
    id: string;
    name: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
    productIds: string[];
}


export default function PromotionFormPage({ promotionId }: { promotionId: string }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<DiscountProgram>({
        defaultValues: {
            name: "",
            discountPercentage: 0,
            startDate: "",
            endDate: "",
            productIds: [],
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<ProductSelected[]>([]);

    useEffect(() => {
        const storedProducts = sessionStorage.getItem("productSelected");
        if (storedProducts) {
            const products = JSON.parse(storedProducts) as ProductSelected[];
            if (products.length >= 5 && products.length <= 10) {
                setSelectedProducts(products);
            } else {
                toast.error("Vui lòng chọn từ 5 đến 10 sản phẩm!");
                router.push("/products");
            }
        }

    }, [promotionId, setValue, router]);


    const handleRemoveProduct = (productId: string) => {
        const newProducts = selectedProducts.filter((p) => p.id !== productId);
        setSelectedProducts(newProducts);
        setValue("productIds", newProducts.map((p) => p.id));
        if (!promotionId) {
            sessionStorage.setItem("productSelected", JSON.stringify(newProducts));
        }
    };

    const onSubmit = async (data: DiscountProgram) => {
        if (new Date(data.endDate) <= new Date(data.startDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu!");
            return;
        }
        if (data.productIds.length < 5) {
            toast.error("Vui lòng chọn ít nhất 5 sản phẩm!");
            return;
        }
        if (data.productIds.length > 10) {
            toast.error("Không thể chọn quá 10 sản phẩm!");
            return;
        }


    };

    return (
        <ContainerLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">
                    {promotionId ? "Cập nhật chương trình ưu đãi" : "Thêm chương trình ưu đãi"}
                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full bg-white border col-span-1 border-purple-300 rounded p-6"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-purple-800"
                            >
                                Tên chương trình
                            </label>
                            <InputForm
                                register={register("name", {
                                    required: "Tên chương trình là bắt buộc",
                                })}
                                error={errors.name}
                                placeholder="Nhập tên chương trình"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="discountPercentage"
                                className="block text-sm font-medium text-purple-800"
                            >
                                Giảm giá (%)
                            </label>
                            <InputForm
                                register={register("discountPercentage", {
                                    required: "Phần trăm giảm giá là bắt buộc",
                                    min: { value: 0, message: "Phần trăm phải từ 0 đến 100" },
                                    max: { value: 100, message: "Phần trăm phải từ 0 đến 100" },
                                })}
                                error={errors.discountPercentage}
                                type="number"
                                placeholder="Nhập phần trăm giảm giá"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium text-purple-800"
                            >
                                Thời gian bắt đầu
                            </label>
                            <InputForm
                                register={register("startDate", {
                                    required: "Ngày bắt đầu là bắt buộc",
                                })}
                                error={errors.startDate}
                                type="date"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-purple-800"
                            >
                                Thời gian kết thúc
                            </label>
                            <InputForm
                                register={register("endDate", {
                                    required: "Ngày kết thúc là bắt buộc",
                                })}
                                error={errors.endDate}
                                type="date"
                                className="focus:ring-purple-600 focus:border-purple-600"
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-purple-400"
                            >
                                {isSubmitting || isLoading ? "Đang xử lý..." : "Lưu"}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    sessionStorage.removeItem("productSelected");
                                    router.push("/programs");
                                }}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>

                    {/* Right Column: Selected Products */}
                    <div className="w-full col-span-2 bg-white border border-purple-300 rounded p-6">
                        <h2 className="text-lg font-semibold text-purple-800 mb-4">
                            Sản phẩm áp dụng ({selectedProducts.length}/10)
                        </h2>

                        {selectedProducts.length === 0 ? (
                            <p className="text-gray-500 text-center">Không tìm thấy sản phẩm.</p>
                        ) : (
                            <table className="w-full divide-y divide-gray-200 table-auto">
                                <thead className="bg-purple-100 sticky top-0">
                                    <tr>

                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                            Tên sản phẩm
                                        </th>

                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                            Loại
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                                            Giá gốc
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {selectedProducts.map((product) => (
                                        <tr key={product.id}>

                                            <td className="px-4 py-2">{product.product_name}</td>
                                            <td className="px-4 py-2">{product.product_type}</td>
                                            <td className="px-4 py-2">{product.product_price.toLocaleString()} VND</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}