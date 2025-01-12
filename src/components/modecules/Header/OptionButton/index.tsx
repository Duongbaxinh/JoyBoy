import IconButton from "@/components/atoms/IconButton";
import {ButtonOption, HeaderInterface, pageType} from "@/interfaces";
import {usePathname} from "next/navigation";
import React, {useState} from "react";

function OptionButton({
    parentItem,
    childrenItem,
    customParenItem = "",
    customChildrenItem = "",
    customChildrenContainer = "",
    customParentIcon = "",
    customChildrenIcon = "",
    customChildrenLabel = "",
    customParentLabel = "",
    hoverStyle = ""
}: {
    parentItem: {
        id: string | number;
        title?: string;
        url: string;
        icon: JSX.Element;
        type?: string;
    };
    childrenItem: {
        id: string | number;
        title?: string;
        url: string;
        icon: JSX.Element;
        type?: string;
    }[];
    customParenItem?: string;
    customChildrenItem?: string;
    customChildrenContainer?: string;
    customParentIcon?: string;
    customChildrenIcon?: string;
    customChildrenLabel?: string;
    customParentLabel?: string;
    hoverStyle?: string;
}) {
    const [pageOption, setPageOption] = useState<string | number>("");
    const pathParam = usePathname();
    const parentPath = pathParam.split("/");
    const handleHover = (type: string | number) => {
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
                    customLabel={`whitespace-nowrap ${customParentLabel}`}
                    className={`${
                        pathParam.toString().toLowerCase() === parentItem.url ||
                        parentItem.id === pageOption ||
                        `/${parentPath[1]}` === parentItem.url
                            ? hoverStyle
                            : "text-white bg-transparent"
                    }   ${customParenItem}`}
                    icon={parentItem.icon}
                    customIcon={`${customParentIcon}`}
                    label={parentItem.title}
                />

                {pageOption === parentItem.id && parentItem.id !== "#" && (
                    <div
                        className={`w-[250px] bg-secondColor py-[10px] rounded-md absolute top-auto left-0 ${customChildrenContainer}`}>
                        {childrenItem.map((item) => (
                            <IconButton
                                customIcon={`w-5 h-5 ${customChildrenIcon}`}
                                variant="link"
                                icon={item.icon}
                                label={item.title}
                                customLabel={`whitespace-nowrap ${customChildrenLabel}`}
                                url={item.url}
                                className={` ${
                                    pathParam.toString().toLowerCase() ===
                                    item.url
                                        ? `${hoverStyle}`
                                        : " bg-transparent"
                                }  ${customChildrenItem}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default OptionButton;
