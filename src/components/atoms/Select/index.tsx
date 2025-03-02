import {ArrowDown, SearchIcon, TickSelectedIcon} from "@/assets/icons";
import React, {memo, useEffect, useRef, useState} from "react";
import Input, {Variant} from "../Input";
import {convertText} from "@/utils";

interface SelectInterface {
    disabled?: boolean;
    leftIcon?: any;
    rightIcon?: any;
    placeholder?: string;
    selected?: {
        id: number | string;
        value: string;
        leftIcon?: any;
        rightIcon?: any;
    } | null;
    iconSelect?: any;
    customIcon?: string;
    customOption?: string;
    customSelected?: string;
    customTextOption?: string;
    customTextSelected?: string;
    customItemOption?: string;
    inputSearch?: boolean;
    onChange?: any;
    options?: {
        id: number | string;
        value: string;
        leftIcon?: any;
        rightIcon?: any;
    }[];
    className?: string;
    classOption?: string;
}

function Select({
    placeholder,
    selected = null,
    inputSearch = false,
    onChange,
    customIcon,
    customTextSelected,
    customTextOption,
    customSelected,
    customOption,
    customItemOption,
    iconSelect = <ArrowDown className="text-text w-full h-full" />,
    options,
    className,
    leftIcon,
    rightIcon,
    classOption
}: SelectInterface) {
    const [textSearch, setTextSearch] = useState("");
    const [openOption, setOpenOption] = useState<string | boolean>("");
    const refInput = useRef<HTMLDivElement | null>(null);
    const refSearch = useRef<HTMLDivElement | null>(null);
    const refSelect = useRef<HTMLDivElement | null>(null);
    const handleChangeValue = (item: {
        id: number | string;
        value: string;
        leftIcon?: any;
        rightIcon?: any;
    }) => {
        console.log("run at here", item);
        onChange(item);
        setTimeout(() => {
            setOpenOption(false);
        }, 200);
    };
    const handleOnMountDown = (e: any) => {
        console.log("option ", openOption, typeof openOption);
        if (
            inputSearch &&
            refSelect.current &&
            refInput.current &&
            refSearch.current &&
            !refSelect.current.contains(e.target) &&
            !refSearch.current.contains(e.target) &&
            !refInput.current.contains(e.target)
        ) {
            if (openOption !== "") {
                setTimeout(() => {
                    setOpenOption(false);
                }, 200);
            }
        }
        if (
            !inputSearch &&
            refSelect.current &&
            !refSelect.current.contains(e.target)
        ) {
            if (openOption !== "") {
                setTimeout(() => {
                    setOpenOption(false);
                }, 200);
            }
        }
    };
    const handleOpenOption = (status: string | boolean) => {
        console.log("status", status);
        if (status === "" || !status) {
            console.log("status111", status);
            setOpenOption(() => true);
        } else {
            setOpenOption(() => false);
        }
        console.log(openOption);
    };
    const handleSearch = (e: any) => {
        e.stopPropagation();
        setTextSearch(e.target.value);
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOnMountDown);
        return () => {
            document.removeEventListener("mousedown", handleOnMountDown);
        };
    }, [openOption]);
    const optionSearch = options?.filter((item) =>
        convertText(item.value.toLowerCase()).includes(
            convertText(textSearch.toLowerCase())
        )
    );

    return (
        <div className={`relative  border-green w-full  ${className}`}>
            <div
                tabIndex={0}
                className="w-full flex justify-between items-center gap-[6px] border-b-[1px]"
                ref={refSelect}
                onClick={() => handleOpenOption(openOption)}>
                <div
                    className={`flex items-center gap-1 flex-grow overflow-hidden ${customSelected}`}>
                    {leftIcon && leftIcon}
                    <div
                        className={`text-[13px] text-text leading-[31px] capitalize truncate w-full ${customTextSelected}`}>
                        {!selected ? placeholder : selected.value}
                    </div>
                </div>
                <div
                    className={` ${customIcon} ${
                        openOption ? "animate-rotate" : "animate-rotateContrary"
                    }`}>
                    {iconSelect}
                </div>
            </div>

            <div
                className={` absolute z-10 mt-1 w-full h-auto invisible bg-white shadow-md top-auto left-0 rounded-md border-[1px] 
                    
                    ${
                        openOption !== null &&
                        openOption === true &&
                        "animate-dropdown !visible"
                    }
                     ${
                         openOption !== null &&
                         openOption === false &&
                         "animate-uptown"
                     } ${customOption} `}>
                {inputSearch && (
                    <div className=" w-full p-2 sticky top-0 bg-white">
                        <Input
                            refInput={refInput}
                            placeholder="Tìm kiếm mặt hàng"
                            refSearch={refSearch}
                            value={textSearch}
                            onChange={handleSearch}
                            variant={Variant.UNDERLINE}
                            tailIcon={<SearchIcon className="text-text" />}
                        />
                    </div>
                )}
                <div className={`w-full max-h-[150px] overflow-auto `}>
                    {optionSearch?.map((item) => (
                        <div
                            key={item.value}
                            onClick={() => handleChangeValue(item)}
                            className="w-full flex  items-center justify-between pr-2 hover:bg-gray cursor-pointer ">
                            <div
                                className={`w-full flex items-center gap-2 px-[15px] py-[10px] text-[13px] text-text capitalize ${customItemOption}`}>
                                {item.leftIcon && item.leftIcon}
                                <div
                                    className={`flex-grow text-[13px] text-text capitalize truncate w-0 overflow-hidden whitespace-nowrap text-ellipsis ${customTextOption}`}>
                                    {item.value}
                                </div>
                                {item.rightIcon && item.rightIcon}
                            </div>
                            {selected && item.id === selected?.id && (
                                <TickSelectedIcon className="text-blue-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Select);
