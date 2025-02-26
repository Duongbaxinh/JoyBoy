"use client";
import {useState, useCallback} from "react";
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
import {body, showPropertiesTable} from "@/fake";

const categories = [
    {id: "goods", label: "Hàng Hóa"},
    {id: "service", label: "Dịch vụ"},
    {id: "combo", label: "Combo - đóng gói"}
];

function ProductPage() {
    const [active, setActive] = useState(1);
    const [itemChecked, setItemChecked] = useState<(string | number)[]>([]);
    const numberDisplay = 10;

    const handleSelected = useCallback(({id}: {id: string | number}) => {
        setItemChecked((prev) => [...prev, id]);
    }, []);

    return (
        <ContainerLayout>
            <Container>
                <div className="grid grid-cols-5 gap-x-4">
                    {/* Sidebar */}
                    <div className="col-span-1 sticky left-0 top-0 overflow-auto">
                        <h2 className="h-20 flex items-center text-2xl font-bold text-text">
                            Hàng Hóa
                        </h2>
                        <div className="flex flex-col gap-3">
                            <FilterOption
                                title="Loại Hàng"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {categories.map(({id, label}) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input type="checkbox" />
                                            <p className="text-sm">{label}</p>
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
                                        variant="underline"
                                        placeholder="Tìm kiếm nhóm hàng"
                                    />
                                    {categories.slice(1).map(({id, label}) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input type="checkbox" />
                                            <p className="text-sm">{label}</p>
                                        </label>
                                    ))}
                                </div>
                            </FilterOption>

                            <FilterOption
                                title="Tồn kho"
                                className="p-3">
                                <div className="mt-2 flex flex-col gap-3">
                                    {categories.map(({id, label}) => (
                                        <label
                                            key={id}
                                            className="flex items-center gap-2 text-text">
                                            <input
                                                type="radio"
                                                name="productType"
                                                id={id}
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

                    {/* Main Content */}
                    <div className="col-span-4 w-full">
                        <div className="sticky top-0">
                            <div className="flex justify-between items-center h-20">
                                <Input
                                    className="max-w-[450px] w-full bg-white !py-2"
                                    leadingIcon={<SearchIcon />}
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
                                        icon={
                                            <ImportIcon className="w-5 h-5" />
                                        }
                                    />
                                    <IconButton
                                        icon={
                                            <ExportIcon className="w-5 h-5" />
                                        }
                                    />
                                    <IconButton
                                        icon={<MenuIcon className="w-5 h-5" />}
                                        rightIcon={
                                            <ArrowDown className="w-5 h-5" />
                                        }
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="relative max-h-[500px] w-full overflow-auto">
                                <Table
                                    detailItem
                                    checked
                                    onSelect={handleSelected}
                                    itemChecked={itemChecked}
                                    customTitle={showPropertiesTable}
                                    body={body}
                                />
                            </div>

                            {/* Pagination */}
                            {body.length > numberDisplay && (
                                <div className="text-text flex gap-2 items-center">
                                    <Pagination
                                        active={active}
                                        setActive={setActive}
                                        totalPage={Math.ceil(
                                            body.length / numberDisplay
                                        )}
                                    />
                                    <p>{`Hiển thị 1 - ${numberDisplay} / Tổng số ${body.length} hàng hóa`}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}

export default ProductPage;
