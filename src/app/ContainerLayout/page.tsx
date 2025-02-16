import {BackIcon, EyeIcon} from "@/assets/icons";
import Header from "@/components/modecules/Header";
import {pageChildren, pageParent} from "@/components/modecules/Header/config";
import Sidebar from "@/components/modecules/Sidebar";
import React, {ReactNode, useState} from "react";

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
}: TypeContainer) {
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
                className={`flex  w-full ${
                    isOpen ? "overflow-hidden h-[100vh]" : "overflow-x-hidden"
                }`}>
                <div
                    className={` h-[100vh] ${
                        isOpen !== null
                            ? isOpen && "animate-appearanceLeft"
                            : "hidden"
                    }
                        ${isOpen !== null && !isOpen && "animate-hiddenLeft"}
                    }`}>
                    <Sidebar onClose={handleCloseMenu} />
                </div>

                <div className=" w-full h-[100vh] relative">
                    <div className="sticky top-0 z-[99]">
                        <Header
                            isOpenMenu={isOpen}
                            onOpenMenu={handleOpenMenu}
                            pageChildren={pageChildren}
                            pageParent={pageParent}
                        />
                    </div>
                    <div className={`w-full `}>{children}</div>

                    <div className="h-[500px]">Footer</div>

                    <div
                        onClick={handleOpenMenu}
                        className={`absolute w-full h-full top-0 left-0 bg-text opacity-[0.2] ${
                            isOpen ? "block" : "hidden"
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
