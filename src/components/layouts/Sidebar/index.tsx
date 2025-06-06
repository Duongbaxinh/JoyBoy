import React, { useState } from "react";
import { pageChildren, pageParent } from "../Header/config";
import IconButton from "@/components/atoms/IconButton";
import { usePathname } from "next/navigation";
import { pageType } from "@/interfaces";

interface InterfaceSidebar {
    categories?: [];
}
function Sidebar(props: any) {
    const pathParam = usePathname();
    const [pageOption, setPageOption] = useState("");
    const parentPath = pathParam.split("/");
    const handleHover = (type: string) => {
        setPageOption(() => type);
    };
    return (
        <div className="w-full h-full max-h-[100vh] bg-white overflow-y-scroll">
            {pageParent.map((item: pageType, index) => (

                <div key={index} className="w-full h-auto" >
                    <div
                        className=""
                        onClick={props.onClose}>
                        <IconButton
                            customIcon="w-5 h-5 text-text"
                            variant="link"
                            icon={item.icon}
                            label={item.title}
                            customLabel="whitespace-nowrap text-text  font-bold"
                            url={item.url}
                            className={` ${pathParam.toString().toLowerCase() ===
                                item.url || item.id === pageOption
                                ? "bg-grey text-text"
                                : "text-text bg-transparent"
                                } w-full !rounded-[0px] !justify-start !gap-[20px]
                  !py-[12px] !px-[15px]
                   hover:bg-grey`}
                        />
                    </div>
                    {pageChildren[item.id as keyof typeof pageChildren] &&
                        pageChildren[item.id as keyof typeof pageChildren]
                            .length > 0 && (
                            <div
                                className="px-[10px] mt-[10px] peer"
                                onMouseMove={() => handleHover(item.id)}
                                onMouseOut={() => handleHover("")}>
                                {" "}
                                {pageChildren[
                                    item.id as keyof typeof pageChildren
                                ].map((item: pageType) => (
                                    <IconButton
                                        key={item.title}
                                        customIcon="w-5 h-5 text-text"
                                        variant="link"
                                        icon={item.icon}
                                        label={item.title}
                                        customLabel="whitespace-nowrap text-text "
                                        url={item.url}
                                        className={` ${pathParam
                                            .toString()
                                            .toLowerCase() === item.url
                                            ? "bg-grey "
                                            : "text-white bg-transparent"
                                            } w-full !rounded-[5px] !justify-start !gap-[20px]
                       !py-[12px] !px-[15px]
                        hover:bg-grey`}
                                    />
                                ))}
                            </div>
                        )}
                </div>

            ))}
        </div>
    );
}

export default Sidebar;
