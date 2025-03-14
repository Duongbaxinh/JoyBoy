"use client";
import { BackIcon, EyeIcon, MenuIcon } from "@/assets/icons";
import Button from "@/components/atoms/Button";
import ButtonOption from "@/components/atoms/ButtonOption";
import Container from "@/components/atoms/Container";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { convertText, formatPrice } from "@/utils";
import Link from "next/link";
import { BiEdit, BiPlus } from "react-icons/bi";
import ContainerLayout from "../ContainerLayout/page";

import Popup from "@/components/atoms/Popup";
import Search from "@/components/atoms/Search";
import { MAX_PRICE } from "@/consts";
import { body, options, Supplier, suppliers } from "@/fake";
import usePriceModified from "@/hooks/usePriceModified";
import { calculatePrice } from "@/utils/calculatePrice";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import ProductTable from "./ProductTable";
import PriceType from "@/components/atoms/PriceType";
import { Product } from "@/interfaces/productTable.interface";



function StoreInput() {

    const remainingDebt = -5000;
    const [isOpen, setIsOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<Product[]>([])
    const [valueSelect, setValueSelect] = useState<{
        id: number;
        value: string;
    }>();
    const refSearch = useRef<HTMLDivElement | null>(null);
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [products, setProducts] = useState<Product[]>([]);
    const [supplier, setSupplier] = useState<Supplier[]>([]);
    const [typePrice, setTypePrice] = useState<"vnd" | "percent">("vnd")
    const [textSearch, setTextSearch] = useState<{
        searchProduct: { value: string, status: boolean },
        searchSupplier: { value: string, status: boolean }
    }>({
        searchProduct: { value: '', status: false },
        searchSupplier: { value: '', status: false },
    })
    const {
        handlePercentUnit,
        handleVNDUnit,
        unit
    } = usePriceModified();

    const [edit, setEdit] = useState<{
        discount: { id: number | string, status: boolean; value: number };
        unitPrice: { id: number | string, status: boolean; value: number };
        name: { id: number | string, status: boolean; value: string };
        totalDiscount: { id: number | string, status: boolean; value: number };
    }>({
        discount: { id: 0, status: false, value: 0 },
        unitPrice: { id: 0, status: false, value: 0 },
        name: { id: 0, status: false, value: '' },
        totalDiscount: { id: 0, status: false, value: 0 },
    });


    const handleNote = (e: any) => (id: string | number) => {
        setProducts((pre) => pre.map((p) => p.id === id ? ({ ...p, note: e.target.value }) : p))
    }

    const updateProduct = ({ id, quantity, discount, unitPrice }: { id: string | number, quantity?: number, discount?: number, unitPrice?: number }) => {
        const productUpdate = products.find((item) => item.id === id);
        if (!productUpdate) throw new Error("product not found!");

        if (quantity !== undefined) {
            const validQuantity = Math.min(Math.max(quantity, 0), MAX_PRICE);
            productUpdate.quantity = validQuantity;
        }

        if (discount !== undefined) {
            const validDiscount = unit.type === "vnd" ? Math.min((productUpdate.unitPrice * productUpdate.quantity), discount) :
                Math.min(Math.max(discount, 0), 100)
            productUpdate.discount = validDiscount;
        }

        if (unitPrice !== undefined) {
            const validUnitPrice = Math.min(Math.max(unitPrice, 0), MAX_PRICE);
            productUpdate.unitPrice = validUnitPrice;
        }

        productUpdate.discountType = unit.type;
        const totalProduct = calculatePrice(productUpdate.unitPrice * productUpdate.quantity, productUpdate.discount, 'sub', unit.type);
        productUpdate.totalPrice = Math.max(0, totalProduct);

        const arrUpdate = products.map((item) => item.id === productUpdate.id ? productUpdate : item);
        setProducts(arrUpdate);
    };

    const handleEdit = (field: keyof typeof edit, id: number | string) => {
        setEdit((prev) => ({
            ...prev,
            [field]: { ...prev[field], id: id, status: !prev[field].status }
        }));
    };

    const handleQuantity = (idProduct: number | string, value?: number) => {
        updateProduct({ id: idProduct, quantity: Math.min(MAX_PRICE, value ?? 0) })
    }
    const handleDiscountProduct = (idProduct: string | number, discount: number) => {
        updateProduct({ id: idProduct, discount: Math.abs(discount) === 0 ? 0 : Math.abs(discount) });
    };
    const handleAdjustUnitPrice = (idProduct: string | number, unitPrice: number) => {
        const unitPriceUpdate = Math.abs(unitPrice) === 0 ? 0 : Math.abs(unitPrice)
        console.log("check unit price end ", unitPriceUpdate)
        updateProduct({ id: idProduct, unitPrice: Math.min(MAX_PRICE, unitPriceUpdate) });
    }
    const handleOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("run at here search product", e.target.value)
        const query = e.target.value
        setTextSearch(prev => ({ ...prev, searchProduct: { ...prev.searchProduct, value: query, status: true } }))

        const lowerQuery = convertText(query.toLowerCase().trim());
        const productSearch: Product[] = body
            .filter(
                (product) =>
                    convertText(product.name.toLowerCase()).includes(lowerQuery) ||
                    convertText(product.code.toLowerCase()).includes(lowerQuery)
            )
            .map((product) => ({
                id: product.id,
                code: product.code,
                name: product.name,
                quantity: product.stock,
                unitPrice: product.price,
                discount: 0,
                discountType: "vnd",
                totalPrice: product.price,
                note: "",
            }));
        console.log("run at here search product", e.target.value, textSearch.searchProduct.status)
        setSuggestions(productSearch)
    }

    const handleSearchSupplier = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setTextSearch(prev => ({ ...prev, searchSupplier: { value: query, status: true } }))
        const lowerQuery = convertText(query.toLowerCase().trim());
        const supplierSearch: Supplier[] = suppliers
            .filter(
                (supplier) =>
                    convertText(supplier.name.toLowerCase()).includes(lowerQuery))

        setSupplier(supplierSearch)
    }

    const handleAddProduct = (product: Product) => {
        const findProduct = products.find((item) => item.id === product.id)
        const productClone = [...products]
        if (findProduct) {
            findProduct.quantity += 1
            const updateProduct = productClone.filter((item: Product) => item.id === findProduct.id ? findProduct : item)
            setProducts([...updateProduct])
        } else {
            const updateProduct = [...productClone, product]
            setProducts([...updateProduct])
        }
        setTextSearch(prev => ({ ...prev, searchProduct: { ...prev.searchProduct, status: false } }))
    }
    const { totalQuantity, totalPrice } = useMemo(() => {
        return products.reduce((acc, product) => {
            acc.totalQuantity += product.quantity
            acc.totalPrice += product.totalPrice;
            return acc;
        }, { totalQuantity: 0, totalPrice: 0 })
    }, [products]);
    const handleTotalDiscount = ({ discount }: { productId?: string, discount: number }) => {
        if (typePrice === 'vnd') {
            setTotalDiscount(Math.min(totalPrice, discount))
        }
        if (typePrice === 'percent') {
            setTotalDiscount(Math.min(100, discount))
        }
    }
    const handleTypePrice = (field: "vnd" | "percent") => {

        setTypePrice(field)
    }
    const handleClickOut = (field: "searchProduct" | "searchSupplier") => {
        console.log('check handle click out')
        return setTimeout(() => {
            setTextSearch(prev => ({ ...prev, [field]: { ...prev[field], status: false } }))
        }, 200);
    }
    const finalPrice = calculatePrice(totalPrice, typePrice === "vnd" ? Math.min(totalDiscount, totalPrice) : Math.min(totalDiscount, 100), 'sub', typePrice)
    return (
        <ContainerLayout>
            <Container>
                <Popup
                    position="bg-lightGray/50 !items-start"
                    onClose={() => setIsOpen(false)}
                    title="Thêm hàng hóa từ nhóm hàng"
                    isOpen={isOpen}>
                    <div className="bg-white w-96 text-text ">

                        <div className="">
                            <label className="block text-sm font-medium text-gray-700">Nhóm hàng</label>
                            <Select placeholder="----Lua chon----"
                                selected={valueSelect}
                                onChange={(item: any) => setValueSelect(item)}
                                options={options} />
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <Button onAction={() => { setIsOpen(false) }} label=" Bỏ qua" className="p-2 w-[60px] bg-gray-500 hover:bg-gray-600 text-white" />
                            <Button onAction={() => { }} label="Xong" className=" p-2  w-[60px] bg-green-500 hover:bg-green-600 text-white" />
                        </div>
                    </div>
                </Popup>
                <div className=" flex flex-col md:flex-row   gap-4 h-full   ">
                    <div className=" md:w-[calc(100%-350px)] w-full ">

                        <div className="text-text w-full pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-[30px] md:min-w-[500px] w-full">
                                    <h1 className="text-[20px] leading-[22px] font-bold whitespace-nowrap">
                                        <Link
                                            href={"#"}
                                            className="inline-block mr-2">
                                            <BackIcon />
                                        </Link>
                                        Nhap hàng
                                    </h1>
                                    <Search
                                        onBlur={() => handleClickOut("searchProduct")}
                                        textSearch={textSearch.searchProduct.value}
                                        onSearch={handleOnSearch}
                                        titleSearch={"Tim hang hoa theo ma hoac ten"}
                                        className="!h-[42px] !w-full !max-w-[500px] bg-white p-0 !rounded-lg border-lightGray"
                                        tailIcon={<MenuIcon />}
                                        onHandleTailIcon={() => setIsOpen(true)}
                                        tailIconSecond={<BiPlus />}
                                    >
                                        {suggestions.length > 0 && textSearch.searchProduct.status && suggestions.map((product: Product) => (
                                            <div
                                                className="flex p-4 rounded-lg shadow-md bg-white cursor-pointer hover:bg-lightGreen"
                                                onClick={() => handleAddProduct(product)}>
                                                <img src={""} alt={""} className="w-20 h-20 object-cover mr-4" />
                                                <div className="flex flex-col">
                                                    <h2 className="font-bold text-lg">{product.name}</h2>
                                                    <p className="text-sm text-gray-600">{product.code} <span className="font-semibold">Giá:</span> {formatPrice(product.unitPrice)} </p>
                                                    <p className="text-sm">Tồn: {product.quantity}  <span className="ml-4">Khách đặt: {product.quantity}</span></p>
                                                </div>
                                            </div>
                                        ))}

                                    </Search>

                                </div>
                                <div className="flex h-full ">
                                    <ButtonOption
                                        parent={{
                                            icon: <EyeIcon />,
                                            className:
                                                "w-[42px] h-[42px]  bg-blue-400 hover:bg-blue-700"
                                        }}
                                        classNameChildren="right-[20px]">
                                        <div className="">Option</div>
                                    </ButtonOption>
                                </div>
                            </div>
                            <ProductTable
                                edit={edit}
                                unit={unit}
                                handleVNDUnit={handleVNDUnit}
                                handlePercentUnit={handlePercentUnit}
                                handleDiscountProduct={handleDiscountProduct}
                                handleEdit={handleEdit}
                                products={products}
                                handleNote={handleNote}
                                handleAdjustUnitPrice={handleAdjustUnitPrice}
                                handleQuantity={handleQuantity}
                                setEdit={setEdit}
                                setProducts={setProducts}
                                updateProduct={updateProduct} />
                        </div>
                    </div>
                    <div className=" w-full md:min-w-[350px] md:max-w-[350px] bg-white flex flex-col gap-4 relative ">
                        <div className=" p-4 bg-white  flex flex-col gap-4 h-full md:max-h-[calc(100vh-180px)] md:overflow-auto">
                            <div className="flex justify-between items-center ">
                                <Select
                                    className="text-darkGray text-[13px] max-w-[160px] "
                                    customTextSelected="!leading-[24px]"
                                    inputSearch
                                    selected={{ id: 1, value: "Nguyen Van A" }}
                                    options={[
                                        { id: 1, value: "Nguyen Van A" },
                                        { id: 2, value: "Nguyen Van B" }
                                    ]}
                                />
                                <div className="flex gap-2 items-center text-darkGray text-[13px]">
                                    <p className="text-darkGray leading-[24px] border-b-[1px]">
                                        08/03/2025
                                    </p>
                                    <Select
                                        iconSelect={null}
                                        className="text-darkGray text-[13px]  min-w-[60px] max-w[60px]"
                                        customTextSelected="!leading-[24px]"
                                        customItemOption="!p-0 text-center text-darkGray"
                                        selected={{ id: 1, value: "20:30" }}
                                        options={[
                                            { id: 1, value: "20:30" },
                                            { id: 2, value: "20:31" }
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex  items-center text-darkGray text-[13px] border-b-[1px] ">
                                <Search className="!border-0 !p-0"
                                    tailIcon={<IconButton
                                        className="!bg-transparent"
                                        icon={
                                            <BiPlus className="text-text text-[18px]" />
                                        }
                                    />}
                                    onHandleTailIcon={() => { }}
                                    onSearch={handleSearchSupplier}
                                    textSearch={textSearch.searchSupplier.value}
                                    titleSearch="Tim kiem nha cung cap">
                                    {
                                        supplier && textSearch.searchSupplier.status && supplier.map((supplier: Supplier) => (
                                            <div ref={refSearch} className="flex items-center justify-between text-[13px]">
                                                <p>{supplier.name}</p>
                                                <p>{supplier.phone}</p>
                                            </div>
                                        ))
                                    }
                                </Search>

                            </div>

                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Mã phiếu nhập
                                </p>
                                <p className=" text-[13px] text-text leading-[20px] p-1 border-b-[1px]">
                                    Mã phiếu nhập
                                </p>
                            </div>
                            <div className="flex items-center justify-start">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Mã đặt hàng nhập
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Trạng thái
                                </p>
                                <p className=" text-[13px] text-text leading-[20px] p-1 border-b-[1px]">
                                    Phiếu tạm
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Tổng tiền hàng{" "}
                                    <span className=" inline-block  min-w-[20px] h-[20px] w-fit rounded-sm text-center border">
                                        {totalQuantity}
                                    </span>
                                </p>
                                <p className=" text-[13px] text-text leading-[20px] p-1 ">
                                    {formatPrice(totalPrice)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Giảm giá <span>{typePrice}</span>
                                </p>

                                <PriceType
                                    edit={edit}
                                    onEdit={setEdit}
                                    typePrice={typePrice}
                                    field="totalDiscount"
                                    discount={typePrice === "vnd" ? Math.min(totalDiscount, totalPrice) : Math.min(totalDiscount, 100)}
                                    handleType={(field: "vnd" | "percent") => handleTypePrice(field)}
                                    handleEdit={() => handleEdit("totalDiscount", "1")}
                                    handleDiscountProduct={({ discount }) => handleTotalDiscount({ discount })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text font-bold  p-1 leading-[20px]">
                                    Cần trả nhà cung cấp
                                </p>
                                <p className=" text-[13px] min-w-[80px] text-right font-bold  text-blue-400 leading-[20px]  p-1 border-b-[1px] ">
                                    {formatPrice(finalPrice)}
                                </p>
                            </div>
                            <div className="flex justify-between text-[13px] text-text">
                                <p className="text-gray-600">
                                    Tiền trả nhà cung cấp (F8)
                                </p>
                                <div className="flex items-center">
                                    <p className="font-semibold text-green-600">
                                        {formatPrice(0)}
                                    </p>
                                    <svg
                                        className="w-4 h-4 ml-2 text-blue-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex justify-between text-[13px] text-text">
                                <p className="text-gray-600">
                                    Tình trạng công nợ
                                </p>
                                <p
                                    className={
                                        remainingDebt < 0
                                            ? "text-red-600 font-semibold"
                                            : "font-semibold"
                                    }>
                                    {formatPrice(remainingDebt)}
                                </p>
                            </div>
                            <div className="mb-4 text-[13px] text-text">
                                <Input
                                    leadingIcon={<BiEdit />}
                                    variant="underline"
                                    placeholder="Ghi chu"
                                />
                            </div>
                        </div>

                        <div className=" static md:absolute w-full h-[100px] bottom-0 right-0 ">
                            <div className="flex  space-x-[40px] p-3 h-full">
                                <Button
                                    className=" flex-1 h-full !bg-blue-600 text-white py-2 rounded-lg !hover:bg-blue-700"
                                    label="Lưu tạm"
                                    onAction={() => { }}
                                />
                                <Button
                                    className=" flex-1 h-full bg-green-600 bg-green text-white py-2 rounded-lg hover:bg-green-700"
                                    label="   Hoàn thành"
                                    onAction={() => { }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ContainerLayout >
    );
}

export default StoreInput;
