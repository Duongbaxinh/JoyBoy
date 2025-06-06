"use client";
import React from "react";
import IconButton, { IconButtonProps } from "../IconButton";


function ButtonOption({
    children,
    parent
}: {
    children: React.ReactNode;
    parent: IconButtonProps;
}) {
    const [show, setShow] = React.useState(false);
    console.log("check show ::: ", show);
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
                <div className="absolute top-auto right-[270px] w-full h-full z-20">
                    {children}
                </div>
            )}
        </div>
    );
}

export default ButtonOption;
