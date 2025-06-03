// src/components/UpdateProductPage.tsx
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { convertEmptyStringToNull } from "@/utils/converStringEmptyToNull";
import { toast } from "react-toastify";
import ContainerLayout from "@/app/ContainerLayout/page";

import { useState } from "react";
import { useGetProductByIdQuery } from "@/redux/apis/product.api";
import { useCreateProductImagesMutation } from "@/redux/apis/manageproduct.api";
import { ProductFormData } from "@/interfaces/form.type";
import { ImageProduct } from "@/interfaces";
import ProductForm from "@/components/molecules/ProductForm";
import ImageUploader from "@/components/molecules/ImageUploader";

interface UpdateProductPageProps {
    productId: string;
}

export default function UpdateProductPage({ productId }: UpdateProductPageProps) {
    const router = useRouter();
    const { data: product, isLoading } = useGetProductByIdQuery(productId);
    // const [updateProduct] = useUpdateProductMutation();
    const [updateProductImages] = useCreateProductImagesMutation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const { register, handleSubmit, control, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: product as unknown as ProductFormData || {},
    });

    const onSubmit = async (data: ProductFormData) => {
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

            // await updateProduct(productData).unwrap();
            await updateProductImages(imageData).unwrap();
            toast.success("Cập nhật sản phẩm thành công!");
            router.push("/products");
        } catch (error) {
            toast.error("Lỗi khi cập nhật sản phẩm");
        }
    };

    if (isLoading) return <div>Loading...</div>;

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
                            <ImageUploader
                                onImagesUploaded={(urls) => setPreviewImage(urls[0])}
                                isThumbnail={true}
                            />
                            <ImageUploader
                                onImagesUploaded={(urls) => setUploadedImages((prev) => [...prev, ...urls])}
                                maxFiles={5}
                            />
                        </div>
                    </div>
                    <button type="submit" className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                        Cập nhật sản phẩm
                    </button>
                </form>
            </div>
        </ContainerLayout>
    );
}