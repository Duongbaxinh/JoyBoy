import {ReactNode} from "react";

export interface IconButtonProps {
    icon?: ReactNode;
    className?: string;
    customLabel?: string;
    label?: string;
    rightIcon?: ReactNode;
    onFC: any;
}
