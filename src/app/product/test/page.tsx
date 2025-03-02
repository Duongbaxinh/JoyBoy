"use client";

import ContainerLayout from "@/app/ContainerLayout/page";
import {
    ArrowDown,
    ExportIcon,
    ImportIcon,
    MenuIcon,
    SearchIcon
} from "@/assets/icons";
import ButtonOption from "@/components/atoms/ButtonOption";
import Container from "@/components/atoms/Container";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/atoms/Pagination";
import Table from "@/components/atoms/Table";
import FiltersPanel from "@/components/molecules/FiltersPanel";
import {showPropertiesTable} from "@/fake";
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import {Filters} from "@/interfaces";
import {fetchProducts} from "@/store/slices/product.slice";
import {AppDispatch, RootState} from "@/store/store";
import {convertText} from "@/utils";
import exportToExcel from "@/utils/exportFile";
import {useEffect, useMemo, useState} from "react";
import {BiPlus} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";

interface FieldShowItem {
    id: string;
    name: string;
    show: boolean;
}

function ProductPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {products, loading, error} = useSelector(
        (state: RootState) => state.product
    );
    const [openItem, setOpenItem] = useState<{
        item: number | string | null;
        open: boolean;
    }>({item: null, open: false});
    const [active, setActive] = useSaveLocalStorage("active", 1);
    const [fieldShow, setFieldShow] = useSaveLocalStorage<FieldShowItem[]>(
        "fieldShow",
        showPropertiesTable
    );
    const [itemChecked, setItemChecked] = useState<string[]>([]);
    const [numberDisplay, setNumberDisplay] = useSaveLocalStorage(
        "numberDisplay",
        10
    );
    const [filters, setFilters] = useSaveLocalStorage<Filters>("filters", {
        typeProduct: [],
        categories: [],
        stock: "all",
        expiration: "all",
        businessStatus: "all",
        textSearch: ""
    });

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev: Filters) => ({...prev, textSearch: e.target.value}));
    };

    const handleDetailItem = (id: number | string) =>
        setOpenItem((prev) => ({
            item: id,
            open: prev.item === id ? !prev.open : true
        }));

    const handleFieldShow = (id: string) => {
        setFieldShow((prev: FieldShowItem[]) =>
            prev.map((item) =>
                item.id === id ? {...item, show: !item.show} : item
            )
        );
    };

    const handleSelect = (id: string) => {
        setItemChecked((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const checkExpiration = (
        rangeDate: string,
        numberOfDate: number
    ): boolean => {
        const [min, max] = rangeDate.split("->").map(Number);
        return numberOfDate > min && numberOfDate < max;
    };

    const filteredProducts = useMemo(() => {
        return products.filter((item) => {
            const {
                typeProduct,
                categories,
                stock,
                businessStatus,
                textSearch,
                expiration
            } = filters;

            const matchesType =
                typeProduct.length === 0 || typeProduct.includes(item.type);
            const matchesCategory =
                categories.length === 0 || categories.includes(item.category);
            const matchesStock = stock === "all" || stock === item.status;
            const matchesBusinessStatus =
                businessStatus === "all" ||
                businessStatus === item.businessStatus;
            const matchesSearch =
                textSearch === "" ||
                convertText(item.code).includes(convertText(textSearch)) ||
                convertText(item.name).includes(convertText(textSearch));
            const matchesExpiration =
                expiration === "all" ||
                (item.expiryDate !== undefined &&
                    checkExpiration(expiration, Number(item.expiryDate)));

            return (
                matchesType &&
                matchesCategory &&
                matchesStock &&
                matchesBusinessStatus &&
                matchesSearch &&
                matchesExpiration
            );
        });
    }, [products, filters]);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken") || "";
        dispatch(fetchProducts(accessToken));
    }, [dispatch]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[600px]">
                <p className="text-lg text-gray-500">Đang tải dữ liệu...</p>
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-[600px]">
                <p className="text-lg text-red-500">Lỗi: {error}</p>
            </div>
        );
    console.log("check product :::: ", products);
    console.log("check filter product :::: ", filteredProducts);
    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4 h-[600px]">
                    <FiltersPanel
                        filters={filters}
                        setFilters={setFilters}
                        handleTextSearch={handleTextSearch}
                    />
                    <div
                        className={`col-span-4 w-full h-[20px] ${
                            openItem.open && "h-full"
                        }  sticky top-0 left-0"`}>
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
                                <IconButton
                                    onFC={() => {}}
                                    icon={<ExportIcon className="w-5 h-5" />}
                                />
                                <ButtonOption
                                    parent={{
                                        icon: <MenuIcon className="w-5 h-5" />,
                                        rightIcon: (
                                            <ArrowDown className="w-5 h-5" />
                                        )
                                    }}>
                                    <div className="grid grid-cols-2 grid-rows-[10] gap-2 w-[340px] p-3 rounded-md shadow-md bg-white">
                                        {fieldShow.map(
                                            (title: FieldShowItem) => (
                                                <div
                                                    key={title.id}
                                                    className="flex gap-2 text-[13px] text-text">
                                                    <input
                                                        checked={title.show}
                                                        type="checkbox"
                                                        onChange={() =>
                                                            handleFieldShow(
                                                                title.id
                                                            )
                                                        }
                                                    />
                                                    <span>{title.name}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </ButtonOption>
                            </div>
                        </div>
                        <div className="relative w-full overflow-auto">
                            <Table
                                checked
                                openItem={openItem}
                                onOpenItem={handleDetailItem}
                                onSelect={() => {}}
                                itemChecked={itemChecked}
                                titleTable={fieldShow}
                                body={filteredProducts}
                            />
                        </div>
                        {filteredProducts.length > 0 && (
                            <div className="text-text flex gap-2 items-center py-[30px]">
                                <Pagination
                                    active={active}
                                    setActive={setActive}
                                    totalPage={Math.ceil(
                                        filteredProducts.length / numberDisplay
                                    )}
                                />
                                <p>{`Hiển thị 1 - ${Math.min(
                                    numberDisplay,
                                    filteredProducts.length
                                )} / Tổng số ${
                                    filteredProducts.length
                                } hàng hóa`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}

export default ProductPage;
