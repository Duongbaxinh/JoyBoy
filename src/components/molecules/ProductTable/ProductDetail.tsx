
import { UPDATE_PRODUCT_URL } from "@/config/router.config";
import { useProduct } from "@/contexts/product.context";
import { IProduct } from "@/interfaces/data.type";
import { useDeleteProductMutation } from "@/redux/apis/manageproduct.api";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";
import Button from "../../atoms/Button";
import IconButton from "../../atoms/IconButton";

type StockLimit = {
    min: number;
    max: number;
};

type ProductInfo = {
    productCode: string;
    barcode: string;
    category: string;
    type: string;
    brand: string;
    stockLimit: any;
    price: number;
    costPrice: number;
    weight: string;
    location: string;
};

type Product = {
    id: string;
    name: string;
    // formBuy: string;
    thumbnail: string;
    images: string[];
    info: ProductInfo;
    description: string;
    orderNotes: string;
    supplier: string[];
};
const data: Product = {
    id: "1",
    name: "Nước hoa Incredible Me",
    // formBuy: "type product",
    thumbnail:
        "https://res.cloudinary.com/dwu92ycra/image/upload/v1739410231/POP/download_qamcv3.jpg",
    images: [
        "https://res.cloudinary.com/dwu92ycra/image/upload/v1739410231/POP/download_qamcv3.jpg",
        "https://res.cloudinary.com/dwu92ycra/image/upload/v1709742916/Ellipse_aieufp.png",
        "https://res.cloudinary.com/dwu92ycra/image/upload/v1710823495/learn_nodejs_sequelize/klevajnvzccmensruvqf.png"
    ],
    info: {
        productCode: "SP000004",
        barcode: "8938505970014",
        category: "Mỹ phẩm",
        type: "Hàng hóa",
        brand: "Aragi",
        stockLimit: 100,
        price: 13000,
        costPrice: 10000,
        weight: "100 g",
        location: "Inteligi"
    },
    description: "Sữa rửa mặt thiên nhiên giúp làm sạch da",
    orderNotes: "Hàng mới về, khuyến mãi 10%",
    supplier: ["Công ty TNHH Aragi Việt Nam"]
};

function DetailItem({ product, setIsDetail, setDetailItem }: {
    product: IProduct,
    setIsDetail: Dispatch<SetStateAction<boolean>>,
    setDetailItem: Dispatch<SetStateAction<string>>,
}) {
    const [imageDisplay, setImageDisplay] = useState("")
    const { refetch } = useProduct()
    const [deleteProduct, { isLoading: isDeleteProduct, error: errorDeleteProduct }] = useDeleteProductMutation()
    const handleImageDisplay = (image: string) => {
        setImageDisplay(image);
    };
    const handleDeleteProduct = async (slug: string) => {
        try {
            if (!slug) return toast.error("Đã có lỗi xảy ra")
            await deleteProduct(slug).unwrap()
            await refetch()
            toast.success("Sản phẩm đã được xóa")
        } catch (error) {
            toast.error("ddax co loi xay ra")
            console.log("check error ", error)
        }
    }
    const setClose = () => {
        setIsDetail(false)
        setDetailItem("")
    }
    if (!product) return <h1>Loading</h1>;
    return (
        <div className="relative px-2 py-2 w-full max-w-[1080px]  lg:h-full   border border-blue-300 overflow-hidden rounded-md ">
            <IconButton className="absolute right-0 top-0 bg-transparent hover:!bg-transparent text-black bg-black " icon={<IoCloseCircle className="text-black" />} onFC={setClose} />
            <div className="w-full space-y-5 h-fit mb-[60px] ">
                <div className="grid grid-cols-8 gap-4 w-full  ">
                    <div className="pt-2 col-span-3  ">
                        <Image
                            src={(imageDisplay && imageDisplay.startsWith('http') ? imageDisplay : product.product_thumbnail) ?? "/images/product.png"}
                            alt=""
                            className="rounded-md shadow-md object-cover !w-full !h-auto"
                            width={350} height={350}
                        />
                    </div>
                    <div className=" col-span-1 flex flex-col gap-3 pt-2  overflow-y-scroll max-h-[390px] no-scrollbar">
                        {product.product_images.map((image, index: number) => (
                            <Image
                                onClick={() => handleImageDisplay(image.image_url)}
                                key={index}
                                src={image.image_url && image.image_url.startsWith('http') ? image.image_url : "/images/product.png"}
                                alt=""
                                width={60}
                                height={60}
                                className="w-full h-auto rounded-sm"
                            />
                        ))}
                    </div>
                    <div className="w-full col-span-4 gap-10 text-text space-y-3">
                        <h1 className=" text-[20px] font-[700] leading-[26px]"> {product.product_name}</h1>
                        <div className="grid grid-cols-2">
                            <p>Thương hiệu: </p>  <p className="text-[14px]  leading-5 "> {`${product.product_brand?.title}`}</p>
                            {/* <p>Danh mục sản phẩm: </p> <p className="text-[14px]  leading-5 "> {`${product.product_type?.}`}</p> */}
                            <p>Loại sản phẩm: </p><p className="text-[14px]  leading-5 "> {`${product.product_type?.title}`}</p>
                            <p>Xuất xứ: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_made}`}</p>
                            <p>Số lượng đã bán: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_sold}`}</p>
                            <p>Tồn kho: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_stock_quantity}`}</p>
                            <p>Hạn sử dụng: </p><p className=" text-[14px]  leading-[26px]">  {`${product.product_discount_end}`}</p>
                        </div>
                    </div>
                </div>
                {product.product_description && (
                    <>
                        <h1 className=" text-[20px] font-[700] leading-[26px]">Mô tả sản phẩm</h1>
                        <p className=" text-[13px]  leading-[26px] w-full break-words "> {product.product_description}</p></>
                )}
                {product.product_ingredient && (
                    <>
                        <h1 className=" text-[20px] font-[700] leading-[26px]">Thành phần</h1>
                        <p className=" text-[13px]  leading-[26px] w-full break-words "> {product.product_ingredient}</p></>
                )}
            </div>
            <div className="absolute bottom-0 right-0 px-3 py-2 w-full flex justify-end gap-10 bg-pink-50 h-[60px]">
                <Link href={`${UPDATE_PRODUCT_URL}/${product.product_slug}`}
                    className="flex items-center text-white px-4 h-full !rounded-md !bg-red-400"
                >Chỉnh sửa </Link>
                <Button label={`${isDeleteProduct ? "Đang xóa..." : "Xóa sản phẩm"}`} onAction={() => { handleDeleteProduct(product.product_slug) }} className="px-4 h-full !rounded-md !bg-red-400" />
            </div>
        </div>
    );
}

export default DetailItem;
