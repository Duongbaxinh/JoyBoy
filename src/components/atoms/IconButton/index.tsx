import {EyeIcon, ReportIcon} from "@/assets/icons";
import {IconButtonProps} from "@/interfaces";
import Link from "next/link";
import React from "react";

const button = (props: IconButtonProps) => (
    <button
        onMouseMove={() => {}}
        onClick={() => props.onFC()}
        className={`flex px-[10px] py-[8px] items-center justify-center gap-2 rounded-md border-0 outline-none bg-green hover:bg-dark_green text-white text-[14px] ${props.className}`}>
        {props.icon && (
            <div className={`${props.customIcon}`}>{props.icon}</div>
        )}
        {props.label && <p className={`${props.customLabel}`}>{props.label}</p>}
        {props.rightIcon && props.rightIcon}
    </button>
);
const link = (props: IconButtonProps) => (
    <Link
        href={props.url ? props.url.toString() : "#"}
        className={`flex px-[10px] py-[8px] items-center justify-center gap-2 rounded-[4px] border-0 outline-none bg-green hover:bg-dark_green text-white text-[14px]  ${props.className}`}>
        {props.icon && (
            <div className={`${props.customIcon}`}>{props.icon}</div>
        )}
        {props.label && <p className={`${props.customLabel}`}>{props.label}</p>}
        {props.rightIcon && props.rightIcon}
    </Link>
);
const typeButton = {
    button: button,
    link: link
};

function IconButton({...props}: IconButtonProps) {
    return <>{typeButton[props.variant ? props.variant : "button"](props)}</>;
}

export default IconButton;
