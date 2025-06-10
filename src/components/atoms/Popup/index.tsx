import { ReactNode, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import IconButton from "../IconButton";
import "./styles.css";

interface Props {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    title?: string;
    subName?: string;
    onClose?: () => void;
}

export default function Popup({
    className = "",
    children,
    isOpen = false,
    title,
    subName,
    onClose,
}: Props) {
    // Handle Escape key to close modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen && onClose) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className={`modal w-[100vw] bg-black/80 fixed inset-0 z-30 transition flex justify-center items-center ${isOpen ? "show" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`min-w-[200px] bg-white flex flex-col gap-[15px] max-h-[90vh] p-[10px] rounded-md ${className}`}
            >
                <div className="w-full sticky top-0 bg-white">
                    <div className="w-full flex justify-between">
                        {title && (
                            <p id="modal-title" className="text-[18px] font-[700] text-text">
                                {title}
                            </p>
                        )}
                        {subName && <p className="text-[14px] text-gray-600">{subName}</p>}
                        <IconButton
                            className="bg-transparent hover:bg-gray !p-0"
                            customIcon="text-text"
                            onFC={onClose}
                            icon={<MdCancel className="w-5 h-5 text-gray-10" />}
                        />
                    </div>
                </div>
                <div className="w-full overflow-auto">{children}</div>
            </div>
        </div>
    );
}