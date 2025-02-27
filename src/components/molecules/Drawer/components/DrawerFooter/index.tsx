import IconButton from "@/components/atoms/IconButton";
import {ReactNode} from "react";
interface PropsFooter {
    title: string;
    isAction?: boolean;
    children?: ReactNode;
    handleClick: () => void;
}
export default function DrawerFooter(props: PropsFooter) {
    return (
        <div className="px-5 ">
            {props.children}
            {props.isAction && <IconButton label="Button" />}
        </div>
    );
}
