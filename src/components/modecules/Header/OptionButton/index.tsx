import IconButton from "@/components/atoms/IconButton";
import {ButtonOption, HeaderInterface, pageType} from "@/interfaces";
import {usePathname} from "next/navigation";
import React, {useState} from "react";

function OptionButton({parentItem, childrenItem}: ButtonOption) {
    const [pageOption, setPageOption] = useState("");
    const pathParam = usePathname();
    const parentPath = pathParam.split("/");
    const handleHover = (type: string) => {
        setPageOption(() => type);
    };
    return (
        <>
            <div
                className="relative"
                onMouseMove={() => handleHover(parentItem.id)}
                onMouseOut={() => handleHover("")}>
                <IconButton
                    key={parentItem.id}
                    variant={parentItem.type as "link" | "button" | undefined}
                    url={parentItem.url}
                    customLabel="whitespace-nowrap"
                    className={`${
                        pathParam.toString().toLowerCase() === parentItem.url ||
                        parentItem.id === pageOption ||
                        `/${parentPath[1]}` === parentItem.url
                            ? "bg-secondColor text-white"
                            : "text-white bg-transparent"
                    }  !py-[10px] !px-[15px]  hover:bg-secondColor `}
                    icon={parentItem.icon}
                    customIcon="hidden md:block w-5 h-5"
                    label={parentItem.title}
                />

                {pageOption === parentItem.id && parentItem.id !== "#" && (
                    <div className="w-[250px] bg-secondColor py-[10px] rounded-md absolute top-auto left-0">
                        {childrenItem.map((item: pageType) => (
                            <IconButton
                                customIcon="w-5 h-5"
                                variant="link"
                                icon={item.icon}
                                label={item.title}
                                customLabel="whitespace-nowrap"
                                url={item.url}
                                className={` ${
                                    pathParam.toString().toLowerCase() ===
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
        </>
    );
}

export default OptionButton;
