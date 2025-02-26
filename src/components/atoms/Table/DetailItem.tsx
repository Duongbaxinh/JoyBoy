import React from "react";

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
    description: string;
    orderNotes: string;
    supplier: string;
};

type Product = {
    id: string;
    name: string;
    // formBuy: string;
    thumbnail: string;
    images: string[];
    info: ProductInfo;
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
        location: "Inteligi",
        description: "Sữa rửa mặt thiên nhiên giúp làm sạch da",
        orderNotes: "Hàng mới về, khuyến mãi 10%",
        supplier: "Công ty TNHH Aragi Việt Nam"
    }
};

function DetailItem() {
    return (
        <div className="px-10 py-2 ">
            <p className="text-[23px] py-4 font-bold capitalize text-text">
                {data.name}
            </p>
            {/* <div className="text-[20px] capitalize text-text">
                {data.formBuy}
            </div> */}
            <div className="grid grid-cols-[250px_53px_600px] gap-4 w-max">
                <div className="pt-2">
                    <img
                        src={data.thumbnail}
                        alt=""
                        className="w-full rounded-sm"
                    />
                </div>
                <div className="  flex flex-col gap-3 pt-2">
                    {data.images.map((image) => (
                        <img
                            src={image}
                            alt=""
                            className="w-[60px] h-[60px] rounded-sm"
                        />
                    ))}
                </div>
                <div className="w-full flex gap-2 text-text">
                    <div className="min-w-[350px] max-w-[370px] px-3">
                        {Object.keys(data.info).map((v) => {
                            const value =
                                data.info[v as keyof typeof data.info];
                            return (
                                <div
                                    key={v}
                                    className="flex gap-2 p-3 border-b-[1px] border-lightGray">
                                    <p className="capitalize   text-[14px] min-w-[100px]">
                                        {v.toString() + ":"}
                                    </p>
                                    <p className="capitalize text-[14px] pl-[40px] text-wrap break-words">
                                        {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-[230px]">
                        <div className="gap-2 p-3 border-b-[1px] border-lightGray">
                            <p className="capitalize   text-[13px] min-w-[100px]">
                                Mo ta
                            </p>
                            <p className="capitalize text-[14px] pl-[40px] text-wrap break-words"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailItem;
