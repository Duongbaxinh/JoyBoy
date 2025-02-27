"use client";
import {BackIcon} from "@/assets/icons";
import Header from "@/components/molecules/Header";
import {pageChildren, pageParent} from "@/components/molecules/Header/config";
import Sidebar from "@/components/molecules/Sidebar";
import React, {ReactNode, useState} from "react";

interface TypeContainer {
    isHeader?: boolean;
    isFoodTer?: boolean;
    isSidebar?: boolean;
    isPrivate?: boolean;
    children: ReactNode;
}

function ContainerLayout({
    isHeader = true,
    isFoodTer = true,
    isSidebar = false,
    isPrivate = false,
    children
}: TypeContainer) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenMenu = () => setIsOpen((prev) => !prev);
    const handleCloseMenu = () => setIsOpen(false);

    return (
        <div
            className={`flex w-full bg-lightGray ${
                isOpen ? "overflow-hidden h-[100vh]" : "overflow-x-hidden"
            }`}>
            {/* Sidebar */}
            <div
                className={`h-[100vh] ${
                    isOpen ? "animate-appearanceLeft" : "hidden"
                }`}>
                <Sidebar onClose={handleCloseMenu} />
            </div>

            {/* Main Content */}
            <div className="w-full h-[100vh] relative z-40">
                <Header
                    isOpenMenu={isOpen}
                    onOpenMenu={handleOpenMenu}
                    pageChildren={pageChildren}
                    pageParent={pageParent}
                />
                <div className="w-full">{children}</div>

                {/* Overlay */}
                {isOpen && (
                    <div
                        onClick={handleOpenMenu}
                        className="absolute w-full h-full top-0 left-0 bg-text opacity-[0.2]">
                        <div className="h-[48px] ml-[20px] flex items-center">
                            <BackIcon
                                className="w-6 h-6"
                                onClick={handleOpenMenu}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ContainerLayout;
