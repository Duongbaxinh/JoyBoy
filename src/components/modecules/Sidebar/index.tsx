import React, {useState} from "react";
import {pageChildren, pageParent} from "../Header/config";
import IconButton from "@/components/atoms/IconButton";
import {usePathname} from "next/navigation";
import {pageType} from "@/interfaces";

interface SidebarProps {
    categories?: [];
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({onClose}) => {
    const pathParam = usePathname().toLowerCase();
    const [pageOption, setPageOption] = useState<string>("");

    return (
        <div className="w-full h-full max-h-screen bg-white overflow-y-scroll">
            {pageParent.map((parent: pageType) => {
                const isActive =
                    pathParam === parent.url || parent.id === pageOption;
                const children =
                    pageChildren[parent.id as keyof typeof pageChildren] || [];

                return (
                    <div
                        key={parent.id}
                        className="w-full h-auto">
                        <div onClick={onClose}>
                            <IconButton
                                customIcon="w-5 h-5 text-text"
                                variant="link"
                                icon={parent.icon}
                                label={parent.title}
                                customLabel="whitespace-nowrap text-text font-bold"
                                url={parent.url}
                                className={`w-full !rounded-none !justify-start !gap-5 !py-3 !px-4 hover:bg-gray ${
                                    isActive
                                        ? "bg-gray text-text"
                                        : "text-text bg-transparent"
                                }`}
                            />
                        </div>
                        {children.length > 0 && (
                            <div
                                className="px-2.5 mt-2"
                                onMouseEnter={() => setPageOption(parent.id)}
                                onMouseLeave={() => setPageOption("")}>
                                {children.map((child: pageType) => (
                                    <IconButton
                                        key={child.id}
                                        customIcon="w-5 h-5 text-text"
                                        variant="link"
                                        icon={child.icon}
                                        label={child.title}
                                        customLabel="whitespace-nowrap text-text"
                                        url={child.url}
                                        className={`w-full !rounded-md !justify-start !gap-5 !py-3 !px-4 hover:bg-gray ${
                                            pathParam === child.url
                                                ? "bg-gray"
                                                : "text-white bg-transparent"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                        <hr />
                    </div>
                );
            })}
        </div>
    );
};

export default Sidebar;
