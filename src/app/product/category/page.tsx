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
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/atoms/Pagination";
import Select from "@/components/atoms/Select";
import Table from "@/components/atoms/Table";
import {categories, displayOptions, expirations, stocks, types} from "@/consts";
import {body, dataPrice, showPropertiesTable} from "@/fake";
import useSaveLocalStorage from "@/hooks/useLocalstorage";
import {IProduct} from "@/interfaces";
import {fetchProducts} from "@/store/slices/product.slice";
import {AppDispatch, RootState} from "@/store/store";
import {convertText} from "@/utils";
import exportToExcel from "@/utils/exportFile";
import {useEffect, useState} from "react";
import {BiPlus} from "react-icons/bi";
import {useDispatch, useSelector} from "react-redux";

type Filters = {
    typeProduct: string[];
    categories: string[];
    stock: string;
    expiration: string;
    businessStatus: string;
    textSearch: string;
};

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
    const [fieldShow, setFieldShow] = useSaveLocalStorage(
        "fieldShow",
        showPropertiesTable
    );
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

    const handleDetailItem = (id: number | string) =>
        setOpenItem((prev) => ({
            item: id,
            open: prev.item === id ? !prev.open : true
        }));

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

    const handleFieldShow = (id: string) => {
        setFieldShow((prev: any[]) =>
            prev.map((item) =>
                item.id === id ? {...item, show: !item.show} : item
            )
        );
    };

    useEffect(() => {
        const accessToken = "";
        dispatch(fetchProducts(accessToken));
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const filteredBody = (): IProduct[] => {
        if (!products) return [];

        return products.filter((item) => {
            const {typeProduct, categories, stock, businessStatus, textSearch} =
                filters;
            return (
                // Kiểm tra điều kiện lọc chính
                ((typeProduct.length === 0 ||
                    typeProduct.includes(item.type)) &&
                    (categories.length === 0 ||
                        categories.includes(item.category)) &&
                    (stock === "all" || stock === item.status) &&
                    (businessStatus === "all" ||
                        businessStatus === item.businessStatus) &&
                    textSearch === "") ||
                // Kiểm tra nếu code hoặc name có chứa textSearch
                convertText(item.code).includes(convertText(textSearch)) ||
                convertText(item.name).includes(convertText(textSearch))
            );
        });
    };

    console.log("check product", filteredBody);
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
                    <div
                        className={`col-span-4 w-full ${
                            openItem.open ? "h-full" : "h-[20px]"
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
                                <IconButton
                                    onFC={() => {
                                        exportToExcel(dataPrice, "data.xlsx");
                                    }}
                                    icon={<ExportIcon className="w-5 h-5" />}
                                />

                                <ButtonOption
                                    parent={{
                                        icon: <MenuIcon className="w-5 h-5" />,
                                        rightIcon: (
                                            <ArrowDown className="w-5 h-5" />
                                        )
                                    }}>
                                    <div className="grid grid-cols-2 grid-rows-[10] gap-2  w-[340px] p-3 rounded-md shadow-md bg-white">
                                        {fieldShow.map((title: any) => (
                                            <div className="flex gap-2 text-[13px] text-text ">
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
                                        ))}
                                    </div>
                                </ButtonOption>
                            </div>
                        </div>
                        <div className="relative w-full overflow-auto">
                            <Table
                                checked
                                openItem={openItem}
                                onOpenItem={handleDetailItem}
                                onSelect={(id) => {}}
                                itemChecked={itemChecked}
                                titleTable={fieldShow}
                                body={filteredBody()}
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
