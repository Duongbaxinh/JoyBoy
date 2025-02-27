import IconButton from "@/components/atoms/IconButton";
import {OptionButtonProps} from "@/interfaces";
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
}: OptionButtonProps) {
    const [pageOption, setPageOption] = useState<string | number>("");
    const pathParam = usePathname();
    const parentPath = pathParam.split("/")[1];

    const handleHover = (type: string | number) => setPageOption(type);

    return (
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
                    pathParam.toLowerCase() === parentItem.url ||
                    parentItem.id === pageOption ||
                    `/${parentPath}` === parentItem.url
                        ? hoverStyle
                        : "text-white bg-transparent"
                } ${customParenItem}`}
                icon={parentItem.icon}
                customIcon={customParentIcon}
                label={parentItem.title}
            />

            {pageOption === parentItem.id && parentItem.id !== "#" && (
                <div
                    className={`w-[250px] bg-secondColor py-[10px] rounded-md absolute top-auto left-0 z-[999] ${customChildrenContainer}`}>
                    {childrenItem.map((item) => (
                        <IconButton
                            key={item.id}
                            customIcon={`w-5 h-5 ${customChildrenIcon}`}
                            variant="link"
                            icon={item.icon}
                            label={item.title}
                            customLabel={`whitespace-nowrap ${customChildrenLabel}`}
                            url={item.url}
                            className={`${
                                pathParam.toLowerCase() === item.url
                                    ? hoverStyle
                                    : "bg-transparent"
                            } ${customChildrenItem}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default OptionButton;
