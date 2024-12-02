"use client";
import Image from "next/image";

import {EyeIcon} from "@/assets/icons";
import Input, {Variant} from "@/components/atoms/Input";
import {useState} from "react";

export default function Home() {
    const [value, setValue] = useState("");
    const handleSetValueInput = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-red-300">Welcome to JoyBoy App</h1>
            <EyeIcon className="text-red-500 text-[40px]" />
            <Input
                className="w-[200px]"
                placeholder="Hello..."
                value={value}
                onChange={handleSetValueInput}
                variant={Variant.UNDERLINE}
                leadingIcon={<EyeIcon />}
            />
            <Input
                className="w-[200px]"
                placeholder="Hello..."
                value={value}
                onChange={handleSetValueInput}
                variant={Variant.UNDERLINE}
            />
        </div>
    );
}
