import {ArrowDown, SearchIcon, TickSelectedIcon} from "@/assets/icons";
import React, {memo, useEffect, useRef, useState} from "react";
import Input, {Variant} from "../Input";
import {convertText} from "@/utils";

interface SelectInterface {
    placeholder?: string;
    selected?: {id: number; value: string} | null;
    iconSelect?: any;
    inputSearch?: boolean;
    onChange?: any;
    options?: {id: number; value: string}[];
    className?: string;
    classOption?: string;
}

function Select({
    placeholder,
    selected = null,
    inputSearch = false,
    onChange,
    iconSelect = <ArrowDown className="text-text w-6 h-6" />,
    options,
    className,
    classOption
}: SelectInterface) {
    const [textSearch, setTextSearch] = useState("");
    const [openOption, setOpenOption] = useState<string | boolean>("");
    const refInput = useRef<HTMLDivElement | null>(null);
    const refSearch = useRef<HTMLDivElement | null>(null);
    const refSelect = useRef<HTMLDivElement | null>(null);
    const handleChangeValue = (item: {id: number; value: string}) => {
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
                setOpenOption(false);
            }
        }
        if (
            !inputSearch &&
            refSelect.current &&
            !refSelect.current.contains(e.target)
        ) {
            if (openOption !== "") {
                console.log("cloose");
                setOpenOption(false);
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
        <div
            className={`relative  border-green w-full min-w-[400px] ${className}`}>
            <div
                tabIndex={0}
                className="w-full  flex justify-between items-center gap-[10px]  border-b-[1px]"
                ref={refSelect}
                onClick={() => handleOpenOption(openOption)}>
                <div className="text-[13px] text-text leading-[31px] capitalize ">
                    {!selected ? placeholder : selected.value}
                </div>
                <p>{openOption.toString()}</p>
                <div
                    className={`
                ${openOption && "animate-rotate"}
                ${
                    !openOption && "animate-rotateContrary"
                }                                `}>
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
                     }`}>
                {inputSearch && (
                    <div className="p-2 sticky top-0 bg-white">
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
                <div className={`max-h-[150px] overflow-y-scroll   `}>
                    {optionSearch?.map((item) => (
                        <div
                            key={item.value}
                            onClick={() => handleChangeValue(item)}
                            className=" flex items-center justify-between pr-2  hover:bg-grey cursor-pointer">
                            <div className="px-[15px] py-[10px]  text-[13px] text-text capitalize">
                                {item.value}
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
