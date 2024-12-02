"use client";
import {BoxIcon} from "@/assets/icons";
import React, {
    ReactComponentElement,
    ReactElement,
    ReactHTML,
    ReactNode
} from "react";

enum typeInput {
    TEXT = "text",
    NUMBER = "number",
    FILE = "file",
    DATE = "date"
}
export enum Variant {
    UNDERLINE = "underline",
    OUTLINE = "outline"
}
interface InputInterface {
    placeholder: string;
    value?: string;
    leadingIcon?: ReactNode;
    tailIcon?: ReactNode;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onHandleLeadingIcon?: any;
    onHandleTailIcon?: VoidFunction;
    onBlur?: VoidFunction;
    maxWidth?: string;
    minWidth?: string;
    width?: string;
    height?: string;
    minHeight?: string;
    type?: string;
    border?: number;
    borderRadius?: string;
    className?: string;
    classInput?: string;
    variant?: Variant;
}

function Input({
    placeholder,
    value = "",
    type,
    leadingIcon,
    tailIcon,
    className,
    variant = Variant.OUTLINE,
    onChange,
    classInput,
    onHandleLeadingIcon,
    onHandleTailIcon,
    onBlur
}: InputInterface) {
    const variantType = {
        underline: `border-b-[0.5px] focus-within:border-b-[2px]`,
        outline: "border-[0.5px] focus-within:border-[2px]"
    };
    return (
        <div
            className={`flex justify-start items-center ${variantType[variant]} border-green   pt-[7px] pr-[6px] pb-[6px] w-full ${className}`}>
            {leadingIcon && (
                <div
                    className="mx-1  cursor-pointer text-red-500"
                    onClick={onHandleLeadingIcon}>
                    {leadingIcon}
                </div>
            )}

            <input
                className={`border-0 outline-none w-full h-full p-0 m-0 text-[13px] leading-[18px] text-text truncate ${classInput} `}
                placeholder={`${placeholder}`}
                value={value}
                onChange={onChange}
                type={`${type ? type : "text"}`}
            />
            {tailIcon && (
                <div
                    className="mx-1  cursor-pointer text-red-500"
                    onClick={onHandleTailIcon}>
                    {tailIcon}
                </div>
            )}
        </div>
    );
}

export default Input;
