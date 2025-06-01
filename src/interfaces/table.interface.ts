import {SetStateAction} from "react";
import {Filters} from "./filter.interface";
import {IProduct} from "./product.interface";

export interface SelectParams {
    type: "all" | "item";
    id: string | number;
    e: React.ChangeEvent<HTMLInputElement>;
}

export interface TableProps {
    isDetail: boolean;
    setIsDetail: React.Dispatch<SetStateAction<boolean>>;
    fieldSearches?: {field: string; label: string; value: any}[];
    onSearch?: (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Filters
    ) => void;
    onCleanSearch?: (field: any) => void;
    onDetailItem?: (params: string | number | null) => void;
    defineTitle?: any;
    openItem?: {
        item: number | string | null;
        open: boolean;
    };
    onOpenItem?: (id: number | string) => void;
    editField?: string;
    className?: string;
    fieldSearch?: boolean;
    styleTitle?: string;
    titleTable?: any;
    checked?: boolean;
    productLabels: any[];
    body: IProduct[] | any;
    detailItem?: {item: string | number | null; open: boolean};
    itemChecked?: (string | number)[];
    customHeader?: string;
    customBody?: string;
    onSelect: (params: SelectParams) => void;
}
