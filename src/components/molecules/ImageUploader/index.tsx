
import { uploadFile } from "@/utils/uploadFile";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoExclamation } from "react-icons/tb";
import { toast } from "react-toastify";

interface ImageUploaderProps {
    onImagesUploaded: (urls: string[]) => void;
    isThumbnail?: boolean;
    maxFiles?: number;
}

export default function ImageUploader({ onImagesUploaded, isThumbnail = false, maxFiles = 5 }: ImageUploaderProps) {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e.target.files;
            if (files) {
                const fileArr = Array.from(files).slice(0, isThumbnail ? 1 : maxFiles);
                const urls = (await uploadFile(fileArr)) as string[];
                setPreviewImages((prev) => (isThumbnail ? [urls[0]] : [...prev, ...urls]));
                onImagesUploaded(urls);
            }
        } catch (error) {
            toast.error("Lỗi khi upload ảnh");
        }
    };

    return (
        <div className="flex flex-col items-center">
            {isThumbnail ? (
                <div className="w-[350px] h-[350px] rounded-md flex items-center justify-center mb-4">
                    {previewImages[0] ? (
                        <Image src={previewImages[0]} alt="Thumbnail Preview" width={350} height={350} className="w-full h-full object-cover rounded-md" />
                    ) : (
                        <label htmlFor="thumbnail-upload">
                            <TbPhotoExclamation className="w-full h-full" />
                            <input
                                id="thumbnail-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {previewImages.map((img, index) => (
                        <div key={index} className="w-16 h-16 border-2 border-gray-300 rounded">
                            <Image src={img} alt={`Uploaded ${index}`} width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                    ))}
                    <label
                        htmlFor="gallery-upload"
                        className="w-16 h-16 border-2 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-100"
                    >
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                        <input
                            id="gallery-upload"
                            type="file"
                            accept="image/*"
                            multiple={!isThumbnail}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}