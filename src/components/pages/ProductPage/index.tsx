"use client";
import ContainerLayout from "@/app/ContainerLayout/page";
import {
    ArrowDown,
    ImportIcon,
    SearchIcon
} from "@/assets/icons";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import ProductTable from "@/components/atoms/Table";
import { priceRanges } from "@/consts";
import { FilterProductType } from "@/interfaces";
import { useGetBrandsQuery } from "@/redux/apis/brand.api";
import { useGetAllCategoryQuery } from "@/redux/slices/category.slice";
import { useGetProductFilterQuery } from "@/redux/slices/product.slice";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { isArray } from "util";


const productLabels = [
    { key: "product_thumbnail", label: "Hình ảnh" },
    { key: "product_name", label: "Tên sản phẩm" },
    { key: "product_price", label: "Giá sản phẩm" },
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


const initFilter: FilterProductType = {
    limitnumber: 10,
    page: 1,
    product_brand_id: [],
    product_categories_id: [],
    product_discount: false,
    product_price: [],
    product_type_id: [],
    textSearch: '',
    product_sold: []

}

function ProductPage() {
    const [openItem, setOpenItem] = useState<{
        item: number | string | null;
        open: boolean;
    }>({ item: null, open: false });

    const [isDetail, setIsDetail] = useState<boolean>(false)

    const [filters, setFilters] = useState<FilterProductType>(initFilter);
    const { data: products, isLoading: loadingProduct, error: errorProduct } = useGetProductFilterQuery(filters)
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()


    if (!products) return <h1>Error</h1>

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev: any) => ({ ...prev, textSearch: e.target.value }));
    };

    const newArr = (arr: any[], element: any) => {
        if (arr.includes(element)) {
            return arr.filter((i) => i !== element)
        } else {
            return [...arr, element]
        }
    }
    const handleFilter = (filed: keyof FilterProductType, value: any) => {
        if (filed === "product_price") {
            setFilters(prev => ({ ...prev, [filed]: value }))
        }
        const newData = isArray(filters[filed]) ? newArr(filters[filed], value) : value
        setFilters(prev => ({ ...prev, [filed]: newData }))
    }

    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4 ">
                    <div className="col-span-1 ">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Hàng Hóa
                        </h2>
                        <div className="flex flex-col gap-3">
                            <FilterOption
                                title="Loại Hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {categories && categories.map(({ key, title }) => (
                                        <label
                                            key={key}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleFilter("product_categories_id", title)}
                                            />
                                            <span className="text-sm">
                                                {title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            {/* <FilterOption
                                title="Nhóm hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
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
                            </FilterOption> */}

                            <FilterOption
                                title="Thương hiệu"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {brands && brands.map(({ id, title }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleFilter("product_brand_id", title)}
                                            />
                                            <span className="text-sm">
                                                {title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            {/* <FilterOption
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
                                                onChange={() => handleFilter("prod", title)}
                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption> */}
                            <FilterOption
                                title="Giá sản phẩm"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {priceRanges.map(({ label, min, max }, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="price"
                                                onChange={() => handleFilter("product_price", [min, max])}
                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>
                            {/* <FilterOption
                                title="Hạn sử dụng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {expirations.map(({ id, label }, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="expiration"
                                                onChange={() => handleFilter("pro", title)}
                                            />
                                            <span className="text-sm">
                                                {label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption> */}

                        </div>
                    </div>
                    <div
                        className={`col-span-4 w-full ${isDetail ? "h-full" : "h-[20px]  sticky top-0 left-0  "
                            }`}>
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
                        <div className={`relative w-full ${!isDetail ? "overflow-auto" : ""}`}>
                            <ProductTable
                                isDetail={isDetail}
                                setIsDetail={setIsDetail}
                                onSelect={() => { }}
                                productLabels={productLabels}
                                body={products.results ?? []}
                            />
                        </div>

                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}
export default ProductPage;
