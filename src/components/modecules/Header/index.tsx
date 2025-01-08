"client";
import Image from "next/image";
import React, {useEffect, useState} from "react";

function Header(props: any) {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-2xl px-[30px]">
                <div className="w-full p-2 flex justify-between items-center ">
                    <div className="w-full h-full">
                        <Image
                            src={`https://res.cloudinary.com/dwu92ycra/image/upload/v1736325899/JOYBOY/KiotViet-Logo-Horizontal_t5s5tn.svg`}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
