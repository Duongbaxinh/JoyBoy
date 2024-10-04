"use client";
import Image from "next/image";

import {EyeIcon} from "@/assets/icons";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-red-300">Welcome to JoyBoy App</h1>
            <EyeIcon className="text-red-500 text-[40px]" />
        </div>
    );
}
