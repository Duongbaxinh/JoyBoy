"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { convertEmptyStringToNull } from "@/utils/converStringEmptyToNull";
import { toast } from "react-toastify";
import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import { useState, useEffect } from "react";
import { useUpdateProductMutation, useUpdateProductImagesMutation, useCreateProductImagesMutation } from "@/redux/apis/manageproduct.api";

import ProductForm from "@/components/molecules/ProductForm";
import ImageUploader from "@/components/molecules/ImageUploader";
import Image from "next/image";
import { IoCloseCircle } from "react-icons/io5";
import { useGetProductByIdQuery } from "@/redux/apis/product.api";
import { ProductFormData } from "@/interfaces/form.type";
import { ImageProduct } from "@/interfaces/data.type";

interface UpdateProductPageProps {
    productSlug: string;
}

export default function UpdateProductPage({ productSlug }: UpdateProductPageProps) {
    const router = useRouter();
    const { data: product, isLoading, error: productError } = useGetProductByIdQuery(productSlug);
    const [updateProduct, { isLoading: isUpdatingProduct }] = useUpdateProductMutation();
    const [createImageProduct, { isLoading: isUpdatingImages }] = useCreateProductImagesMutation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProductFormData>({
        defaultValues: {},
    });

    // Cập nhật defaultValues khi dữ liệu sản phẩm được tải
    useEffect(() => {
        if (product) {
            reset({
                product_name: product.product_name || "",
                product_price: product.product_price || 0,
                product_brand_id: product.product_brand?.title || "",
                product_type_id: product.product_type?.title || "",
                product_made: product.product_made || "",
                product_stock_quantity: product.product_stock_quantity || 0,
                product_expiration_date: product.product_expiration_date
                    ? new Date(product.product_expiration_date).toISOString().split("T")[0]
                    : "",
                product_promotion_id: product.product_promotion?.title || "",
                product_international: product.product_international || false,
                product_discount: product.product_discount || false,
                product_discount_percent: product.product_promotion?.discount_percent || 0,
                product_discount_start: product.product_discount_start
                    ? new Date(product.product_discount_start).toISOString().split("T")[0]
                    : "",
                product_discount_end: product.product_discount_end
                    ? new Date(product.product_discount_end).toISOString().split("T")[0]
                    : "",
                product_ingredient: product.product_ingredient || "",
                product_description: product.product_description || "",
                product_thumbnail: product.product_thumbnail || "",
            });

            setPreviewImage(product.product_thumbnail || null);
            setUploadedImages(product.product_images?.map((img: ImageProduct) => img.image_url) || []);
        }
    }, [product, reset]);

    const onSubmit = async (data: ProductFormData) => {

        console.log("check hahahaha222", previewImage)
        console.log("check hahahaha333", uploadedImages)
        if (!product?.product_slug) {
            toast.error("Không tìm thấy sản phẩm để cập nhật!");
            return;
        }

        try {
            const productData = convertEmptyStringToNull({
                ...data,
                product_thumbnail: previewImage || data.product_thumbnail,
            });

            const imageData: ImageProduct[] = uploadedImages.map((image) => ({
                product_id: productData.product_name,
                image_url: image,
                alt_text: productData.product_name,
            }));

            await updateProduct({ product: productData, product_slug: product.product_slug }).unwrap();
            await createImageProduct(imageData).unwrap();
            toast.success("Cập nhật sản phẩm thành công!");
            router.push("/product/category");
        } catch (error: any) {
            toast.error(error?.data?.message || "Lỗi khi cập nhật sản phẩm");
        }
    };


    const handleRemoveImage = (index: number) => {
        setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    };

    if (isLoading) return <div className="text-center">Đang tải...</div>;
    if (productError) return <div className="text-center text-red-500">Lỗi khi tải sản phẩm!</div>;

    return (
        <ContainerLayout>
            <div className="container mx-auto p-4 text-black">
                <h1 className="text-2xl font-bold mb-4 text-purple-800">Cập nhật sản phẩm</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 border border-purple-300 rounded p-4">
                        <div className="w-full md:w-2/3 bg-white p-4 rounded">
                            <ProductForm control={control} register={register} errors={errors} />
                        </div>
                        <div className="flex flex-col items-center bg-white p-4 rounded">
                            {/* Thumbnail */}
                            <ImageUploader
                                onImagesUploaded={(urls) => setPreviewImage(urls[0])}
                                isThumbnail={true}
                                initialImage={previewImage}
                            />
                            {/* Gallery */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {uploadedImages.map((img, index) => (
                                    <div key={index} className="relative w-16 h-16 border-2 border-gray-300 rounded">
                                        <Image
                                            src={img}
                                            alt={`Uploaded ${index}`}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 text-red-500"
                                        >
                                            <IoCloseCircle size={20} />
                                        </button>
                                    </div>
                                ))}
                                <ImageUploader
                                    onImagesUploaded={(urls) => setUploadedImages((prev) => [...prev, ...urls])}
                                    maxFiles={5 - uploadedImages.length}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isUpdatingProduct || isUpdatingImages}
                        className={`mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 ${isUpdatingProduct || isUpdatingImages ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {isUpdatingProduct || isUpdatingImages ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
                    </button>
                </form>
            </div>
        </ContainerLayout>
    );
}