import {ReactNode} from "react";

export interface IconButtonProps {
    variant?: "button" | "link";
    url?: string;
    icon?: ReactNode;
    badge?: boolean;
    className?: string;
    customLabel?: string;
    customIcon?: string;
    label?: string;
    rightIcon?: ReactNode;
    onFC?: any;
}
