
import useClickOutside from "@/hooks/useClickOuside";
import React, { ChangeEvent, useRef } from "react";
import Button from "../Button";
import Input from "../Input";
import { Edit } from "@/interfaces/productTable.interface";

interface PriceTypeProps {
    discount: number;
    handleEdit: () => void
    edit: Edit,
    onEdit: React.Dispatch<React.SetStateAction<Edit>>;
    field: "totalDiscount" | "discount" | "name" | "unitPrice",
    handleDiscountProduct: ({ productId, discount }: { productId?: string, discount: number }) => void;
    handleType: (type: "vnd" | "percent") => void,
    typePrice: "vnd" | "percent"
}

const PriceType: React.FC<PriceTypeProps> = ({
    discount,
    handleDiscountProduct,
    edit,
    onEdit,
    handleType,
    handleEdit,
    typePrice,
    field
}) => {
    const refDiscount = useRef<HTMLDivElement>(null);
    useClickOutside([refDiscount], () => {
        onEdit((prev: Edit) => ({ ...prev, [field]: { ...prev[field], status: false } }))
    })
    return (
        <div
            onClick={handleEdit}
            className="pl-4 py-2 text-left relative min-w-[100px] text-text"
        >
            <p className="border-b-[1px] border-green leading-[20px]">
                {discount}
            </p>
            {edit[field].status && (
                <div
                    ref={refDiscount}
                    onClick={(e) => e.stopPropagation()}
                    className="w-fit absolute z-10 top-auto right-0 p-3 bg-white shadow-md rounded-md flex items-center gap-2 text-text text-[13px]"
                >
                    <p className="whitespace-nowrap ">Giảm giá</p>
                    <Input
                        variant="underline"
                        value={discount}
                        className="!w-[100px]"
                        type="number"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleDiscountProduct(
                                { discount: Math.max(0, Number(e.target.value)) }
                            )
                        }
                    />

                    <Button
                        className={`px-1 py-1 ${typePrice === "vnd" &&
                            "!bg-darkGreen"
                            }`}
                        label="VND"
                        onAction={() => handleType("vnd")}
                    />
                    <Button
                        className={`px-1 py-1 ${typePrice === "percent" &&
                            "!bg-darkGreen"
                            }`}
                        label="%"
                        onAction={() => handleType("percent")}
                    />



                </div>
            )}
        </div>
    );
};

export default PriceType;
