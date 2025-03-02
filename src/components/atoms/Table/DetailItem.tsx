import React, {useState} from "react";

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

function DetailItem({dataItem}: any) {
    const [imageDisplay, setImageDisplay] = useState("");
    const handleImageDisplay = (image: string) => {
        setImageDisplay(image);
    };
    if (!dataItem) return <h1>Loading</h1>;
    console.log(dataItem);
    return (
        <div className="px-10 py-2 w-max h-[800px]  ">
            <p className="text-[23px] py-4 font-bold capitalize text-text">
                {dataItem.name}
            </p>

            <div className="grid grid-cols-[250px_53px_600px] gap-10 w-max">
                <div className="pt-2">
                    <img
                        src={imageDisplay ? imageDisplay : dataItem.image}
                        alt=""
                        className="w-full rounded-sm min-h-[240px] shadow-md"
                    />
                </div>
                <div className="  flex flex-col gap-3 pt-2">
                    {dataItem.images.map((image: string, index: number) => (
                        <img
                            onClick={() => handleImageDisplay(image)}
                            key={index}
                            src={image}
                            alt=""
                            className="w-[60px] h-[60px] rounded-sm"
                        />
                    ))}
                </div>
                <div className="w-full grid grid-cols-[300px_300px] gap-10 text-text">
                    <div className="min-w-[300px]">
                        {Object.keys(data.info).map((key) => {
                            const value = dataItem[key];

                            return (
                                <div
                                    key={key}
                                    className="flex gap-2 p-1 border-b-[1px] border-lightGray">
                                    <p className="capitalize   text-[14px] min-w-[100px]">
                                        {key.toString() + ":"}
                                    </p>
                                    <p className=" w-full text-right capitalize text-[14px] pl-[40px] text-wrap break-words">
                                        {typeof value === "object"
                                            ? JSON.stringify(value)
                                            : value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className=" flex flex-col ">
                        <div className="flex flex-col gap-2  ">
                            <p className="capitalize  p-1 border-b-[1px] border-lightGray  text-[14px] min-w-[100px]">
                                Mo Ta
                            </p>
                            <p className=" w-full text-left capitalize text-[14px]  text-wrap break-words">
                                {dataItem["description"]}FKSFLSJFKSKD
                            </p>
                        </div>
                        <div className="flex flex-col gap-2  ">
                            <p className="capitalize  p-1 border-b-[1px] border-lightGray  text-[14px] min-w-[100px]">
                                Nha Cung Cap
                            </p>
                            <p className=" w-full text-left capitalize text-[14px]  text-wrap break-words">
                                {dataItem["description"]}FKSFLSJFKSKD
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailItem;
