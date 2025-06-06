"use client";
import { BackIcon } from "@/assets/icons";
import Header from "@/components/layouts/Header";
import { pageChildren, pageParent } from "@/components/layouts/Header/config";
import { ReactNode, useState } from "react";
import { ToastContainer } from 'react-toastify';

interface TypeContainer {
    isHeader?: boolean;
    isFoodTer?: boolean;
    isSidebar?: boolean;
    isPrivate?: boolean;
    children?: ReactNode;
}

function ContainerLayout({
    isHeader = true,
    isFoodTer = true,
    isSidebar = false,
    isPrivate = false,
    children
}: any) {
    const [isOpen, setIsOpen] = useState<boolean | null>(null);

    return (
        <>
            <ToastContainer />
            <div
                className={`flex w-full bg-white "overflow-x-hidden max-w-[1440px] mt-0 mx-auto`}>
                <div
                    className={` h-[100vh] ${isOpen !== null
                        ? isOpen && "animate-appearanceLeft"
                        : "hidden"
                        }
                        ${isOpen !== null && !isOpen && "animate-hiddenLeft"}
                    }`}>
                </div>

                <div className=" w-full h-[100vh] relative">
                    <Header
                        isOpenMenu={isOpen}
                        pageChildren={pageChildren}
                        pageParent={pageParent}
                    />

                    <div className={`w-full `}>{children}</div>
                    <div
                        className={`absolute w-full h-full top-0 left-0 bg-text opacity-[0.2] ${isOpen ? "block" : "hidden"
                            }`}>
                        <div className="h-[48px] ml-[20px] flex items-center">
                            <BackIcon
                                className="w-6 h-6  "
                                onClick={() => setIsOpen(!isOpen)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContainerLayout;
