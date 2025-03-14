export interface Product {
    id: number;
    code: string;
    name: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    discountType: "percent" | "vnd";
    totalPrice: number;
    note?: string;
}
export interface Edit {
    discount: {id: number | string; status: boolean; value: number};
    unitPrice: {id: number | string; status: boolean; value: number};
    name: {id: number | string; status: boolean; value: string};
    totalDiscount: {id: number | string; status: boolean; value: number};
}
export interface ProductTableProps {
    products: Product[];
    edit: Edit;
    unit: PriceState;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setEdit: React.Dispatch<React.SetStateAction<Edit>>;
    handleNote: (e: any) => (id: string | number) => void;
    handleVNDUnit: () => void;
    handlePercentUnit: () => void;
    updateProduct: ({
        id,
        quantity,
        discount
    }: {
        id: string | number;
        quantity?: number;
        discount?: number;
    }) => void;
    handleEdit: (field: keyof Edit, id: number | string) => void;
    handleQuantity: (idProduct: number | string, value?: number) => void;
    handleDiscountProduct: (idProduct: string | number, e: any) => void;
    handleAdjustUnitPrice: (idProduct: string | number, e: any) => void;
}

export type UnitType = "vnd" | "percent";
export type StatusType = "add" | "sub";

export interface PriceState {
    type: UnitType;
    status: StatusType;
    value: number;
}
