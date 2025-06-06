import {ProductSelected} from "@/components/pages/ProductPage";
import {SetStateAction} from "react";
import {IProduct} from "./data.type";

export interface TableProps {
    isDetail: boolean;
    setIsDetail: React.Dispatch<SetStateAction<boolean>>;
    className?: string;
    productSelected?: ProductSelected[];
    productLabels: any[];
    body: IProduct[];
    onSelect: (
        status: "add" | "delete" | "all" | "clean",
        product: IProduct
    ) => void;
}
