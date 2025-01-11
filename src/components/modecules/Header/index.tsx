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
import {useState} from "react";
import {pageChildren, pageParent, pageType} from "./config";
import {flagEl, flagVn, Logo} from "@/assets/images";

const options = [
    {
        id: 1,
        value: "Việt Nam",
        leftIcon: (
            <>
                {" "}
                <Image
                    src={flagVn}
                    alt="flagVn"
                    width={20}
                    height={20}
                    priority
                />
            </>
        )
    },
    {
        id: 2,
        value: "English",
        leftIcon: (
            <>
                <Image
                    src={flagEl}
                    alt="flagEl"
                    width={20}
                    height={20}
                    priority
                />
            </>
        )
    }
];

interface HeaderInterface {
    pageParent: pageType[];
    pageChildren: {[key: string]: pageType[]};
    isOpenMenu: boolean | null;
    onOpenMenu: () => void;
}
function Header({
    pageParent,
    isOpenMenu,
    onOpenMenu,
    pageChildren
}: HeaderInterface) {
    const [pageOption, setPageOption] = useState("");
    const [valueSelect, setValueSelect] = useState<{
        id: number;
        value: string;
        leftIcon?: any;
    }>(() => options[0]);
    const pathParam = usePathname();
    const parentPath = pathParam.split("/");

    const handleHover = (type: string) => {
        setPageOption(() => type);
    };
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
                            <div
                                className="relative"
                                onMouseMove={() => handleHover(item.id)}
                                onMouseOut={() => handleHover("")}>
                                <IconButton
                                    key={item.id}
                                    variant={
                                        item.type as
                                            | "link"
                                            | "button"
                                            | undefined
                                    }
                                    url={item.url}
                                    customLabel="whitespace-nowrap"
                                    className={`${
                                        pathParam.toString().toLowerCase() ===
                                            item.url ||
                                        item.id === pageOption ||
                                        `/${parentPath[1]}` === item.url
                                            ? "bg-secondColor text-white"
                                            : "text-white bg-transparent"
                                    }  !py-[10px] !px-[15px]  hover:bg-secondColor `}
                                    icon={item.icon}
                                    customIcon="hidden md:block w-5 h-5"
                                    label={item.title}
                                />

                                {pageOption === item.id && item.id !== "#" && (
                                    <div className="w-[250px] bg-secondColor py-[10px] rounded-md absolute top-auto left-0">
                                        {pageChildren[
                                            item.id as keyof typeof pageChildren
                                        ].map((item: pageType) => (
                                            <IconButton
                                                customIcon="w-5 h-5"
                                                variant="link"
                                                icon={item.icon}
                                                label={item.title}
                                                customLabel="whitespace-nowrap"
                                                url={item.url}
                                                className={` ${
                                                    pathParam
                                                        .toString()
                                                        .toLowerCase() ===
                                                    item.url
                                                        ? "bg-primaryColor text-white"
                                                        : "text-white bg-transparent"
                                                } w-full !rounded-[0px] !justify-start !gap-[20px]
                                                 !py-[12px] !px-[30px]
                                                  hover:bg-primaryColor`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-end">
                        <IconButton
                            variant="link"
                            url="sale"
                            className={`${
                                pathParam.toString().toLowerCase() === "sale"
                                    ? "bg-secondColor text-white"
                                    : "text-white bg-transparent"
                            }  !py-[10px] !px-[15px]  hover:bg-secondColor`}
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
