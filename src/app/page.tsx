"use client";

import {EyeIcon} from "@/assets/icons";
import Input, {Variant} from "@/components/atoms/Input";
import Pagination from "@/components/atoms/Pagination";
import Select from "@/components/atoms/Select";
import Drawer from "@/components/modecules/Drawer";

import {useState} from "react";
import ContainerLayout from "./ContainerLayout/page";

export default function Home() {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(1);
    const [valueSelect, setValueSelect] = useState<{
        id: number;
        value: string;
    }>();

    const handleSetValueInput = (e: any) => {
        setValue(e.target.value);
    };

    const handleClick = () => {
        alert("click me !!!");
    };
    return (
        <ContainerLayout>
            <div className="">
                <button onClick={() => setIsOpen(!isOpen)}>OPEN</button>

                <div className="group bg-red-400 p-2 min-w-[200px]">
                    <div className="group-hover:bg-blue-500 bg-red-300 p-2 w-[50px] cursor-pointer">
                        Hover me!
                    </div>
                </div>
            </div>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <h1 className="text-red-300">
                    Welcome to JoyBoy App {valueSelect?.value}
                </h1>

                <Select
                    className="max-w-[500px]  px-2"
                    leftIcon={<EyeIcon />}
                    selected={valueSelect}
                    onChange={(item: any) => setValueSelect(item)}
                    placeholder="Chon san pham muon tao"
                    options={[
                        {id: 1, value: "Sửa rửa mặt", leftIcon: <EyeIcon />},
                        {id: 2, value: "kem chống nắng1"},
                        {id: 3, value: "kem chống nắng2"},
                        {id: 4, value: "kem chống nắng3"},
                        {id: 5, value: "kem chống nắng4"},
                        {id: 6, value: "kem chống nắng5"},
                        {id: 7, value: "kem chống nắng6"},
                        {id: 8, value: "kem chống nắng7"}
                    ]}
                />

                <Input
                    className="w-[200px]"
                    placeholder="Hello..."
                    value={value}
                    onChange={handleSetValueInput}
                    onHandleLeadingIcon={handleClick}
                    variant={Variant.OUTLINE}
                    leadingIcon={<EyeIcon />}
                    tailIcon={<EyeIcon />}
                />
                <Pagination
                    active={active}
                    setActive={setActive}
                    totalPage={10}
                />
            </div>
        </ContainerLayout>
    );
}
