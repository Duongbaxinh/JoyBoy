"use client";
import ContainerLayout from "@/app/ContainerLayout/page";
import {
    ArrowDown,
    ExportIcon,
    ImportIcon,
    MenuIcon,
    SearchIcon
} from "@/assets/icons";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/atoms/Pagination";
import Select from "@/components/atoms/Select";
import Table from "@/components/atoms/Table";
import { categories, expirations, stocks } from "@/consts";
import { body, dataPrice, priceLabels } from "@/fake";
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import { Filters } from "@/interfaces";
import { calculateMonthsLeft, convertText } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { BiPlus } from "react-icons/bi";

function ProductPage() {
    const [active, setActive] = useSaveLocalStorage("active", 1);
    const [itemChecked, setItemChecked] = useState<string[]>([]);
    const [numberDisplay, setNumberDisplay] = useSaveLocalStorage(
        "numberDisplay",
        10
    );
    const [hasMounted, setHasMounted] = useState(false);
    const [filters, setFilters] = useSaveLocalStorage("filters", {
        typeProduct: [],
        categories: [],
        stock: "all",
        expiration: "all",
        businessStatus: "all",
        codeSearch: "",
        nameSearch: ""
    });
    const handleFilterChange = (field: keyof Filters, value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            [field]: Array.isArray(prev[field])
                ? prev[field].includes(value)
                    ? (prev[field] as string[]).filter((item) => item !== value)
                    : [...(prev[field] as string[]), value]
                : value
        }));
    };

    const handleTextSearch = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Filters
    ) => {
        setFilters((prev: any) => ({ ...prev, [field]: e.target.value }));
    };

    const handleCleanSearch = (field: any) => {
        setFilters((prev: any) => ({ ...prev, [field]: "" }));
    };

    const checkExpiration = (
        rangeDate: string,
        numberOfDate: number
    ): boolean => {
        const [min, max] = rangeDate.split("->").map(Number);
        return numberOfDate > min && numberOfDate < max;
    };

    const fieldSearches = [
        { field: "codeSearch", label: "Mã hàng", value: filters.codeSearch },
        { field: "nameSearch", label: "Tên hàng", value: filters.nameSearch }
    ];
    const filteredBody = useMemo(
        () =>
            dataPrice.filter((item) => {
                return (
                    (filters.categories.length === 0 ||
                        filters.categories.includes(item.category)) &&
                    (filters.stock === "all" ||
                        filters.stock === item.status) &&
                    (filters.expiration === "all" ||
                        checkExpiration(
                            filters.expiration,
                            calculateMonthsLeft(item.expiryDate)
                        )) &&
                    (filters.codeSearch === "" ||
                        convertText(item.code).includes(
                            convertText(filters.codeSearch)
                        )) &&
                    (filters.nameSearch === "" ||
                        convertText(item.name).includes(
                            convertText(filters.nameSearch)
                        ))
                );
            }),
        [filters]
    );

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Hoặc một loading component
    }
    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4 h-[600px]  ">
                    <div className="col-span-1 ">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Bảng giá chung
                        </h2>
                        <div className="flex flex-col gap-3">
                            <FilterOption
                                title="Bang Gia"
                                className="p-3">
                                <div className="">
                                    <Input
                                        leadingIcon={<SearchIcon />}
                                        variant="underline"
                                        placeholder=""
                                    />
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
                                                checked={filters.categories.includes(
                                                    id
                                                )}
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "categories",
                                                        id
                                                    )
                                                }
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
                                                checked={filters.stock === id}
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "stock",
                                                        id
                                                    )
                                                }
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
                                                checked={
                                                    filters.expiration === id
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "expiration",
                                                        id
                                                    )
                                                }
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
                    <div className="col-span-4 w-full h-[20px] sticky top-0 left-0  ">
                        <div className="flex justify-end items-center h-20">
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
                                    icon={<ExportIcon className="w-5 h-5" />}
                                />
                                <IconButton
                                    icon={<MenuIcon className="w-5 h-5" />}
                                    rightIcon={
                                        <ArrowDown className="w-5 h-5" />
                                    }
                                />
                            </div>
                        </div>
                        <div className="relative max-h-[500px] w-full overflow-auto">
                            <Table
                                onCleanSearch={handleCleanSearch}
                                fieldSearches={fieldSearches}
                                onSearch={handleTextSearch}
                                editField="price"
                                fieldSearch
                                styleTitle="h-[50px]"
                                onSelect={(id: any) => { }}
                                itemChecked={itemChecked}
                                titleTable={priceLabels}
                                body={filteredBody}
                            />
                        </div>
                        {filteredBody.length > numberDisplay && (
                            <div className="text-text flex gap-2 items-center py-[30px]">
                                <Pagination
                                    active={active}
                                    setActive={setActive}
                                    totalPage={Math.ceil(
                                        body.length / numberDisplay
                                    )}
                                />
                                <p>{`Hiển thị 1 - ${numberDisplay} / Tổng số ${filteredBody.length} hàng hóa`}</p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}
export default ProductPage;
