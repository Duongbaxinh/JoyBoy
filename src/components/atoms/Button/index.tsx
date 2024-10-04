"use client";
import React from "react";

function Button({
    label,
    bgColor,
    onAction
}: {
    label: string;
    bgColor: string;
    onAction: () => void;
}) {
    return (
        <div>
            <button
                className="text-red-500 border border-orange-400 rounded-md py-2 px-4 text-lg"
                onClick={onAction}>
                {label}
            </button>
        </div>
    );
}

export default Button;
