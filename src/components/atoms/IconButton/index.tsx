import {EyeIcon, ReportIcon} from "@/assets/icons";
import {IconButtonProps} from "@/interfaces";
import React from "react";

function IconButton(props: IconButtonProps) {
    return (
        <div>
            <button
                onClick={() => props.onFC()}
                className={`flex px-[10px] py-[8px] items-center justify-center gap-2 rounded-[8px] border-0 outline-none bg-green hover:bg-dark_green text-white min-w-[60px] ${props.className}`}>
                <EyeIcon className="w-6 h-6" />
                <p className={`${props.customLabel}`}>{props.label}</p>
                <ReportIcon className="w-6 h-6" />
            </button>
        </div>
    );
}

export default IconButton;
