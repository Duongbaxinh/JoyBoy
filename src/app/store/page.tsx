"use client";
import React from "react";
import ContainerLayout from "../ContainerLayout/page";
import Container from "@/components/atoms/Container";
import Table from "@/components/atoms/Table";
import {dataPrice, priceLabels} from "@/fake";
import Select from "@/components/atoms/Select";
import Input from "@/components/atoms/Input";
import {BiEdit, BiPlus} from "react-icons/bi";
import IconButton from "@/components/atoms/IconButton";
import {SearchIcon} from "@/assets/icons";
import {formatPrice} from "@/utils";
import Button from "@/components/atoms/Button";

function StoreInput() {
    const totalCost = 1805000;
    const discount = 0;
    const amountToPay = 1805000;
    const amountPaid = 1800000;
    const remainingDebt = -5000;
    return (
        <ContainerLayout>
            <Container>
                <div className="flex gap-4 min-h-[84vh] h-full  ">
                    <div className=" flex-grow">
                        <div className="">Header</div>
                        <div className="">
                            <Table
                                body={dataPrice}
                                onSelect={() => {}}
                                titleTable={priceLabels}
                            />
                        </div>
                    </div>
                    <div className="w-[350px]  bg-white flex flex-col gap-4 relative ">
                        <div className=" p-4 bg-white  flex flex-col gap-4 max-h-[65vh] overflow-auto">
                            <div className="flex justify-between items-center ">
                                <Select
                                    className="text-darkGray text-[13px] max-w-[160px] "
                                    customTextSelected="!leading-[24px]"
                                    inputSearch
                                    selected={{id: 1, value: "Nguyen Van A"}}
                                    options={[
                                        {id: 1, value: "Nguyen Van A"},
                                        {id: 2, value: "Nguyen Van B"}
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
                                        selected={{id: 1, value: "20:30"}}
                                        options={[
                                            {id: 1, value: "20:30"},
                                            {id: 2, value: "20:30"}
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex  items-center text-darkGray text-[13px] border-b-[1px] ">
                                <Input
                                    className="!border-0 !px-0"
                                    leadingIcon={
                                        <SearchIcon className="text-[18px]" />
                                    }
                                    placeholder="Tim kiem nha cung cap"
                                />
                                <IconButton
                                    className="!bg-transparent"
                                    icon={
                                        <BiPlus className="text-text text-[18px]" />
                                    }
                                />
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
                                    <span className=" inline-block  w-[20px] h-[20px] rounded-sm text-center border">
                                        3
                                    </span>
                                </p>
                                <p className=" text-[13px] text-text leading-[20px] p-1 ">
                                    {formatPrice(1805000)}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text  p-1 leading-[20px]">
                                    Giảm giá
                                </p>
                                <p className=" text-[13px] min-w-[80px] text-right text-text leading-[20px]  p-1 border-b-[1px] ">
                                    {formatPrice(0)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className=" text-[13px] text-text font-bold  p-1 leading-[20px]">
                                    Cần trả nhà cung cấp
                                </p>
                                <p className=" text-[13px] min-w-[80px] text-right font-bold  text-blue-400 leading-[20px]  p-1 border-b-[1px] ">
                                    {formatPrice(180000)}
                                </p>
                            </div>
                            <div className="flex justify-between text-[13px] text-text">
                                <p className="text-gray-600">
                                    Tiền trả nhà cung cấp (F8)
                                </p>
                                <div className="flex items-center">
                                    <p className="font-semibold text-green-600">
                                        {formatPrice(amountPaid)}
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

                        <div className="absolute w-full h-[100px] bottom-0 right-0 ">
                            <div className="flex  space-x-[40px] p-3 h-full">
                                <Button
                                    className=" flex-1 h-full !bg-blue-600 text-white py-2 rounded-lg !hover:bg-blue-700"
                                    label="Lưu tạm"
                                    onAction={() => {}}
                                />
                                <Button
                                    className=" flex-1 h-full bg-green-600 bg-green text-white py-2 rounded-lg hover:bg-green-700"
                                    label="   Hoàn thành"
                                    onAction={() => {}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ContainerLayout>
    );
}

export default StoreInput;
