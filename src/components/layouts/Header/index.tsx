"use client";
import {
    AccountIcon,
    MailIcon,
    MenuIcon,
    SaleIcon,
    SettingIcon
} from "@/assets/icons";
import { flagEl, flagVn, Logo } from "@/assets/images";
import Container from "@/components/atoms/Container";
import IconButton from "@/components/atoms/IconButton";
import { HeaderInterface, pageType } from "@/interfaces/header";
import Image from "next/image";
import { useEffect, useState } from "react";
import OptionButton from "./OptionButton";
import { account, setting } from "./config";

const options = [
    {
        id: 1,
        value: "Việt Nam",

        leftIcon: (
            <Image
                src={flagVn}
                alt="flagVn"
                width={20}
                height={20}
                priority
            />
        )
    },
    {
        id: 2,
        value: "English",
        leftIcon: (
            <Image
                src={flagEl}
                alt="flagEl"
                width={20}
                height={20}
                priority
            />
        )
    }
];

function Header({
    pageParent,
    isOpenMenu,
    onOpenMenu,
    pageChildren
}: HeaderInterface) {
    const [valueSelect, setValueSelect] = useState<{
        id: number;
        value: string;
        leftIcon?: any;
    }>(() => options[0]);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null; // Hoặc một loading component
    }
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center bg-white ">
                <Container>
                    {/* Start Top Header */}
                    <div className="w-full p-2 flex justify-between items-center ">
                        <div className="  flex justify-start gap-[10px] min-w-[150px] flex-grow">
                            <IconButton
                                className={`md:hidden block bg-transparent hover:bg-gray text-primaryColor !px-[8px] !py-[5px] ${isOpenMenu && "invisible"
                                    }`}
                                icon={
                                    <MenuIcon className="w-6 h-6 text-primaryColor" />
                                }
                                onFC={onOpenMenu}
                            />

                            <img
                                src={Logo}
                                alt="logo"
                                className="w-[100px] h-[40px]"
                            />
                        </div>
                        <div className=" flex gap-[5px] items-center">

                            <IconButton
                                onFC={() => { }}
                                badge
                                icon={
                                    <MailIcon className="text-text w-4 h-4 " />
                                }
                                variant="button"
                                className="max-w-[50px] rounded-sm !bg-transparent hover:!bg-lightGray  px-[7px] py-[7px]"
                            />
                            <OptionButton
                                childrenItem={setting}
                                parentItem={{
                                    id: "1",
                                    url: "",
                                    icon: (
                                        <SettingIcon className="text-text w-4 h-4" />
                                    )
                                }}
                                customParenItem="p-2 rounded-sm  px-[7px] py-[7px] text-text "
                                customChildrenItem="hover:bg-gray !px-[20px]"
                                customChildrenLabel="text-text"
                                customChildrenIcon="text-text"
                                customChildrenContainer="left-[-220px] bg-white shadow-md rounded-[3px]  "
                                hoverStyle="hover:bg-lightGray"
                            />
                            <OptionButton
                                childrenItem={account}
                                parentItem={{
                                    id: "1",
                                    url: "",
                                    title: "0378700020",
                                    icon: (
                                        <AccountIcon className="text-text w-4 h-4" />
                                    )
                                }}
                                customParenItem="p-2 rounded-sm bg-transparent hover:bg-gray-300  px-[7px] py-[7px] text-text "
                                customChildrenItem="hover:bg-gray !px-[20px]"
                                customParentLabel="text-text"
                                customChildrenLabel="text-text"
                                customChildrenIcon="text-text"
                                customChildrenContainer="left-[-100px] bg-white shadow-md rounded-[3px]  "
                                hoverStyle="hover:bg-lightGray"
                            />
                        </div>
                    </div>
                    {/* End Top Header */}
                </Container>

                {/* Start Bottom Header */}
                <div className=" md:flex hidden w-full items-center bg-primaryColor text-white h-[44px]">
                    <Container>
                        <div className="flex flex-1 items-center justify-between max-w-2xl  md:px-[30px] px-[10px]">
                            <div className="flex-grow flex items-center">
                                {pageParent.map((item: pageType) => (
                                    <OptionButton
                                        key={item.title}
                                        hoverStyle=" bg-secondColor text-white"
                                        customParenItem=" !py-[10px] !px-[15px]  hover:bg-secondColor"
                                        customChildrenItem="w-full !rounded-[0px] !justify-start !gap-[20px] !py-[12px] !px-[30px] hover:bg-primaryColor"
                                        customParentIcon="hidden lg:block w-5 h-5"
                                        parentItem={item}
                                        childrenItem={pageChildren[item.id]}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-end">
                                <IconButton
                                    variant="link"
                                    url="sale"
                                    className={`bg-secondColor text-white !py-[10px] !px-[15px]  hover:bg-secondColor`}
                                    icon={<SaleIcon className="w-4 h-4" />}
                                    label={"Bán hàng"}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
                {/* End Bottom Header */}
            </div>
        </>
    );
}

export default Header;
