import {CancelIcon} from "@/assets/icons";
import {ReactNode} from "react";
import "./style.css";

interface Props {
    positionContent?: "Top_Left" | "Top_Right" | "Top" | "Bottom";
    customClassName?: string;
    children?: ReactNode;
    isOpen?: boolean;
    name?: string;
    subName?: ReactNode;
    onClose?: () => void;
}

const positionClasses = {
    Top_Left: "top-0 left-0",
    Top_Right: "top-0 right-0",
    Top: "top-0",
    Bottom: "bottom-0"
};

const translateClasses = {
    Top_Left: "-translate-x-full",
    Top_Right: "translate-x-full",
    Top: "-translate-y-full",
    Bottom: "translate-y-full"
};

const openTranslateClasses = {
    Top_Left: "translate-x-0",
    Top_Right: "translate-x-0",
    Top: "translate-y-0",
    Bottom: "translate-y-0"
};

export default function Drawer({
    children,
    isOpen = false,
    name,
    subName,
    onClose,
    customClassName,
    positionContent = "Bottom"
}: Props) {
    return (
        <div
            onClick={onClose}
            className={`drawer w-full bg-black/30 fixed inset-0 z-50 transition ${
                isOpen ? "show" : ""
            }`}>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`max-w-[448px] w-full transition duration-300 bg-white min-h-screen h-full absolute z-auto ${customClassName} ${
                    isOpen
                        ? openTranslateClasses[positionContent]
                        : translateClasses[positionContent]
                } ${positionClasses[positionContent]} ${
                    ["Bottom", "Top"].includes(positionContent)
                        ? `w-full max-w-full max-h-[448px] min-h-0 ${customClassName}`
                        : ""
                }`}>
                <div className="py-5 px-4 flex justify-between items-center">
                    <div>
                        <p className="text-primary font-medium text-lg leading-5 mb-1">
                            {name}
                        </p>
                        <p>{subName}</p>
                    </div>
                    <CancelIcon
                        className="text-gray-700 cursor-pointer w-8 h-8 p-2"
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}
