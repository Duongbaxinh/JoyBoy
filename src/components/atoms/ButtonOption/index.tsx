"use client";
import React, { useRef } from "react";
import IconButton from "../IconButton";
import { IconButtonProps } from "@/interfaces";
import useClickOutside from "@/hooks/useClickOuside";

function ButtonOption({
    children,
    parent,
    classNameChildren
}: {
    children: React.ReactNode;
    parent: IconButtonProps;
    classNameChildren?: string;
}) {
    const refOption = useRef<HTMLDivElement | null>(null)
    const [show, setShow] = React.useState(false);
    useClickOutside([refOption], () => setShow(false))
    return (
        <div className="relative">
            <IconButton
                icon={parent.icon}
                onFC={() => setShow(!show)}
                variant="button"
                className={parent.className}
                label={parent.label}
                rightIcon={parent.rightIcon}
                customIcon={parent.customIcon}
                customLabel={parent.customLabel}
            />

            {show && (
                <div ref={refOption}
                    className={`absolute top-auto right-[270px] w-full h-full z-20 ${classNameChildren}`}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ButtonOption;
