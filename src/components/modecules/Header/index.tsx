"use client";
import {
    AccountIcon,
    CartIcon,
    MailIcon,
    MenuIcon,
    SaleIcon,
    SettingIcon
} from "@/assets/icons";
import IconButton from "@/components/atoms/IconButton";
import Select from "@/components/atoms/Select";
import Image from "next/image";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Children, useState} from "react";
import {flagEl, flagVn, Logo} from "@/assets/images";
import {HeaderInterface, pageType} from "@/interfaces/header";
import OptionButton from "./OptionButton";

const options = [
    {
        id: 1,
        value: "Việt Nam",
        leftIcon: (
            <Image src={flagVn} alt="flagVn" width={20} height={20} priority />
        )
    },
    {
        id: 2,
        value: "English",
        leftIcon: (
            <Image src={flagEl} alt="flagEl" width={20} height={20} priority />
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

    return (
        <>
            <div className="w-full flex justify-center items-center bg-white ">
                <div className="w-full max-w-2xl md:px-[30px] px-[10px]">
                    {/* Start Top Header */}
                    <div className="w-full p-2 flex justify-between items-center ">
                        <div className="  flex justify-start gap-[10px] min-w-[150px] flex-grow">
                            <IconButton
                                className={`md:hidden block bg-transparent hover:bg-grey text-primaryColor !px-[8px] !py-[5px] ${
                                    isOpenMenu && "invisible"
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
                            <Select
                                customTextSelected="text-[12px]"
                                customItemOption="py-[6px]"
                                customOption="mt-[0px] min-w-[150px] bg-white rounded-sm py-[10px] "
                                className="max-w-[150px] min-w-[121px] w-[121px]  px-2 border-0 bg-grey rounded-sm"
                                leftIcon={valueSelect.leftIcon}
                                selected={valueSelect}
                                onChange={(item: any) => setValueSelect(item)}
                                placeholder="Viet Nam"
                                options={options}
                            />
                            <IconButton
                                onFC={() => {}}
                                icon={
                                    <MailIcon className="text-gray-950 w-4 h-4" />
                                }
                                className="max-w-[50px] rounded-sm bg-transparent hover:bg-gray-300  px-[7px] py-[7px]"
                            />
                            <IconButton
                                onFC={() => {}}
                                icon={
                                    <SettingIcon className="text-gray-950 w-4 h-4" />
                                }
                                className="sm:block hidden max-w-[50px] rounded-sm bg-transparent hover:bg-gray-300  px-[7px] py-[7px]"
                            />
                            <IconButton
                                onFC={() => {}}
                                label="0378700030"
                                customLabel="sm:block hidden text-[12px] text-gray-950 "
                                rightIcon={
                                    <AccountIcon className="text-gray-950 w-4 h-4" />
                                }
                                className="rounded-sm bg-transparent hover:bg-gray-300 px-[7px] py-[7px]"
                            />
                        </div>
                    </div>
                    {/* End Top Header */}
                </div>
            </div>

            {/* Start Bottom Header */}
            <div className=" md:flex hidden w-full items-center bg-primaryColor text-white h-[44px]">
                <div className="flex flex-1 items-center justify-between max-w-2xl  md:px-[30px] px-[10px]">
                    <div className="flex-grow flex items-center">
                        {pageParent.map((item: pageType) => (
                            <OptionButton
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
            </div>
            {/* End Bottom Header */}
        </>
    );
}

export default Header;
