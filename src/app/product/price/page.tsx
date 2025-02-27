"use client";
import {useState, useCallback, useMemo, useEffect} from "react";
import {BiPlus} from "react-icons/bi";
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
import {body, dataPrice, showPropertiesTable} from "@/fake";
import {calculateMonthsLeft, convertText} from "@/utils";
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import {displayOptions, expirations, categories, stocks, types} from "@/consts";

type Filters = {
    typeProduct: string[];
    categories: string[];
    stock: string;
    expiration: string;
    businessStatus: string;
    textSearch: string;
};

function ProductPage() {
    const [active, setActive] = useSaveLocalStorage("active", 1);
    const [itemChecked, setItemChecked] = useState<string[]>([]);
    const [numberDisplay, setNumberDisplay] = useSaveLocalStorage(
        "numberDisplay",
        10
    );
    const [filters, setFilters] = useSaveLocalStorage("filters", {
        typeProduct: [],
        categories: [],
        stock: "all",
        expiration: "all",
        businessStatus: "all",
        textSearch: ""
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

    const handleRadioChange = (field: keyof Filters, value: string) => {
        setFilters((prev: any) => ({...prev, [field]: value}));
    };

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev: any) => ({...prev, textSearch: e.target.value}));
    };

    const checkExpiration = (
        rangeDate: string,
        numberOfDate: number
    ): boolean => {
        const [min, max] = rangeDate.split("->").map(Number);
        return numberOfDate > min && numberOfDate < max;
    };

    const filteredBody = useMemo(
        () =>
            body.filter((item) => {
                return (
                    (filters.typeProduct.length === 0 ||
                        filters.typeProduct.includes(item.type)) &&
                    (filters.categories.length === 0 ||
                        filters.categories.includes(item.category)) &&
                    (filters.stock === "all" ||
                        filters.stock === item.status) &&
                    (filters.businessStatus === "all" ||
                        filters.businessStatus === item.businessStatus) &&
                    (filters.expiration === "all" ||
                        checkExpiration(
                            filters.expiration,
                            calculateMonthsLeft(item.expiryDate)
                        )) &&
                    (filters.textSearch === "" ||
                        convertText(item.code).includes(
                            convertText(filters.textSearch)
                        ) ||
                        convertText(item.name).includes(
                            convertText(filters.textSearch)
                        ))
                );
            }),
        [filters]
    );
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Hoặc một loading component
    }
    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4">
                    <div className="col-span-1 sticky left-0 top-0 overflow-auto">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Hàng Hóa
                        </h2>
                        <div className="flex flex-col gap-3">
                            <FilterOption
                                title="Loại Hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {types.map(({id, label}) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="checkbox"
                                                checked={filters.typeProduct.includes(
                                                    id
                                                )}
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "typeProduct",
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
                                title="Nhóm hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    <Input
                                        leadingIcon={<SearchIcon />}
                                        placeholder="Tìm kiếm nhóm hàng"
                                    />
                                    {categories.map(({id, label}) => (
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
                                    {stocks.map(({id, label}) => (
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
                                title="Lựa chọn hiển thị"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {displayOptions.map(({id, label}) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="businessStatus"
                                                checked={
                                                    filters.businessStatus ===
                                                    id
                                                }
                                                onChange={() =>
                                                    handleFilterChange(
                                                        "businessStatus",
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
                                    {expirations.map(({id, label}) => (
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
                    <div className="col-span-4 w-full">
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

                        <Table
                            detailItem
                            checked
                            onSelect={(id) => {}}
                            itemChecked={itemChecked}
                            customTitle={dataPrice}
                            body={dataPrice}
                        />

                        {filteredBody.length > numberDisplay && (
                            <div className="text-text flex gap-2 items-center">
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
