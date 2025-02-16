"use client";
import ContainerLayout from "@/app/ContainerLayout/page";
import {
    ArrowDown,
    ExportIcon,
    ImportIcon,
    MenuIcon,
    SearchIcon
} from "@/assets/icons";
import FilterOption from "@/components/atoms/FilterOption";
import IconButton from "@/components/atoms/IconButton";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Table from "@/components/atoms/Table";
import {body, titles} from "@/fake";
import {useState} from "react";
import {BiPlus} from "react-icons/bi";

function Category(props: any) {
    const [itemChecked, setItemChecked] = useState<(string | number)[]>([]);
    const handleSelected = ({
        type,
        id,
        e
    }: {
        type: "all" | "item";
        id: string | number;
        e: any;
    }): void => {
        console.log("check run " + type, id, e);
        const newItemChecked = [...itemChecked];
        newItemChecked.push(id);
        setItemChecked(newItemChecked);
    };
    return (
        <ContainerLayout>
            <div className="flex gap-3 px-[30px] bg-grey pt-[15px]">
                <div className="w-[234px] relative">
                    <div className="sticky z-20 top-[100px] h-[50px] px-[10px]  bg-grey text-[25px] font-[700] text-text ">
                        Hàng Hóa
                    </div>
                    <div className="flex flex-col gap-3">
                        <FilterOption title="Loại Hàng" className="p-3">
                            <div className="mt-[10px] flex flex-col gap-[15px]">
                                <div className="flex items-center gap-2 text-text ">
                                    <input type="checkbox" />
                                    <p className="text-[13px]">Hàng Hóa</p>
                                </div>
                                <div className="flex items-center gap-2 text-text ">
                                    <input type="checkbox" />
                                    <p className="text-[13px]">Dịch vụ</p>
                                </div>
                                <div className="flex items-center gap-2 text-text ">
                                    <input type="checkbox" />
                                    <p className="text-[13px]">
                                        Combo - đóng gói
                                    </p>
                                </div>
                            </div>
                        </FilterOption>

                        <FilterOption title="Nhóm hàng" className="p-3">
                            <div className="mt-[10px] flex flex-col gap-[15px]">
                                <Input
                                    leadingIcon={<SearchIcon />}
                                    variant="underline"
                                    placeholder="Tìm kiếm nhóm hàng"
                                />
                                <div className="flex items-center gap-2 text-text ">
                                    <input type="checkbox" />
                                    <p className="text-[13px]">Dịch vụ</p>
                                </div>
                                <div className="flex items-center gap-2 text-text ">
                                    <input type="checkbox" />
                                    <p className="text-[13px]">
                                        Combo - đóng gói
                                    </p>
                                </div>
                            </div>
                        </FilterOption>
                        <FilterOption title="Tồn kho" className="p-3">
                            <div className="mt-[10px] flex flex-col gap-[15px]">
                                <div className="flex items-center gap-2 text-text">
                                    <input
                                        type="radio"
                                        name="productType"
                                        id="goods"
                                    />
                                    <label
                                        htmlFor="goods"
                                        className="text-[13px]">
                                        Hàng Hóa
                                    </label>
                                </div>
                                <div className="flex items-center gap-2 text-text">
                                    <input
                                        type="radio"
                                        name="productType"
                                        id="service"
                                    />
                                    <label
                                        htmlFor="service"
                                        className="text-[13px]">
                                        Dịch vụ
                                    </label>
                                </div>
                                <div className="flex items-center gap-2 text-text">
                                    <input
                                        type="radio"
                                        name="productType"
                                        id="combo"
                                    />
                                    <label
                                        htmlFor="combo"
                                        className="text-[13px]">
                                        Combo - đóng gói
                                    </label>
                                </div>
                            </div>
                        </FilterOption>
                        <FilterOption title="Tồn kho" className="p-3">
                            <Select placeholder="Chọn thương hiệu" />
                        </FilterOption>
                    </div>
                </div>
                <div className="flex-1">
                    <div className=" sticky top-[100px] h-[50px] bg-grey flex justify-between items-center">
                        <Input
                            className="max-w-[450px] w-full bg-white"
                            leadingIcon={<SearchIcon />}
                            placeholder="Theo ma, ten hang"
                        />
                        <div className="flex gap-2">
                            <IconButton
                                icon={<BiPlus className="w-4 h-4" />}
                                rightIcon={<ArrowDown className="w-4 h-4" />}
                            />
                            <IconButton
                                icon={<ImportIcon className="w-4 h-4" />}
                            />
                            <IconButton
                                icon={<ExportIcon className="w-4 h-4" />}
                            />
                            <IconButton
                                icon={<MenuIcon className="w-4 h-4" />}
                                rightIcon={<ArrowDown className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                    <div className="max-h-[500px]    max-w-[958px] overflow-auto">
                        <Table
                            onSelect={handleSelected}
                            itemChecked={itemChecked}
                            title={titles}
                            body={body}
                        />
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default Category;
