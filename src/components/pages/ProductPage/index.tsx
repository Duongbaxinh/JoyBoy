"use client";
import ContainerLayout from "@/app/ContainerLayout/page";
import {
    ArrowDown,
    ImportIcon,
    MenuIcon,
    SearchIcon
} from "@/assets/icons";
import ButtonOption from "@/components/atoms/ButtonOption";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ProductTable from "@/components/atoms/Table";
import { categories, displayOptions, expirations, stocks, types } from "@/consts";
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

const rawProducts = [
    {
        product_name: "Kem Dưỡng Chống Lão Hóa",
        product_price: 620000,
        product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1707578535/a33e9bcd4c1c613d1b3404eb594b8b90.jpg_ssguf4.webp",
        product_images: [],
        product_type: "Kem dưỡng",
        product_brand: "BRAND_ID_EXAMPLE",
        product_category: "CATEGORY_ID_EXAMPLE",
        product_made: "Italy",
        product_discount: true,
        product_discount_start: "2023-04-05T02:15:22Z",
        product_discount_end: "2023-04-05T03:15:22Z",
        product_sold: 85,
        product_international: true,
        product_rate: 5,
        product_ingredient:
            "Water, Butylene Glycol, Glycerin, Hydroxyethyl Urea, Pentylene Glycol, Triethylhexanoin, Squalane, PPG-10 Methyl Glucose Ether, Ammonium Acryloyldimethyltaurate/VP Copolymer, Behenyl Alcohol, Dimethicone, Triethyl Citrate, PPG-17-Buteth-17, Cyclopentasiloxane, Phenoxyethanol, Disodium Succinate, Methylparaben, Sodium Hyaluronate, Dimethicone Crosspolymer, Succinic Acid, Agar, Disodium EDTA, Sodium Acetylated Hyaluronate, Hydrolyzed Hyaluronic Acid, Hydrolyzed Collagen, Aphanothece Sacrum Exopolysaccharides, Alpha-Glucan, Ammonium Acrylates Copolymer, Hydroxypropyltrimonium Hyaluronate, Glucosyl Ceramide",
    },
    {
        product_name: "Tinh Chất Collagen Chống Nhăn",
        product_price: 450000,
        product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1707578546/20db49212c015aad2fced1325a8b60ca.jpg_tosrfw.webp",
        product_images: [],
        product_type: "Tinh chất",
        product_brand: "BRAND_ID_EXAMPLE",
        product_category: "CATEGORY_ID_EXAMPLE",
        product_made: "Korea",
        product_discount: false,
        product_discount_start: "2023-04-05T02:15:22Z",
        product_discount_end: "2023-04-05T03:15:22Z",
        product_sold: 120,
        product_international: true,
        product_rate: 5,
        product_ingredient:
            "Water, Butylene Glycol, Glycerin, Hydroxyethyl Urea, Pentylene Glycol, Triethylhexanoin, Squalane, PPG-10 Methyl Glucose Ether, Ammonium Acryloyldimethyltaurate/VP Copolymer, Behenyl Alcohol, Dimethicone, Triethyl Citrate, PPG-17-Buteth-17, Cyclopentasiloxane, Phenoxyethanol, Disodium Succinate, Methylparaben, Sodium Hyaluronate, Dimethicone Crosspolymer, Succinic Acid, Agar, Disodium EDTA, Sodium Acetylated Hyaluronate, Hydrolyzed Hyaluronic Acid, Hydrolyzed Collagen, Aphanothece Sacrum Exopolysaccharides, Alpha-Glucan, Ammonium Acrylates Copolymer, Hydroxypropyltrimonium Hyaluronate, Glucosyl Ceramide",
    },
    {
        product_name: "Tẩy Trang Micellar Water",
        product_price: 190000,
        product_thumbnail: "https://res.cloudinary.com/dwu92ycra/image/upload/v1707578530/71451db414c4f652532cb727db142455.jpg_hdi5mr.webp",
        product_images: [],
        product_type: "Tẩy trang",
        product_brand: "BRAND_ID_EXAMPLE",
        product_category: "CATEGORY_ID_EXAMPLE",
        product_made: "Thailand",
        product_discount: false,
        product_discount_start: "2023-04-05T02:15:22Z",
        product_discount_end: "2023-04-05T03:15:22Z",
        product_sold: 70,
        product_international: true,
        product_rate: 5,
        product_ingredient:
            "Water, Butylene Glycol, Glycerin, Hydroxyethyl Urea, Pentylene Glycol, Triethylhexanoin, Squalane, PPG-10 Methyl Glucose Ether, Ammonium Acryloyldimethyltaurate/VP Copolymer, Behenyl Alcohol, Dimethicone, Triethyl Citrate, PPG-17-Buteth-17, Cyclopentasiloxane, Phenoxyethanol, Disodium Succinate, Methylparaben, Sodium Hyaluronate, Dimethicone Crosspolymer, Succinic Acid, Agar, Disodium EDTA, Sodium Acetylated Hyaluronate, Hydrolyzed Hyaluronic Acid, Hydrolyzed Collagen, Aphanothece Sacrum Exopolysaccharides, Alpha-Glucan, Ammonium Acrylates Copolymer, Hydroxypropyltrimonium Hyaluronate, Glucosyl Ceramide",
    },
];

function ProductPage() {


    const [openItem, setOpenItem] = useState<{
        item: number | string | null;
        open: boolean;
    }>({ item: null, open: false });

    const [itemChecked, setItemChecked] = useState<string[]>([]);
    const [filters, setFilters] = useSaveLocalStorage("filters", {
        typeProduct: [],
        categories: [],
        stock: "all",
        expiration: "all",
        businessStatus: "all",
        textSearch: ""
    });

    const handleDetailItem = (id: number | string) =>
        setOpenItem((prev) => ({
            item: id,
            open: prev.item === id ? !prev.open : true
        }));

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev: any) => ({ ...prev, textSearch: e.target.value }));
    };

    const checkExpiration = (
        rangeDate: string,
        numberOfDate: number
    ): boolean => {
        const [min, max] = rangeDate.split("->").map(Number);
        return numberOfDate > min && numberOfDate < max;
    };
    const productLabels = [
        { key: "product_name", label: "Tên sản phẩm" },
        { key: "product_price", label: "Giá sản phẩm" },
        { key: "product_thumbnail", label: "Hình ảnh đại diện" },
        { key: "product_images", label: "Hình ảnh sản phẩm" },
        { key: "product_type", label: "Loại sản phẩm" },
        { key: "product_brand", label: "Thương hiệu" },
        { key: "product_category", label: "Danh mục" },
        { key: "product_made", label: "Xuất xứ" },
        { key: "product_discount", label: "Có chiết khấu" },
        { key: "product_discount_start", label: "Thời gian bắt đầu chiết khấu" },
        { key: "product_discount_end", label: "Thời gian kết thúc chiết khấu" },
        { key: "product_sold", label: "Số lượng đã bán" },
        { key: "product_international", label: "Sản phẩm quốc tế" },
        { key: "product_rate", label: "Đánh giá" },
        { key: "product_ingredient", label: "Thành phần" },
    ];


    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4 h-[600px]  ">
                    <div className="col-span-1 ">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Hàng Hóa
                        </h2>
                        <div className="flex flex-col gap-3">
                            <FilterOption
                                title="Loại Hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {types.map(({ id, label }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"

                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            <FilterOption
                                title="Nhóm hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    <Input
                                        leadingIcon={<SearchIcon />}
                                        placeholder="Tìm kiếm nhóm hàng"
                                    />
                                    {categories.map(({ id, label }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"

                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            <FilterOption
                                title="Tồn kho"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {stocks.map(({ id, label }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="stock"

                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            <FilterOption
                                title="Lựa chọn hiển thị"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {displayOptions.map(({ id, label }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="businessStatus"

                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            <FilterOption
                                title="Hạn sử dụng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {expirations.map(({ id, label }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="expiration"

                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            <FilterOption
                                title="Thương hiệu"
                                className="p-3">
                                <Select placeholder="Chọn thương hiệu" />
                            </FilterOption>
                        </div>
                    </div>
                    <div
                        className={`col-span-4 w-full ${openItem.open ? "h-full" : "h-[20px]"
                            } sticky top-0 left-0  `}>
                        <div className="flex justify-between items-center h-20">
                            <Input
                                className="max-w-[450px] w-full bg-white !py-2"
                                leadingIcon={<SearchIcon />}
                                value={filters.textSearch}
                                onChange={handleTextSearch}
                                placeholder="Theo mã, tên hàng"
                            />
                            <div className="flex gap-2">
                                <IconButton
                                    icon={<BiPlus className="w-5 h-5" />}
                                    rightIcon={
                                        <ArrowDown className="w-5 h-5" />
                                    }
                                />
                                <IconButton
                                    icon={<ImportIcon className="w-5 h-5" />}
                                />


                            </div>
                        </div>
                        <div className="relative w-full overflow-auto">
                            <ProductTable
                                productLabels={productLabels}
                                products={[rawProducts]}
                            />
                        </div>

                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}
export default ProductPage;
