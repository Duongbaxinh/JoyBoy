export interface SelectParams {
    type: "all" | "item";
    id: string | number;
    e: React.ChangeEvent<HTMLInputElement>;
}

export interface TableProps {
    defineTitle?: any;
    className?: string;
    styleTitle?: string;
    customTitle?: any;
    checked?: boolean;
    body: Record<string, any>[];
    detailItem?: boolean;
    itemChecked?: (string | number)[];
    customHeader?: string;
    customBody?: string;
    onSelect: (params: SelectParams) => void;
}
