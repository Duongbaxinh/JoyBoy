import {EyeIcon} from "@/assets/icons";
import {ReactNode} from "react";
import IconButton from "../IconButton";
import "./styles.css";
import {MdCancel} from "react-icons/md";

interface Props {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    title?: string;

    subName?: string;
    onClose?: () => void;
}

export default function Popup({
    className,
    children,
    isOpen,
    title,
    subName,
    onClose
}: Props) {
    return (
        <div
            className={`modal w-[100vw] bg-[rgba(0,0,0,0.3)] fixed inset-0 z-30  transition flex justify-center items-center",
               ${isOpen ? "show" : ""} 
            `}>
            <div>
                <div className="  bg-white flex flex-col gap-[15px] max-h-[90vh] p-3 rounded-md ">
                    <div className="w-full sticky top-0 bg-white">
                        <div className="w-full flex justify-between">
                            <p className="text-[18px] font-[700] text-text">
                                {title}
                            </p>
                            <IconButton
                                className="bg-transparent hover:bg-grey px-2"
                                customIcon="text-text"
                                onFC={onClose}
                                icon={
                                    <MdCancel className="w-5 h-5 text-gray-10" />
                                }
                            />
                        </div>
                        <div className=" h-[50px] w-full bg-green">Header</div>
                    </div>
                    <div className="w-full  overflow-y-scroll">{children}</div>
                    <div className=" h-[50px] w-full bg-green">Footer</div>
                </div>
            </div>
        </div>
    );
}
