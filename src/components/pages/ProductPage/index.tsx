"use client";
import {
    SearchIcon
} from "@/assets/icons";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import InputForm from "@/components/atoms/InputForm";
import ContainerLayout from "@/components/layouts/ContainerLayout/page";
import ProductTable from "@/components/molecules/ProductTable";
import { CREATE_PRODUCT_URL } from "@/config/router.config";
import { priceRanges, productLabels } from "@/consts";
import { ParamFilter, useProduct } from "@/contexts/product.context";
import { IProduct, ProductBrand, ProductType } from "@/interfaces";
import { FilterProductType } from "@/interfaces/filter.interface";
import { useDeleteProductMutation } from "@/redux/apis/manageproduct.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import { isArray } from "util";


export type ProductSelected = {
    id: string,
    product_name: string,
    product_type: string,
    product_price: number
}


function ProductPage() {
    const router = useRouter()
    const { products, filters, setFilters, productTypes, brands, params, setParam } = useProduct()

    const [brandData, setBrandData] = useState<ProductBrand[]>([])
    const [typeData, setTypeData] = useState<ProductType[]>([])
    const [productSelected, setProductSelected] = useState<ProductSelected[]>([])
    const [isDetail, setIsDetail] = useState<boolean>(false)
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

    const handleLoadMoreBrandAndType = (key: keyof ParamFilter) => {
        setParam(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                limitnumber: prev[key].limitnumber + 5
            }
        }));
    }

    useEffect(() => {
        if (brands && brands.results) {
            setBrandData(brands.results)
        }
        if (productTypes && brands?.results) {
            setTypeData(productTypes.results)
        }
    }, [productTypes, brands])

    const isPrevious = currentPage > 1
    const isNext = currentPage < totalPage

    const productsDisplay = products?.results ?? []
    const isStopLoadMoreType = productTypes?.count === params.type.limitnumber
    const isStopLoadMoreBrand = brands?.count === params.brand.limitnumber

    return (
        <ContainerLayout>
            <Container>
                <p>{typeData.length.toString()}</p>
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
                                <div className="mt-2 flex flex-col gap-3 max-h-[200px] scrollbar overflow-y-scroll">
                                    {typeData && typeData.length > 0 && typeData.map(({ id, slug, title }) => (
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
                                    {!isStopLoadMoreType && <Button className="bg-transparent !text-pink-600 border-0" label="Xem thêm" onAction={() => handleLoadMoreBrandAndType("type")} />}
                                </div>
                            </FilterOption>

                            <FilterOption
                                title="Thương hiệu"
                                className="p-3 " >
                                <div className="mt-2 flex flex-col gap-3 max-h-[200px] scrollbar overflow-y-scroll">
                                    {brandData && brandData.length > 0 && brandData.map(({ id, slug, title }) => (
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
                                    {!isStopLoadMoreBrand && (<Button className="bg-transparent !text-pink-600 border-0" label="Xem thêm" onAction={() => handleLoadMoreBrandAndType("brand")} />)}
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

                                {/* <IconButton
                                    icon={<ImportIcon className="w-5 h-5" />}
                                /> */}

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
            </Container >
        </ContainerLayout >
    );
}
export default ProductPage;
