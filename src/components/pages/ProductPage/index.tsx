"use client";
import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import {
    ImportIcon,
    SearchIcon
} from "@/assets/icons";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import InputForm from "@/components/atoms/InputForm";
import ProductTable from "@/components/molecules/ProductTable";
import { CREATE_PRODUCT_URL } from "@/config/router.config";
import { priceRanges } from "@/consts";
import { initFilter } from "@/consts/product";
import { useProduct } from "@/contexts/product.context";
import { IProduct } from "@/interfaces";
import { FilterProductType } from "@/interfaces/filter.interface";
import { useGetBrandsQuery } from "@/redux/apis/brand.api";
import { useGetAllCategoryQuery } from "@/redux/apis/category.api";
import { useDeleteProductMutation } from "@/redux/apis/manageproduct.api";
import { useGetProductFilterQuery } from "@/redux/apis/product.api";
import { useGetAllTypeQuery } from "@/redux/apis/typeproduct.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import { isArray } from "util";
import { number } from "yup";


const productLabels = [
    { key: "product_thumbnail", label: "Hình ảnh" },
    { key: "product_name", label: "Tên sản phẩm" },
    { key: "product_price", label: "Giá sản phẩm" },
    { key: "product_type", label: "Loại sản phẩm" },
    { key: "product_brand", label: "Thương hiệu" },
    { key: "product_category", label: "Danh mục" },
    { key: "product_made", label: "Xuất xứ" },
    // { key: "product_discount", label: "Có chiết khấu" },
    { key: "product_discount_start", label: "Thời gian bắt đầu chiết khấu" },
    { key: "product_discount_end", label: "Thời gian kết thúc chiết khấu" },
    { key: "product_sold", label: "Số lượng đã bán" },
    { key: "product_international", label: "Sản phẩm quốc tế" },
    { key: "product_rate", label: "Đánh giá" },
    { key: "product_ingredient", label: "Thành phần" },
];

export type ProductSelected = {
    id: string,
    product_name: string,
    product_type: string,
    product_price: number
}



function ProductPage() {

    const router = useRouter()
    const { products, filters, setFilters } = useProduct()
    const [productSelected, setProductSelected] = useState<ProductSelected[]>([])
    const [isDetail, setIsDetail] = useState<boolean>(false)
    const { data: categories, isLoading, error } = useGetAllCategoryQuery()
    const { data: productTypes, isLoading: isLoadingTypes, error: errorTypes } = useGetAllTypeQuery()
    const { data: brands, isLoading: loadingBrand, error: errorBrand } = useGetBrandsQuery()
    const [deleteProduct, { isLoading: isDeleteProduct, error: errorDeleteProduct }] = useDeleteProductMutation()

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
            setFilters((prev: FilterProductType) => ({ ...prev, [filed]: value }))
        }
        const newData = isArray(filters[filed]) ? newArr(filters[filed], value) : value
        setFilters((prev: FilterProductType) => ({ ...prev, [filed]: newData }))
    }

    const totalPage = products ? Math.ceil(products.count / filters.limitnumber) : 1
    const currentPage = Math.min(filters.page, Math.max(1, products?.page ?? 1))

    const handleSetProductSelected = (status: "add" | "delete" | "all" | "clean", product: IProduct) => {
        if (status === "add") {
            const newProductSelected = {
                id: product.id,
                product_name: product.product_name,
                product_type: product.product_type.title,
                product_price: product.product_price
            }
            setProductSelected(prev => [...prev, newProductSelected])
            console.log("add", productSelected)
        } else if (status === "delete") {
            setProductSelected(prev => prev.filter(item => item.id !== product.id))
            console.log("delete", productSelected)
        } else if (status === "all") {
            const productSelectedAll = products?.results.map(product => ({
                id: product.id,
                product_name: product.product_name,
                product_type: product.product_type.title,
                product_price: product.product_price
            }))
            setProductSelected(productSelectedAll || [])
        } else {
            setProductSelected([])
        }


    }

    const handleCreatePromotion = () => {
        if (productSelected.length < 5) {
            toast.error("Vui lòng chọn ít nhất 5 sản phẩm!");
            return;
        }
        if (productSelected.length > 10) {
            toast.error("Không thể chọn quá 10 sản phẩm!");
            return;
        }
        sessionStorage.setItem("productSelected", JSON.stringify(productSelected));
        router.push("/promotion/manage-promotion");
    };

    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage
    const productsDisplay = products?.results ?? []
    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4 ">
                    <div className="col-span-1 ">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Hàng Hóa
                        </h2>
                        <div className="flex flex-col gap-3">
                            {/* <FilterOption
                                title="Danh mục"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {categories && categories.map(({ id, slug, title }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleFilter("product_categories", slug)}
                                            />
                                            <span className="text-sm">
                                                {title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption> */}
                            <FilterOption
                                title="Nhóm hàng"
                                className="p-3 max-h-[300px] overflow-y-scroll">
                                <div className="mt-2 flex flex-col gap-3">
                                    {productTypes && productTypes.map(({ id, slug, title }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleFilter("product_type", slug)}
                                            />
                                            <span className="text-sm">
                                                {title}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>

                            <FilterOption
                                title="Thương hiệu"
                                className="p-3 max-h-[300px] overflow-y-scroll" >
                                <div className="mt-2 flex flex-col gap-3">
                                    {brands && brands.map(({ id, slug, title }) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleFilter("product_brand", slug)}
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
                            <InputForm
                                className="max-w-[450px] w-full bg-white !py-2"
                                leadingIcon={<SearchIcon />}
                                onChange={handleTextSearch}
                                placeholder="Theo mã, tên hàng"
                            />
                            <div className="flex gap-2">
                                <Link className="p-2 text-white h-full !rounded-md !bg-green" href={CREATE_PRODUCT_URL}>
                                    <BiPlus className="w-5 h-5" />
                                </Link>
                                <IconButton
                                    onFC={handleCreatePromotion}
                                    label="Tạo chương trình ưu đãi"
                                    icon={<BiPlus className="w-5 h-5" />}
                                />
                                <IconButton
                                    icon={<ImportIcon className="w-5 h-5" />}
                                />

                            </div>
                        </div>
                        <div className={`relative w-full overflow-auto ${!isDetail ? " max-h-[80vh]" : ""}`}>

                            <ProductTable
                                isDetail={isDetail}
                                setIsDetail={setIsDetail}
                                onSelect={handleSetProductSelected}
                                productLabels={productLabels}
                                productSelected={productSelected || []}
                                body={productsDisplay}
                            />
                        </div>
                        {totalPage > 1 && (
                            <div className="flex justify-center items-center gap-2 ">
                                <ReactPaginate
                                    className='flex gap-4 items-center justify-center '
                                    breakLabel="..."
                                    nextLabel={<FaChevronRight />}
                                    activeClassName='min-w-[30px] max-w-[30px] min-h-[30px] max-h-[30px] flex items-center justify-center bg-pink-300 rounded-sm'
                                    pageRangeDisplayed={products?.page}
                                    initialPage={currentPage - 1}
                                    onPageChange={(selectedItem) => {
                                        handleFilter("page", selectedItem.selected + 1);
                                    }}
                                    pageCount={totalPage}
                                    previousLabel={<FaChevronLeft />}
                                    renderOnZeroPageCount={null}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </ContainerLayout >
    );
}
export default ProductPage;
