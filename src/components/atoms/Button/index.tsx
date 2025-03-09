"use client";
import React from "react";

function Button({
    label,
    className,
    onAction
}: {
    label: string;
    className?: string;
    onAction: () => void;
}) {
    return (
        <button
            className={`text-white border text-[13px]  border-orange-400 rounded-md bg-green ${className}`}
            onClick={onAction}>
            {label}
        </button>
    );
}

export default Button;
