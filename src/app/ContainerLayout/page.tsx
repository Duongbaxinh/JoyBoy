"use client";
import { BackIcon, EyeIcon } from "@/assets/icons";
import Header from "@/components/molecules/Header";
import { pageChildren, pageParent } from "@/components/molecules/Header/config";
import Sidebar from "@/components/molecules/Sidebar";
import React, { ReactNode, useState } from "react";

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
    const handleOpenMenu = () => {
        console.log("run at here lll");
        if (isOpen === null) {
            setIsOpen(true);
        }
        setIsOpen(!isOpen);
    };
    const handleCloseMenu = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div
                className={`flex  w-full bg-white ${isOpen ? "overflow-hidden h-[100vh]" : "overflow-x-hidden"
                    }`}>
                <div
                    className={` h-[100vh] ${isOpen !== null
                        ? isOpen && "animate-appearanceLeft"
                        : "hidden"
                        }
                        ${isOpen !== null && !isOpen && "animate-hiddenLeft"}
                    }`}>
                    <Sidebar onClose={handleCloseMenu} />
                </div>

                <div className=" w-full h-[100vh] relative">
                    <Header
                        isOpenMenu={isOpen}
                        onOpenMenu={handleOpenMenu}
                        pageChildren={pageChildren}
                        pageParent={pageParent}
                    />

                    <div className={`w-full `}>{children}</div>



                    <div
                        onClick={handleOpenMenu}
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
