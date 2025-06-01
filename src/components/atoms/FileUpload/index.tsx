"use client";
import React, { useRef } from "react";
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";

interface FileUploadProps {
    name: string;
    label: string;
    resInput: any,
    error: FieldError | undefined;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    onChange?: (e: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    name,
    label,
    resInput,
    error,
    multiple = false,
    maxFiles = 1,
    accept = "image/*",
    onChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        alert("run at here")
        if (onChange) return onChange(e)
        const files = e.target.files;
        // if (files) {
        //     if (multiple && files.length > maxFiles) {
        //         alert(`Chỉ được chọn tối đa ${maxFiles} file.`);
        //         e.target.value = "";
        //         if (onChange) onChange(null);
        //         return;
        //     }
        //     if (onChange) onChange(files);
        // }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">{label}</label>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
                onClick={triggerFileInput}
            >
                <label htmlFor="file" className="text-gray-500">Chọn file (hoặc kéo thả)</label>
                <input
                    id="file"
                    type="file"
                    name={name}
                    {...resInput}
                    className="hidden"
                    multiple={multiple}
                    accept={accept}
                    onChange={handleFileChange}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default FileUpload;
