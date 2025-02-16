"use client";
import ContainerLayout from "@/app/ContainerLayout/page";
import {SearchIcon} from "@/assets/icons";
import Container from "@/components/atoms/Container";
import FilterOption from "@/components/atoms/FilterOption";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

page.propTypes = {};

function page() {
    return (
        <ContainerLayout>
            <Container>
                <div className=" relative grid grid-cols-5 h-[80vh] max-h-[80vh] ">
                    <div className="col-span-1 h-full  sticky left-0 top-[0px] overflow-scroll">
                        <div className="sticky z-20 top-0 h-[50px] px-[10px]  bg-grey text-[25px] font-[700] text-text ">
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
                    <div className="col-span-4 w-full h-[85vh] max-h-[80vh] bg-blue-200 overflow-scroll">
                        <h1>Content</h1>
                        <h1>Content</h1>
                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}

export default page;
